import type { MentalModelSectionId } from "../../types/mentalModel";

export type SectionPalette = {
  frame: string;
  header: string;
  surface: string;
  accentText: string;
  accentBg: string;
  border: string;
  dot: string;
};

export const sectionPalettes: Record<MentalModelSectionId, SectionPalette> = {
  overview: {
    frame: "border-blue-700 bg-[#dcecff]",
    header: "border-blue-700 bg-[#a8d1ff]",
    surface: "border-blue-700/45 bg-white/80",
    accentText: "text-blue-800",
    accentBg: "bg-blue-100",
    border: "border-blue-700",
    dot: "bg-blue-700",
  },
  key_concepts: {
    frame: "border-emerald-700 bg-[#d9f8dd]",
    header: "border-emerald-700 bg-[#bdf2a2]",
    surface: "border-emerald-700/45 bg-white/80",
    accentText: "text-emerald-800",
    accentBg: "bg-emerald-100",
    border: "border-emerald-700",
    dot: "bg-emerald-700",
  },
  problem_statement: {
    frame: "border-rose-700 bg-[#ffe0e7]",
    header: "border-rose-700 bg-[#ffb2c1]",
    surface: "border-rose-700/45 bg-white/80",
    accentText: "text-rose-800",
    accentBg: "bg-rose-100",
    border: "border-rose-700",
    dot: "bg-rose-700",
  },
  architecture: {
    frame: "border-cyan-800 bg-[#d5fbff]",
    header: "border-cyan-800 bg-[#91eff7]",
    surface: "border-cyan-800/45 bg-white/80",
    accentText: "text-cyan-900",
    accentBg: "bg-cyan-100",
    border: "border-cyan-800",
    dot: "bg-cyan-800",
  },
  flow: {
    frame: "border-violet-700 bg-[#eadfff]",
    header: "border-violet-700 bg-[#d2b8ff]",
    surface: "border-violet-700/45 bg-white/80",
    accentText: "text-violet-800",
    accentBg: "bg-violet-100",
    border: "border-violet-700",
    dot: "bg-violet-700",
  },
  tradeoffs: {
    frame: "border-amber-700 bg-[#fff1bf]",
    header: "border-amber-700 bg-[#ffd86b]",
    surface: "border-amber-700/45 bg-white/80",
    accentText: "text-amber-900",
    accentBg: "bg-amber-100",
    border: "border-amber-700",
    dot: "bg-amber-700",
  },
};

export const getSectionPalette = (sectionId: MentalModelSectionId) =>
  sectionPalettes[sectionId];
