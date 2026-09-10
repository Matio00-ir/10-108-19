"use client";

import Image from "next/image";
import { useId, useState } from "react";
import type { Packaging } from "@/types";
import { PRODUCT_IMAGES_ENABLED } from "@/lib/constants";
import { cn } from "@/lib/cn";

interface Props {
  src: string;
  alt: string;
  packaging: Packaging;
  brandText?: string;
  name?: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Product image with a branded SVG fallback. In the finished demo every product
 * has a real `.webp` and the fallback never shows — it only guarantees that no
 * card or gallery is ever blank while assets are being produced.
 */
export function ProductImage({
  src,
  alt,
  packaging,
  brandText,
  name,
  className,
  sizes = "(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 240px",
  priority,
}: Props) {
  const [failed, setFailed] = useState(false);
  const showImage = PRODUCT_IMAGES_ENABLED && !!src && !failed;

  return (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden bg-white",
        className,
      )}
    >
      {showImage ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-contain p-3"
          onError={() => setFailed(true)}
        />
      ) : (
        <FallbackGlyph packaging={packaging} brandText={brandText} name={name} />
      )}
    </div>
  );
}

type Shape = "tub" | "bottle" | "box" | "tube";

const ARCHETYPE: Record<Packaging, Shape> = {
  tub: "tub",
  bottle: "bottle",
  "softgel-bottle": "bottle",
  dropper: "bottle",
  box: "box",
  "sachet-box": "box",
  blister: "box",
  tube: "tube",
};

/** Harmonised accent per package type so category shelves read as varied-but-designed. */
const HUE: Record<Shape, { light: string; mid: string; dark: string }> = {
  tub: { light: "#5aa0e6", mid: "#2f7fd6", dark: "#1c5fa8" },
  bottle: { light: "#3fb6c9", mid: "#1f9bb3", dark: "#137487" },
  box: { light: "#7d8bd6", mid: "#5b6cc4", dark: "#3f4e9e" },
  tube: { light: "#dd8ea0", mid: "#cf6f86", dark: "#a94e66" },
};

function FallbackGlyph({
  packaging,
  brandText,
}: {
  packaging: Packaging;
  brandText?: string;
  name?: string;
}) {
  const shape = ARCHETYPE[packaging];
  const c = HUE[shape];
  const uid = useId().replace(/[:]/g, "");
  const bodyFill = `url(#${uid}-body)`;

  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#f3f8fd] to-[#eceff4]">
      <svg viewBox="0 0 200 200" className="size-full" aria-hidden>
        <defs>
          <linearGradient id={`${uid}-body`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={c.light} />
            <stop offset="1" stopColor={c.dark} />
          </linearGradient>
        </defs>

        {/* soft pedestal shadow */}
        <ellipse cx="100" cy="171" rx="47" ry="7.5" fill="#0f2f57" opacity="0.1" />

        {shape === "tub" && (
          <g>
            <rect x="66" y="34" width="68" height="16" rx="6" fill={c.dark} />
            <rect x="60" y="48" width="80" height="112" rx="14" fill={bodyFill} />
            <rect x="70" y="52" width="12" height="104" rx="6" fill="#fff" opacity="0.16" />
            <rect x="70" y="86" width="60" height="42" rx="7" fill="#fff" opacity="0.94" />
            <rect x="70" y="86" width="60" height="6" rx="3" fill={c.mid} />
          </g>
        )}
        {shape === "bottle" && (
          <g>
            <rect x="86" y="26" width="28" height="18" rx="5" fill={c.dark} />
            <rect x="72" y="44" width="56" height="116" rx="18" fill={bodyFill} />
            <rect x="80" y="50" width="10" height="104" rx="5" fill="#fff" opacity="0.16" />
            <rect x="80" y="84" width="40" height="52" rx="7" fill="#fff" opacity="0.94" />
            <rect x="80" y="84" width="40" height="6" rx="3" fill={c.mid} />
          </g>
        )}
        {shape === "box" && (
          <g>
            <rect x="62" y="40" width="76" height="120" rx="9" fill={bodyFill} />
            <rect x="70" y="46" width="10" height="108" rx="5" fill="#fff" opacity="0.16" />
            <path d="M62 74 H138" stroke="#fff" strokeWidth="2" opacity="0.5" />
            <rect x="74" y="90" width="52" height="44" rx="7" fill="#fff" opacity="0.94" />
            <rect x="74" y="90" width="52" height="6" rx="3" fill={c.mid} />
          </g>
        )}
        {shape === "tube" && (
          <g>
            <path d="M84 30 H116 L110 44 H90 Z" fill={c.dark} />
            <rect x="76" y="44" width="48" height="118" rx="16" fill={bodyFill} />
            <rect x="84" y="50" width="9" height="106" rx="4" fill="#fff" opacity="0.16" />
            <rect x="84" y="86" width="32" height="50" rx="7" fill="#fff" opacity="0.94" />
            <rect x="84" y="86" width="32" height="6" rx="3" fill={c.mid} />
          </g>
        )}

        {brandText && (
          <text
            x="100"
            y={shape === "box" ? 118 : 116}
            textAnchor="middle"
            fontSize="12"
            fontWeight="800"
            fill={c.dark}
            fontFamily="var(--font-vazir), sans-serif"
          >
            {brandText}
          </text>
        )}
      </svg>
    </div>
  );
}
