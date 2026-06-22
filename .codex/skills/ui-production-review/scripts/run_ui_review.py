from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[4]
REPORT_PATH = REPO_ROOT / ".codex" / "reports" / "ui-production-review.md"
ANSI_ESCAPE_PATTERN = re.compile(r"\x1b\[[0-9;]*[A-Za-z]")


def run_command(command: list[str]) -> subprocess.CompletedProcess[str]:
    executable = (
        shutil.which(command[0])
        or shutil.which(f"{command[0]}.cmd")
        or command[0]
    )

    return subprocess.run(
        [executable, *command[1:]],
        cwd=REPO_ROOT,
        text=True,
        capture_output=True,
        check=False,
        env={**os.environ, "CI": "1", "NO_COLOR": "1"},
    )


def command_block(result: subprocess.CompletedProcess[str]) -> str:
    output = result.stdout.strip()
    error_output = result.stderr.strip()

    if error_output:
        output = f"{output}\n{error_output}".strip()

    return ANSI_ESCAPE_PATTERN.sub("", output) or "(no output)"


def inventory_commands() -> list[tuple[str, list[str]]]:
    rg_binary = shutil.which("rg")
    if not rg_binary:
        return []

    return [
        (
            "API and env inventory",
            [
                rg_binary,
                "-n",
                r"fetch\(|axios|XMLHttpRequest|Authorization|Bearer |import\.meta\.env|VITE_",
                "src",
                "index.html",
                ".env.example",
                "vite.config.ts",
            ],
        ),
        (
            "External link and URL inventory",
            [
                rg_binary,
                "-n",
                r"href=|target=|rel=|window\.open|new URL\(",
                "src",
                "index.html",
            ],
        ),
        (
            "Unsafe DOM and storage inventory",
            [
                rg_binary,
                "-n",
                r"dangerouslySetInnerHTML|innerHTML|eval\(|new Function|localStorage|sessionStorage|document\.cookie|postMessage",
                "src",
                "index.html",
            ],
        ),
        (
            "Accessibility surface inventory",
            [
                rg_binary,
                "-n",
                r"<button|<input|<textarea|aria-|role=",
                "src",
            ],
        ),
    ]


def check_commands() -> list[tuple[str, list[str]]]:
    return [
        ("Build", ["npm", "run", "build"]),
        ("Lint", ["npm", "run", "lint"]),
        ("Test", ["npm", "run", "test"]),
        ("Audit", ["npm", "audit", "--omit=dev", "--json"]),
    ]


def summarize_audit(output: str) -> str:
    try:
        payload = json.loads(output)
    except json.JSONDecodeError:
        return "Unable to parse audit JSON."

    vulnerabilities = payload.get("metadata", {}).get("vulnerabilities", {})
    return (
        "info={info}, low={low}, moderate={moderate}, high={high}, critical={critical}"
    ).format(
        info=vulnerabilities.get("info", 0),
        low=vulnerabilities.get("low", 0),
        moderate=vulnerabilities.get("moderate", 0),
        high=vulnerabilities.get("high", 0),
        critical=vulnerabilities.get("critical", 0),
    )


def extract_findings(
    inventory_results: list[tuple[str, subprocess.CompletedProcess[str]]],
) -> list[str]:
    findings: list[str] = []

    for title, result in inventory_results:
        lines = [line for line in result.stdout.splitlines() if line.strip()]
        if not lines:
            continue

        if "Unsafe DOM" in title and lines:
            findings.append(
                "P1: Review raw DOM/storage patterns surfaced by the inventory before shipping."
            )

        if "External link" in title and any("target=" in line for line in lines):
            findings.append(
                "P2: Verify every external link opened in a new tab also uses safe rel attributes."
            )

        if "API and env" in title and any("http://" in line for line in lines):
            findings.append(
                "P2: Confirm plain HTTP usage is limited to local development and examples."
            )

    if not findings:
        findings.append(
            "No high-confidence automated findings detected. Perform a manual pass on API wrappers, URL handling, and accessibility semantics."
        )

    return findings


def main() -> int:
    REPORT_PATH.parent.mkdir(parents=True, exist_ok=True)

    inventory_results = [
        (title, run_command(command))
        for title, command in inventory_commands()
    ]
    check_results = [(title, run_command(command)) for title, command in check_commands()]
    findings = extract_findings(inventory_results)

    report_lines = [
        "# UI Production Review Report",
        "",
        f"- Repository: `{REPO_ROOT}`",
        "",
        "## Findings",
    ]

    for finding in findings:
        report_lines.append(f"- {finding}")

    report_lines.extend(["", "## Inventory"])

    for title, result in inventory_results:
        report_lines.extend(
            [
                f"### {title}",
                "",
                f"- Exit code: `{result.returncode}`",
                "```text",
                command_block(result),
                "```",
                "",
            ]
        )

    report_lines.append("## Checks")

    for title, result in check_results:
        report_lines.extend(
            [
                f"### {title}",
                "",
                f"- Exit code: `{result.returncode}`",
            ]
        )

        if title == "Audit":
            report_lines.append(f"- Summary: {summarize_audit(result.stdout)}")

        report_lines.extend(
            [
                "```text",
                command_block(result),
                "```",
                "",
            ]
        )

    REPORT_PATH.write_text("\n".join(report_lines), encoding="utf-8")
    print(f"Wrote UI review report to {REPORT_PATH}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
