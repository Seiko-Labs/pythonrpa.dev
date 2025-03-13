import { Errors } from "./list";
import type { ServiceError } from "./parser";
import { ErrorType } from "./parser";

export const UnauthorizedError: ServiceError = {
  type: ErrorType.APP,
  error: Errors.Unauthorized,
};

export const InternalError: ServiceError = {
  type: ErrorType.APP,
  error: Errors.Generic,
};

export const NotFound: ServiceError = {
  type: ErrorType.APP,
  error: Errors.NotFound,
};
