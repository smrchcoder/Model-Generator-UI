import clsx from "clsx";

type SurfaceTone = "surface" | "panel" | "canvas";
type SurfaceRadius = "lg" | "xl" | "2xl";
type SurfaceShadow = "none" | "panel" | "float" | "soft";

interface SurfaceStyleOptions {
  tone?: SurfaceTone;
  radius?: SurfaceRadius;
  shadow?: SurfaceShadow;
  className?: string;
}

const surfaceToneClasses: Record<SurfaceTone, string> = {
  surface: "bg-bg-surface",
  panel: "bg-bg-panel",
  canvas: "bg-bg-canvas/90",
};

const surfaceRadiusClasses: Record<SurfaceRadius, string> = {
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-[1.5rem]",
};

const surfaceShadowClasses: Record<SurfaceShadow, string> = {
  none: "",
  panel: "shadow-panel",
  float: "shadow-float",
  soft: "shadow-[0_14px_34px_rgba(24,28,31,0.12)]",
};

export function surfaceStyles({
  tone = "surface",
  radius = "lg",
  shadow = "panel",
  className,
}: SurfaceStyleOptions = {}) {
  return clsx(
    "border-2 border-border-default",
    surfaceToneClasses[tone],
    surfaceRadiusClasses[radius],
    surfaceShadowClasses[shadow],
    className,
  );
}

type BadgeTone = "surface" | "panel" | "mint" | "teal" | "blue" | "copper";
type BadgeShape = "soft" | "pill";
type BadgeSize = "sm" | "md";

interface BadgeStyleOptions {
  tone?: BadgeTone;
  shape?: BadgeShape;
  size?: BadgeSize;
  className?: string;
}

const badgeToneClasses: Record<BadgeTone, string> = {
  surface: "bg-bg-surface text-text-secondary",
  panel: "bg-bg-panel text-text-secondary",
  mint: "bg-accent-mint text-text-primary",
  teal: "bg-accent-teal text-text-inverse",
  blue: "bg-accent-blue text-text-inverse",
  copper: "bg-accent-copper text-text-inverse",
};

const badgeShapeClasses: Record<BadgeShape, string> = {
  soft: "rounded-md",
  pill: "rounded-full",
};

const badgeSizeClasses: Record<BadgeSize, string> = {
  sm: "px-3 py-1.5 text-[11px] tracking-[0.18em]",
  md: "px-4 py-2 text-[11px] tracking-[0.16em]",
};

export function badgeStyles({
  tone = "surface",
  shape = "soft",
  size = "sm",
  className,
}: BadgeStyleOptions = {}) {
  return clsx(
    "inline-flex items-center gap-2 border-2 border-border-default font-mono font-semibold uppercase shadow-panel",
    badgeToneClasses[tone],
    badgeShapeClasses[shape],
    badgeSizeClasses[size],
    className,
  );
}

type ButtonVariant = "primary" | "secondary" | "panel";
type ButtonShape = "soft" | "pill";
type ButtonSize = "md" | "lg";

interface ButtonStyleOptions {
  variant?: ButtonVariant;
  shape?: ButtonShape;
  size?: ButtonSize;
  disabled?: boolean;
  className?: string;
}

const buttonVariantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-border-default bg-accent-blue text-text-inverse shadow-panel hover:-translate-y-0.5",
  secondary:
    "border-border-default bg-bg-surface text-text-primary shadow-panel hover:-translate-y-0.5",
  panel:
    "border-border-default bg-bg-panel text-text-secondary hover:text-text-primary",
};

const buttonShapeClasses: Record<ButtonShape, string> = {
  soft: "rounded-md",
  pill: "rounded-full",
};

const buttonSizeClasses: Record<ButtonSize, string> = {
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-sm",
};

export function buttonStyles({
  variant = "primary",
  shape = "soft",
  size = "md",
  disabled = false,
  className,
}: ButtonStyleOptions = {}) {
  return clsx(
    "inline-flex items-center justify-center gap-2 border-2 font-bold transition-all duration-150",
    buttonShapeClasses[shape],
    buttonSizeClasses[size],
    disabled
      ? "cursor-not-allowed border border-border-subtle bg-bg-panel text-text-tertiary"
      : buttonVariantClasses[variant],
    className,
  );
}
