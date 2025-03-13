import type { MDXComponents } from "mdx/types";
import { Stepper, Step } from "@/components/Stepper";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Stepper,
    Step,
  };
}
