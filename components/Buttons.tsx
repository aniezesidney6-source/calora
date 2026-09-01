import * as React from "react";

type Btn = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: "button";
};
type Anchor = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: "a";
  href: string;
};

type PrimaryProps = (Btn | Anchor) & { fullWidth?: boolean; onPhoto?: boolean };

/** Solid black CTA with gold inset. bg #121212 -> #0C0A09 on hover, 180ms. */
export function PrimaryButton({
  fullWidth,
  onPhoto,
  className = "",
  children,
  ...rest
}: PrimaryProps) {
  const classes = [
    "inline-flex h-12 items-center justify-center gap-2.5 rounded-btn px-5",
    "bg-btn text-surface text-base font-medium leading-5",
    "shadow-gold-inset transition-colors duration-[180ms] ease-out-soft",
    "hover:bg-btn-hover",
    onPhoto ? "on-photo" : "",
    fullWidth ? "w-full" : "",
    className,
  ].join(" ");

  if ("as" in rest && rest.as === "a") {
    const { as: _as, ...a } = rest as Anchor;
    return (
      <a className={classes} {...a}>
        {children}
      </a>
    );
  }
  const { as: _as, ...b } = rest as Btn;
  return (
    <button className={classes} {...b}>
      {children}
    </button>
  );
}

type GhostProps = (Btn | Anchor) & { fullWidth?: boolean };

/** Translucent white-bordered button for use on photos. */
export function GhostButton({
  fullWidth,
  className = "",
  children,
  ...rest
}: GhostProps) {
  const classes = [
    "on-photo inline-flex h-12 items-center justify-center gap-2.5 rounded-btn px-5",
    "border-[1.5px] border-white bg-white/[0.14] text-surface text-base font-medium leading-5",
    "transition-colors duration-[180ms] ease-out-soft",
    "hover:bg-white/25 hover:border-white",
    fullWidth ? "w-full" : "",
    className,
  ].join(" ");

  if ("as" in rest && rest.as === "a") {
    const { as: _as, ...a } = rest as Anchor;
    return (
      <a className={classes} {...a}>
        {children}
      </a>
    );
  }
  const { as: _as, ...b } = rest as Btn;
  return (
    <button className={classes} {...b}>
      {children}
    </button>
  );
}
