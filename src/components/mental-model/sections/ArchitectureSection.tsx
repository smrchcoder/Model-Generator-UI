import clsx from "clsx";
import { ArrowDown, ArrowRight, Layers3, Network } from "lucide-react";
import MentalModelSectionFrame from "./MentalModelSectionFrame";
import type {
  MentalModelArchitecture,
  MentalModelArchitectureEdge,
  MentalModelArchitectureNode,
} from "../../../types/mentalModel";

interface ArchitectureSectionProps {
  architecture: MentalModelArchitecture;
}

const layerColorClassNames = [
  {
    band: "border-cyan-800 bg-cyan-100",
    node: "border-cyan-800 bg-white",
    badge: "bg-cyan-200 text-cyan-950",
    dot: "bg-cyan-800",
  },
  {
    band: "border-amber-800 bg-amber-100",
    node: "border-amber-800 bg-white",
    badge: "bg-amber-200 text-amber-950",
    dot: "bg-amber-800",
  },
  {
    band: "border-emerald-800 bg-emerald-100",
    node: "border-emerald-800 bg-white",
    badge: "bg-emerald-200 text-emerald-950",
    dot: "bg-emerald-800",
  },
  {
    band: "border-rose-800 bg-rose-100",
    node: "border-rose-800 bg-white",
    badge: "bg-rose-200 text-rose-950",
    dot: "bg-rose-800",
  },
];

type ConnectionGroup = {
  id: string;
  sourceLayer: string;
  targetLayer: string;
  sourceNodes: MentalModelArchitectureNode[];
  targetNodes: MentalModelArchitectureNode[];
  edges: MentalModelArchitectureEdge[];
};

export default function ArchitectureSection({
  architecture,
}: ArchitectureSectionProps) {
  const layerDescriptions = new Map(
    architecture.layers.map((layer) => [layer.name, layer.description]),
  );
  const nodeById = new Map(architecture.nodes.map((node) => [node.id, node]));
  const layerOrder = (layerName: string) =>
    architecture.layers.find((layer) => layer.name === layerName)?.order ?? 99;

  const layeredNodes = Array.from(
    architecture.nodes.reduce<Map<string, typeof architecture.nodes>>((map, node) => {
      const nodes = map.get(node.layer) ?? [];
      nodes.push(node);
      map.set(node.layer, nodes);
      return map;
    }, new Map()),
  ).sort((left, right) => layerOrder(left[0]) - layerOrder(right[0]));

  const connectionGroups = Array.from(
    architecture.edges.reduce<Map<string, ConnectionGroup>>((map, edge) => {
      const sourceNode = nodeById.get(edge.source_id);
      const targetNode = nodeById.get(edge.target_id);

      if (!sourceNode || !targetNode) return map;

      const id = `${sourceNode.layer}->${targetNode.layer}`;
      const group =
        map.get(id) ??
        ({
          id,
          sourceLayer: sourceNode.layer,
          targetLayer: targetNode.layer,
          sourceNodes: [],
          targetNodes: [],
          edges: [],
        } satisfies ConnectionGroup);

      if (!group.sourceNodes.some((node) => node.id === sourceNode.id)) {
        group.sourceNodes.push(sourceNode);
      }

      if (!group.targetNodes.some((node) => node.id === targetNode.id)) {
        group.targetNodes.push(targetNode);
      }

      group.edges.push(edge);
      map.set(id, group);
      return map;
    }, new Map()),
  ).map(([, group]) => group).sort((left, right) => {
    const sourceDiff = layerOrder(left.sourceLayer) - layerOrder(right.sourceLayer);
    return sourceDiff || layerOrder(left.targetLayer) - layerOrder(right.targetLayer);
  });

  return (
    <MentalModelSectionFrame
      sectionId="architecture"
      eyebrow="System structure"
      title="Architecture"
      description={architecture.overview_narrative}
    >
      <div className="space-y-6">
        <section>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md border-2 border-cyan-800 bg-cyan-200 text-cyan-950">
              <Layers3 size={18} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                Layer inventory
              </p>
              <h4 className="text-lg font-semibold text-text-primary">
                Components grouped by responsibility
              </h4>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-3">
            {layeredNodes.map(([layerName, nodes], layerIndex) => {
              const colors =
                layerColorClassNames[layerIndex % layerColorClassNames.length];

              return (
                <article
                  key={layerName}
                  className={clsx("rounded-lg border-2 p-5 shadow-panel", colors.band)}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={clsx("h-2.5 w-2.5 rounded-full", colors.dot)} />
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                          Layer
                        </p>
                      </div>
                      <h5 className="mt-2 text-xl font-semibold text-text-primary">
                        {layerName}
                      </h5>
                    </div>
                    <span className={clsx("rounded-md border border-border-default px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]", colors.badge)}>
                      {nodes.length} nodes
                    </span>
                  </div>

                  {layerDescriptions.get(layerName) && (
                    <p className="mt-3 text-sm leading-6 text-text-secondary">
                      {layerDescriptions.get(layerName)}
                    </p>
                  )}

                  <div className="mt-5 grid gap-3">
                    {nodes
                      .slice()
                      .sort((left, right) => right.importance - left.importance)
                      .map((node) => (
                        <div
                          key={node.id}
                          className={clsx("rounded-md border-2 px-4 py-3", colors.node)}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-text-primary">
                                {node.name}
                              </p>
                              <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-text-tertiary">
                                {node.entity_type.replace("_", " ")}
                              </p>
                            </div>
                            {node.is_primary && (
                              <span className="rounded-md border border-border-default bg-accent-mint px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-text-primary">
                                Primary
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section>
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md border-2 border-amber-800 bg-amber-200 text-amber-950">
              <Network size={18} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                Connection graph
              </p>
              <h4 className="text-lg font-semibold text-text-primary">
                Layer-to-layer relationships from the backend response
              </h4>
            </div>
          </div>

          <div className="space-y-4">
            {connectionGroups.map((group, groupIndex) => {
              const sourceColors =
                layerColorClassNames[
                  layerOrder(group.sourceLayer) % layerColorClassNames.length
                ];
              const targetColors =
                layerColorClassNames[
                  (layerOrder(group.targetLayer) + 1) %
                    layerColorClassNames.length
                ];

              return (
                <article
                  key={group.id}
                  className="atlas-card p-4"
                >
                  <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_128px_minmax(0,1fr)] xl:items-stretch">
                    <div className={clsx("rounded-lg border-2 p-4", sourceColors.band)}>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                        {group.sourceLayer}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {group.sourceNodes.map((node) => (
                          <span
                            key={node.id}
                            className={clsx("rounded-md border-2 px-3 py-1.5 text-xs font-semibold text-text-primary", sourceColors.node)}
                          >
                            {node.name}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-center">
                      <div className="hidden w-full items-center gap-2 xl:flex">
                        <span className="h-0.5 flex-1 bg-border-default" />
                        <div className="flex h-11 w-11 items-center justify-center rounded-md border-2 border-amber-800 bg-amber-200 text-amber-950">
                          <ArrowRight size={18} />
                        </div>
                        <span className="h-0.5 flex-1 bg-border-default" />
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-amber-800 bg-amber-200 text-amber-950 xl:hidden">
                        <ArrowDown size={18} />
                      </div>
                    </div>

                    <div className={clsx("rounded-lg border-2 p-4", targetColors.band)}>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                        {group.targetLayer}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {group.targetNodes.map((node) => (
                          <span
                            key={node.id}
                            className={clsx("rounded-md border-2 px-3 py-1.5 text-xs font-semibold text-text-primary", targetColors.node)}
                          >
                            {node.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-2 lg:grid-cols-2">
                    {group.edges.map((edge) => {
                      const sourceNode = nodeById.get(edge.source_id);
                      const targetNode = nodeById.get(edge.target_id);

                      return (
                        <div
                          key={edge.id}
                          className="rounded-md border-2 border-border-default bg-bg-panel px-4 py-3"
                        >
                          <p className="text-sm font-semibold text-text-primary">
                            {sourceNode?.name}
                            {" -> "}
                            {targetNode?.name}
                          </p>
                          <p className="mt-1 text-sm leading-6 text-text-secondary">
                            {edge.label}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                  <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-text-tertiary">
                    Path {String(groupIndex + 1).padStart(2, "0")}
                  </p>
                </article>
              );
            })}

            {connectionGroups.length === 0 && (
              <article className="atlas-card p-5 text-sm text-text-secondary">
                No explicit architecture connections were present in this sample.
              </article>
            )}
          </div>
        </section>

        <section>
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
              Relationship notes
            </p>
            <h4 className="mt-2 text-lg font-semibold text-text-primary">
              Extracted relationship labels
            </h4>
          </div>

          <div className="grid gap-3 lg:grid-cols-2">
            {architecture.key_relationships.map((relationship) => (
              <div
                key={relationship}
                className="atlas-card px-4 py-3 text-sm text-text-secondary"
              >
                {relationship}
              </div>
            ))}
          </div>
        </section>
      </div>
    </MentalModelSectionFrame>
  );
}
