"use client";

import { type ReactNode, type FC, type HTMLAttributes } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface FlagProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode | undefined;
  iso?: string;
}

const alphabet = "abcdefghijklmnopqrstuvwxyz";

const incrementCodepoint = (codePoint: string, incrementBy: number): string => {
  const decimal = parseInt(codePoint, 16);
  return Number(decimal + incrementBy).toString(16);
};

const A_LETTER_CODEPOINT = "1f1e6";
const codepoints: Record<string, string> = alphabet
  .split("")
  .reduce((obj, currentLetter, index) => {
    return {
      ...obj,
      [currentLetter]: incrementCodepoint(A_LETTER_CODEPOINT, index),
    };
  }, {});

const getFlagCodepointByIso2 = (iso2: string) => {
  const iso0 = iso2[0];
  const iso1 = iso2[1];
  if (!iso0 || !iso1) {
    return;
  }

  return [codepoints[iso0], codepoints[iso1]].join("-");
};

const getSrc = (iso2: string) => {
  const flagCodepoint = getFlagCodepointByIso2(iso2);
  return `https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${flagCodepoint}.svg`;
};

export const Flag: FC<FlagProps> = ({ children, iso, className, ...props }) => (
  <div className={cn("flex w-full text-ellipsis items-center gap-2", className)} {...props}>
    {iso ? (
      <Image alt={iso} width={24} height={24} src={getSrc(iso.toLowerCase())} />
    ) : null}
    {children}
  </div>
);
