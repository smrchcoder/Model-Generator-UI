import type { MentalModelRun } from "../types/mentalModel";

export const sampleMentalModel: MentalModelRun = {
  run_id: "11fcecd2-dd7e-4477-b1c4-e13282f8419a",
  status: "completed",
  current_step: "completed",
  progress_percent: 100,
  article_id: "0edb45c4-6fb9-4e98-8558-015ee6ef4e45",
  section_order: [
    "overview",
    "key_concepts",
    "problem_statement",
    "architecture",
    "flow",
    "tradeoffs",
  ],
  overview: {
    one_line_summary:
      "Netflix uses ServiceLoader to address Java library lifecycle and technical debt across thousands of repositories.",
    system_name: "ServiceLoader",
    company: "Netflix",
    domain: ["Architecture Patterns", "Developer Tools", "Data Models"],
    full_summary:
      "The article discusses how Netflix uses Nebula ArchRules to scale ArchUnit for managing Java library lifecycle and technical debt across thousands of repositories. It explains the benefits of using ArchUnit for architectural code rules, the creation of rules libraries, and the integration of these rules into the build process using the ArchRules Runner Plugin. The article also highlights the scale at which these rules are applied and the potential for future enhancements like auto-remediation.",
    why_it_exists:
      "Netflix needed a way to manage Java library lifecycle and technical debt across thousands of repositories, especially regarding deprecated code and API usage.",
    reading_time_min: 11,
  },
  key_concepts: {
    concepts: [
      {
        id: "technical-debt",
        name: "technical debt",
        short_def:
          "Technical debt is the implied cost of extra rework caused by choosing a quick solution now instead of a better long-term approach.",
        why_it_matters:
          "Addressing technical debt is crucial when scaling architectural rules because it prevents compounding cleanup work later.",
        category: "pattern",
        difficulty: "intermediate",
        rank: 1,
        architecture_node_refs: [],
        evidence:
          "As we sought to improve the paved road for JVM-based libraries at Netflix, we needed a good way of identifying this kind of technical debt.",
      },
      {
        id: "class-relations",
        name: "class relations",
        short_def:
          "Class relations capture how classes connect and interact, which makes it possible to enforce architectural rules with more precision.",
        why_it_matters:
          "Understanding class relations helps identify architectural violations that could block system scalability.",
        category: "data_model",
        difficulty: "advanced",
        rank: 2,
        architecture_node_refs: [],
        evidence:
          "Because ArchUnit processes the entire classpath with ASM, it retains a graph of the class data, allowing rules to easily traverse class relationships and call sites.",
      },
      {
        id: "polyrepo-strategy",
        name: "polyrepo strategy",
        short_def:
          "A polyrepo strategy uses many repositories instead of a single monorepo to support modularity and team autonomy.",
        why_it_matters:
          "Netflix can scale teams independently while still applying shared architectural standards.",
        category: "pattern",
        difficulty: "intermediate",
        rank: 3,
        architecture_node_refs: [],
        evidence:
          "At Netflix, we operate using a polyrepo strategy with tens of thousands of Java repositories.",
      },
      {
        id: "paved-road",
        name: "paved road",
        short_def:
          "A paved road is a set of recommended practices and tools that guide developers toward a consistent, high-quality path.",
        why_it_matters:
          "It provides a clear baseline for how teams should adopt architectural rules across repositories.",
        category: "pattern",
        difficulty: "intermediate",
        rank: 4,
        architecture_node_refs: [],
        evidence:
          "Our mission also entails providing build-time feedback to the developer when they deviate from the paved road, or when their code base contains technical debt.",
      },
      {
        id: "rule-authorship",
        name: "rule authorship",
        short_def:
          "Rule authorship is the process of creating custom static-analysis rules tailored to a team's architectural or coding standards.",
        why_it_matters:
          "It lets Netflix encode its own architectural expectations instead of relying only on generic tooling.",
        category: "pattern",
        difficulty: "intermediate",
        rank: 5,
        architecture_node_refs: [],
        evidence:
          "Tools like PMD and Spotbugs are not optimized for custom rule authorships.",
      },
      {
        id: "bytecode-analysis",
        name: "bytecode analysis",
        short_def:
          "Bytecode analysis inspects compiled code instead of source code, enabling deeper and more language-agnostic architectural checks.",
        why_it_matters:
          "It allows rules to work across JVM languages like Kotlin and Scala, not just Java.",
        category: "tool",
        difficulty: "advanced",
        rank: 6,
        architecture_node_refs: [],
        evidence:
          "ArchUnit uses ASM to analyze actual compiled bytecode, which means it doesn't matter how that code was produced.",
      },
    ],
  },
  problem_statement: {
    problem_narrative:
      "Netflix faced significant challenges in managing the lifecycle of Java libraries across its vast ecosystem of over 5,000 repositories, particularly in relation to deprecated code and API usage. An incident involving a library that released a backwards-incompatible change underscored the urgency for improved tooling and practices for Java library lifecycle management. This incident highlighted a critical gap in visibility and control over library dependencies, which can lead to cascading failures across services if deprecated code is not addressed appropriately.\n\nThe existing tool, ArchUnit, while powerful for enforcing architectural rules, was limited in its scope. It was designed to operate within a single repository as part of a JUnit suite, making it insufficient for Netflix's scale. Library authors often found themselves uncertain about when it was safe to remove deprecated code or refactor components that might still be in use by downstream applications. This ambiguity not only increased the technical debt but also posed risks to operational stability, as the lack of a comprehensive approach to managing these issues could lead to significant disruptions in service delivery.",
    signals: [
      {
        description:
          "A backwards-incompatible library release incident exposed the need for stronger lifecycle tooling and practices.",
        severity: "critical",
        scale_dimension: "reliability",
        evidence:
          "After a Netflix incident relating to a library releasing a backwards-incompatible change, our team was asked to provide some tooling and practices to improve the Java library lifecycle management.",
        affected_entity_ids: ["netflix"],
      },
      {
        description:
          "Library authors struggled to know when deprecated code could safely be removed or refactored.",
        severity: "major",
        scale_dimension: "complexity",
        evidence:
          "Library authors often struggle to know when it is safe to remove deprecated code, or refactor code that is not meant to be used by downstream applications.",
        affected_entity_ids: [],
      },
      {
        description:
          "ArchUnit was built for single-repository JUnit usage, which did not fit Netflix's scale.",
        severity: "major",
        scale_dimension: "complexity",
        evidence:
          "The limitation of ArchUnit is that it is designed to be used as part of a JUnit suite in a single repository.",
        affected_entity_ids: ["archunit"],
      },
    ],
    core_problem:
      "Netflix needed a way to manage Java library lifecycle and technical debt across thousands of repositories, especially regarding deprecated code and API usage.",
    why_it_hurt:
      'At the operating scale described, these problems had compounding effects on the engineering organization. As the article states: "The limitation of ArchUnit is that it is designed to be used as part of a JUnit suite in a single repository."',
  },
  architecture: {
    overview_narrative:
      "The architecture of the Nebula ArchRules system is structured into two primary layers: the Application Layer and the Storage Layer. At the top, the Application Layer includes crucial components such as the Nebula ArchRules plugins, which enable organizations to share and apply architectural rules across multiple repositories, enhancing code quality and consistency. The ArchRules Runner Plugin acts as a pivotal element, facilitating the evaluation of these rules against various codebases. It interacts with the ServiceLoader to dynamically discover rule definitions, ensuring that the evaluation process is both flexible and robust.\n\nBeneath the Application Layer lies the Storage Layer, which comprises the Console report and JSON report components. These reports collect and present evaluation results in a structured format. Together, these layers create a cohesive architecture that supports architectural rule enforcement while communicating results back to developers.",
    nodes: [
      {
        id: "nebula-suite-of-gradle-plugins",
        name: "Nebula suite of Gradle plugins",
        entity_type: "product",
        description:
          "A suite of Gradle plugins developed by Netflix to provide standard ways to build projects and manage dependencies.",
        layer: "Infrastructure",
        is_primary: false,
        connected_to: [],
        architecture_role: "infrastructure_component",
        importance: 7,
        parent_id: null,
        evidence:
          "On the JVM Ecosystem team within Java Platform, we build tooling such as the Nebula suite of Gradle plugins to provide standard ways to build projects, keep dependencies up-to-date, and publish artifacts reliably across the Java ecosystem.",
      },
      {
        id: "internal-developer-portal",
        name: "Internal Developer Portal",
        entity_type: "external_tool",
        description: "Receives report data from the rules engine.",
        layer: "Infrastructure",
        is_primary: false,
        connected_to: [],
        architecture_role: null,
        importance: 3,
        parent_id: null,
        evidence: null,
      },
      {
        id: "standalone-rule-libraries",
        name: "Standalone rule libraries",
        entity_type: "external_tool",
        description: "Reusable libraries that hold rule definitions.",
        layer: "Infrastructure",
        is_primary: false,
        connected_to: [],
        architecture_role: null,
        importance: 3,
        parent_id: null,
        evidence: null,
      },
      {
        id: "nebula-archrules-plugins",
        name: "Nebula ArchRules plugins",
        entity_type: "product",
        description:
          "Plugins that allow organizations to share and apply ArchUnit rules across multiple repositories.",
        layer: "Application Layer",
        is_primary: false,
        connected_to: ["archunit"],
        architecture_role: "infrastructure_component",
        importance: 9,
        parent_id: null,
        evidence:
          "The Nebula ArchRules plugins give organizations the ability to share and apply rules across any number of repositories.",
      },
      {
        id: "archrules-library-plugin",
        name: "ArchRules Library Plugin",
        entity_type: "product",
        description:
          "A plugin that adds an additional source set to Gradle projects for creating ArchUnit rules.",
        layer: "Infrastructure",
        is_primary: false,
        connected_to: [],
        architecture_role: "infrastructure_component",
        importance: 7,
        parent_id: null,
        evidence: "In order to do this, we have the ArchRules Library Plugin.",
      },
      {
        id: "archrules-runner-plugin",
        name: "ArchRules Runner Plugin",
        entity_type: "product",
        description:
          "A plugin that allows rules to be evaluated against code using ArchUnit.",
        layer: "Application Layer",
        is_primary: false,
        connected_to: [
          "standalone-rule-libraries",
          "bundled-rule-libraries",
          "nebula-suite-of-gradle-plugins",
          "serviceloader",
          "internal-developer-portal",
          "json-report",
          "console-report",
        ],
        architecture_role: "infrastructure_component",
        importance: 7,
        parent_id: null,
        evidence: "The ArchRules Runner Plugin allows rules to be evaluated against your code.",
      },
      {
        id: "gradle-module-metadata",
        name: "Gradle Module Metadata",
        entity_type: "product",
        description:
          "A dependency-resolution feature used by Gradle projects using ArchRules.",
        layer: "Infrastructure",
        is_primary: false,
        connected_to: [],
        architecture_role: "infrastructure_component",
        importance: 4,
        parent_id: null,
        evidence: "They must use Gradle Module Metadata for dependency resolution.",
      },
      {
        id: "bundled-rule-libraries",
        name: "Bundled rule libraries",
        entity_type: "external_tool",
        description: "Rule libraries bundled with implementation libraries.",
        layer: "Infrastructure",
        is_primary: false,
        connected_to: [],
        architecture_role: null,
        importance: 3,
        parent_id: null,
        evidence: null,
      },
      {
        id: "jvm-ecosystem-team",
        name: "JVM Ecosystem team",
        entity_type: "team",
        description:
          "The team within Netflix's Java Platform responsible for building tooling like the Nebula suite of Gradle plugins.",
        layer: "Infrastructure",
        is_primary: false,
        connected_to: [],
        architecture_role: null,
        importance: 5,
        parent_id: null,
        evidence:
          "On the JVM Ecosystem team within Java Platform, we build tooling such as the Nebula suite of Gradle plugins to provide standard ways to build projects, keep dependencies up-to-date, and publish artifacts reliably across the Java ecosystem.",
      },
      {
        id: "spring-modulith",
        name: "Spring Modulith",
        entity_type: "product",
        description: "A platform that provides ArchUnit as part of its offering.",
        layer: "Infrastructure",
        is_primary: false,
        connected_to: [],
        architecture_role: "infrastructure_component",
        importance: 4,
        parent_id: null,
        evidence:
          "It is used internally by Gradle, Spring, and is provided as part of the Spring Modulith platform.",
      },
      {
        id: "console-report",
        name: "Console report",
        entity_type: "external_tool",
        description: "Human-readable report output for developers.",
        layer: "Storage Layer",
        is_primary: false,
        connected_to: [],
        architecture_role: null,
        importance: 3,
        parent_id: null,
        evidence: null,
      },
      {
        id: "serviceloader",
        name: "ServiceLoader",
        entity_type: "internal_system",
        description: "Discovers rule definitions used in the evaluation process.",
        layer: "Application Layer",
        is_primary: true,
        connected_to: [],
        architecture_role: "service",
        importance: 3,
        parent_id: null,
        evidence: null,
      },
      {
        id: "nebula-test",
        name: "Nebula Test",
        entity_type: "product",
        description: "A library that includes bundled rule libraries for testing with ArchUnit.",
        layer: "Infrastructure",
        is_primary: false,
        connected_to: [],
        architecture_role: "infrastructure_component",
        importance: 5,
        parent_id: null,
        evidence: "An example of this can be seen in our Nebula Test library.",
      },
      {
        id: "openrewrite",
        name: "OpenRewrite",
        entity_type: "product",
        description:
          "A tool for deterministic auto-remediation solutions based on ArchUnit findings.",
        layer: "Infrastructure",
        is_primary: false,
        connected_to: [],
        architecture_role: "infrastructure_component",
        importance: 3,
        parent_id: null,
        evidence:
          "We will explore deterministic solutions such as OpenRewrite and non-deterministic solutions such as LLMs.",
      },
      {
        id: "json-report",
        name: "JSON report",
        entity_type: "external_tool",
        description: "Structured evaluation output for downstream systems.",
        layer: "Storage Layer",
        is_primary: false,
        connected_to: [],
        architecture_role: null,
        importance: 3,
        parent_id: null,
        evidence: null,
      },
      {
        id: "archunit",
        name: "ArchUnit",
        entity_type: "external_tool",
        description:
          "An open-source library used to enforce architectural code rules as part of a JUnit suite.",
        layer: "Infrastructure",
        is_primary: false,
        connected_to: [],
        architecture_role: "infrastructure_component",
        importance: 8,
        parent_id: null,
        evidence:
          "ArchUnit is a popular OSS library used to enforce architectural code rules as part of a JUnit suite.",
      },
      {
        id: "jspecify",
        name: "JSpecify",
        entity_type: "product",
        description: "A tool for enforcing nullability annotations in Java.",
        layer: "Infrastructure",
        is_primary: false,
        connected_to: [],
        architecture_role: "infrastructure_component",
        importance: 3,
        parent_id: null,
        evidence:
          "These rules enforce proper nullability annotation in Java, for example, that every public class is marked with JSpecify's @NullMarked.",
      },
      {
        id: "netflix",
        name: "Netflix",
        entity_type: "company",
        description:
          "The company implementing Nebula ArchRules to scale ArchUnit for managing Java library lifecycle.",
        layer: "Infrastructure",
        is_primary: false,
        connected_to: [],
        architecture_role: null,
        importance: 10,
        parent_id: null,
        evidence:
          "At Netflix, we operate using a polyrepo strategy with tens of thousands of Java repositories.",
      },
      {
        id: "asm",
        name: "ASM",
        entity_type: "external_tool",
        description:
          "A library used by ArchUnit to analyze compiled bytecode instead of source code.",
        layer: "Infrastructure",
        is_primary: false,
        connected_to: [],
        architecture_role: "infrastructure_component",
        importance: 6,
        parent_id: null,
        evidence:
          "ArchUnit uses ASM to analyze actual compiled bytecode, which means it doesn't matter how that code was produced.",
      },
    ],
    edges: [
      {
        id: "rel_nebula-archrules-plugins_archunit",
        source_id: "nebula-archrules-plugins",
        target_id: "archunit",
        interaction_type: "sync_call",
        label: "share and apply rules across repositories",
        is_bidirectional: false,
        evidence: null,
      },
      {
        id: "rel_archrules-runner-plugin_standalone-rule-libraries",
        source_id: "archrules-runner-plugin",
        target_id: "standalone-rule-libraries",
        interaction_type: "sync_call",
        label: "evaluate rules against code",
        is_bidirectional: false,
        evidence: null,
      },
      {
        id: "rel_archrules-runner-plugin_bundled-rule-libraries",
        source_id: "archrules-runner-plugin",
        target_id: "bundled-rule-libraries",
        interaction_type: "sync_call",
        label: "evaluate rules automatically",
        is_bidirectional: false,
        evidence: null,
      },
      {
        id: "rel_archrules-runner-plugin_nebula-suite-of-gradle-plugins",
        source_id: "archrules-runner-plugin",
        target_id: "nebula-suite-of-gradle-plugins",
        interaction_type: "sync_call",
        label: "create work action to evaluate rules",
        is_bidirectional: false,
        evidence: null,
      },
      {
        id: "rel_archrules-runner-plugin_serviceloader",
        source_id: "archrules-runner-plugin",
        target_id: "serviceloader",
        interaction_type: "sync_call",
        label: "discover rule definitions",
        is_bidirectional: false,
        evidence: null,
      },
      {
        id: "rel_archrules-runner-plugin_internal-developer-portal",
        source_id: "archrules-runner-plugin",
        target_id: "internal-developer-portal",
        interaction_type: "data_flow",
        label: "send report data",
        is_bidirectional: false,
        evidence: null,
      },
      {
        id: "rel_archrules-runner-plugin_json-report",
        source_id: "archrules-runner-plugin",
        target_id: "json-report",
        interaction_type: "data_flow",
        label: "collect output from all source sets",
        is_bidirectional: false,
        evidence: null,
      },
      {
        id: "rel_archrules-runner-plugin_console-report",
        source_id: "archrules-runner-plugin",
        target_id: "console-report",
        interaction_type: "data_flow",
        label: "collect output from all source sets",
        is_bidirectional: false,
        evidence: null,
      },
    ],
    layers: [
      {
        name: "Application Layer",
        order: 1,
        description:
          "Responsible for rule sharing, evaluation, and reporting within the Nebula ArchRules system.",
      },
      {
        name: "Storage Layer",
        order: 2,
        description:
          "Handles output and reporting of evaluation results, providing structured feedback to developers.",
      },
    ],
    key_relationships: [
      "Nebula ArchRules plugins -> ArchUnit: share and apply rules across repositories",
      "ArchRules Runner Plugin -> Standalone rule libraries: evaluate rules against code",
      "ArchRules Runner Plugin -> Bundled rule libraries: evaluate rules automatically",
      "ArchRules Runner Plugin -> Nebula suite of Gradle plugins: create work action to evaluate rules",
      "ArchRules Runner Plugin -> ServiceLoader: discover rule definitions",
      "ArchRules Runner Plugin -> Internal Developer Portal: send report data",
      "ArchRules Runner Plugin -> JSON report: collect output from all source sets",
      "ArchRules Runner Plugin -> Console report: collect output from all source sets",
    ],
  },
  flow: {
    flows: [
      {
        id: "flow_rule_evaluation",
        flow_name: "Rule Evaluation",
        entry_point: "ArchRules Runner Plugin determines rules classpath",
        exit_point: "Binary serialization of rule violations written to file",
        overview:
          "The Rule Evaluation flow checks architectural rules within the Nebula suite of Gradle plugins and writes any rule violations to a file for later analysis.",
        steps: [
          {
            id: "flow_rule_evaluation_step_1",
            order: 1,
            actor: "ArchRules Runner Plugin",
            action: "determine rules classpath",
            target: "Nebula suite of Gradle plugins",
            data: null,
            description:
              "The runner determines the rules classpath to identify which architectural rules should be evaluated.",
            interaction_type: "sync_call",
            actor_node_id: "archrules-runner-plugin",
            target_node_id: "nebula-suite-of-gradle-plugins",
            evidence:
              "The ArchRules Runner Plugin allows rules to be evaluated against your code.",
          },
          {
            id: "flow_rule_evaluation_step_2",
            order: 2,
            actor: "ArchRules Runner Plugin",
            action: "create Gradle work action to evaluate rules",
            target: "Nebula suite of Gradle plugins",
            data: null,
            description:
              "The runner creates the work action that executes the architectural checks.",
            interaction_type: "sync_call",
            actor_node_id: "archrules-runner-plugin",
            target_node_id: "nebula-suite-of-gradle-plugins",
            evidence:
              "The ArchRules Runner Plugin allows rules to be evaluated against your code.",
          },
          {
            id: "flow_rule_evaluation_step_3",
            order: 3,
            actor: "ServiceLoader",
            action: "discover rule definitions",
            target: "ArchRules Runner Plugin",
            data: null,
            description:
              "ServiceLoader discovers the registered rules and makes them available to the runner.",
            interaction_type: "data_flow",
            actor_node_id: "serviceloader",
            target_node_id: "archrules-runner-plugin",
            evidence: null,
          },
          {
            id: "flow_rule_evaluation_step_4",
            order: 4,
            actor: "ArchRules Runner Plugin",
            action: "write binary serialization of rule violations to file",
            target: null,
            data: null,
            description:
              "The runner writes rule violations to a file as structured output for reporting and investigation.",
            interaction_type: "data_flow",
            actor_node_id: "archrules-runner-plugin",
            target_node_id: null,
            evidence:
              "The ArchRules Runner Plugin allows rules to be evaluated against your code.",
          },
        ],
        evidence: null,
      },
    ],
  },
  tradeoffs: {
    tradeoffs: [
      {
        description:
          "The team chose bytecode analysis over AST parsing for rule evaluation.",
        benefit:
          "Bytecode analysis makes the rules language-agnostic and better suited to JVM ecosystems beyond Java.",
        cost:
          "It requires operating on compiled output, which adds implementation complexity.",
        condition: null,
        category: "complexity",
        insight:
          "Use bytecode analysis when cross-language compatibility matters more than keeping the analysis pipeline simple.",
        evidence:
          "ArchUnit uses ASM to analyze actual compiled bytecode, which means it doesn't matter how that code was produced.",
        affected_entities: [],
        affected_entity_ids: [],
      },
      {
        description:
          "The team chose ArchUnit over PMD and Spotbugs for custom rule authorship.",
        benefit:
          "ArchUnit offers type-safe Java code with a fluent API, which makes custom rules easier to write and test.",
        cost:
          "Teams need to learn its API and invest in setup compared with ready-made linting rules.",
        condition: null,
        category: "complexity",
        insight:
          "Pick ArchUnit when rule customizability and testability matter more than plug-and-play setup.",
        evidence:
          "This is type-safe Java code with a fluent API. It is also simple to unit test, as ArchUnit has a method to pass a rule object and class references to evaluate the rule against those classes.",
        affected_entities: ["ArchUnit"],
        affected_entity_ids: ["archunit"],
      },
      {
        description:
          "The team chose to use bundled rule libraries for ArchUnit.",
        benefit:
          "Bundled rule libraries are automatically detected and run only where the dependency is used.",
        cost:
          "Maintaining both main and archRules sources in the same library increases library-management complexity.",
        condition: null,
        category: "complexity",
        insight:
          "Bundle rules for more targeted enforcement, but expect more source-set management overhead.",
        evidence:
          "Whenever possible, we recommend writing rules in this bundled way. That is because the ArchRules Runner Plugin will be able to automatically detect these rules and run them in only the source sets that use this library as a dependency.",
        affected_entities: ["Bundled rule libraries", "ArchUnit"],
        affected_entity_ids: ["bundled-rule-libraries", "archunit"],
      },
    ],
    constraints: [],
    takeaways:
      "When a system needs extensibility and adaptability, the best option may add complexity. Bytecode analysis enables broader language coverage, and tools like ArchUnit improve custom rule development, but each choice raises the bar for implementation and maintenance.",
  },
  error_message: null,
  created_at: "2026-06-20T12:15:00.478180",
  updated_at: "2026-06-20T12:16:21.595565",
};
