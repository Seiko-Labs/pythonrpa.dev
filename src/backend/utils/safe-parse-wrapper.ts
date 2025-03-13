import type { SafeParseReturnType } from "zod";
import type { ServiceResponse } from "../services/types";
import { reduceParserError } from "@/shared/types/error/parser";

type ExtractSuccess<T> = T extends { success: true; data: infer S } ? S : never;

/**
 * Wraps the result of zod.safeParse call into a ServiceResponse format.
 * @param result - Result of zod.safeParse call
 * @returns Parse result (or error) in ServiceResponse format
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- they are important to extract the actual type
export function wrapSafeParse<T extends SafeParseReturnType<any, any>>(
  result: T
): ServiceResponse<ExtractSuccess<T>> {
  if (!result.success) {
    return {
      success: false,
      error: reduceParserError(result.error),
    };
  }

  return {
    success: true,
    data: result.data,
  };
}
