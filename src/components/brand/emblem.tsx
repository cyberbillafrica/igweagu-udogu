import Image from "next/image";

import { cn } from "@/lib/cn";

type EmblemProps = {
  className?: string;
  priority?: boolean;
  sizes?: string;
};

/**
 * The official emblem, used unmodified. The artwork's warm-white ground is
 * part of the asset, so it is always placed on light surfaces and never masked,
 * recoloured or stretched.
 */
export function Emblem({
  className,
  priority = false,
  sizes = "(max-width: 640px) 150px, 190px",
}: EmblemProps) {
  return (
    <Image
      src="/brand/igweagu-emblem.jpg"
      alt="Official emblem of Igweagu Udogu Igbonine Gbulugbulu: a gold-rimmed crest bearing the organisation's name, the words “The New Covenant · Ndi Gboo”, and the line “Born from 1967–1976”."
      width={888}
      height={584}
      priority={priority}
      sizes={sizes}
      className={cn("h-auto w-auto object-contain", className)}
    />
  );
}
