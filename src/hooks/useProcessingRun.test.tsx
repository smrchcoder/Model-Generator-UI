import { render, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useProcessingRun } from "./useProcessingRun";
import type { ProcessingRunRead } from "../api/mentalModelApi";
import { getProcessingRun } from "../api/mentalModelApi";

vi.mock("../api/mentalModelApi", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("../api/mentalModelApi")>();

  return {
    ...actual,
    getProcessingRun: vi.fn(),
  };
});

function HookProbe(props: {
  runId: string;
  onRender: (state: ReturnType<typeof useProcessingRun>) => void;
}) {
  const state = useProcessingRun(props.runId);
  props.onRender(state);
  return null;
}

describe("useProcessingRun", () => {
  it("does not update state after unmount aborts polling", async () => {
    const onRender = vi.fn();

    vi.mocked(getProcessingRun).mockImplementation(
      (_runId: string, signal?: AbortSignal) =>
        new Promise<ProcessingRunRead>((_resolve, reject) => {
          signal?.addEventListener("abort", () => {
            reject(new DOMException("The operation was aborted.", "AbortError"));
          });
        }),
    );

    const { unmount } = render(
      <HookProbe runId="run-1" onRender={onRender} />,
    );

    await waitFor(() => {
      expect(getProcessingRun).toHaveBeenCalledTimes(1);
    });

    const renderCountBeforeUnmount = onRender.mock.calls.length;
    unmount();
    await Promise.resolve();
    await Promise.resolve();

    expect(onRender.mock.calls).toHaveLength(renderCountBeforeUnmount);
  });
});
