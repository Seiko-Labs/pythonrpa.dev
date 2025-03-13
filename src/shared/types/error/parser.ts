import type * as z from "zod";
import { Errors } from "./list";

export enum ErrorType {
  VALIDATION = "VALIDATION",
  APP = "APP",
}

export interface ValidationError {
  type: ErrorType.VALIDATION;
  inputs: Record<string, Errors>;
}

export interface AppError {
  type: ErrorType.APP;
  error: Errors;
}

export type ServiceError = ValidationError | AppError;

/**
 * Ensures that error codes are prefixed with 'ERR_'.
 * If not, it returns a generic error code to prevent
 * unexpected revealing of sensitive information.
 *
 * If the error code is not found, it returns a generic error code.
 *
 * @param code - Error message
 * @returns Error code
 */
const validateErrorCode = (code: string): Errors => {
  if (code === "Required") {
    return Errors.Required;
  }

  // Simple check for now, later we can use a more complex check
  if (!code.startsWith("ERR_")) {
    return Errors.Generic;
  }

  return code as Errors;
};

/**
 * Reduces a ZodError into a validation error object.
 * @param error - Zod parser error.
 * @returns Validation error object suitable for returning to the client.
 */
export const reduceParserError = (error: z.ZodError): ValidationError => {
  const fields = error.errors.reduce<Record<string, Errors>>(
    (acc, curr) => ({
      ...acc,
      [curr.path.join(".")]: validateErrorCode(curr.message),
    }),
    {}
  );

  return {
    type: ErrorType.VALIDATION,
    inputs: fields,
  };
};
