import { ServiceError } from "@/shared/types/error/parser";

export interface ServiceResponseFail {
  success: false;
  error: ServiceError;
}

export interface ServiceResponseSuccess<T> {
  success: true;
  data: T;
}

export type ServiceResponse<T = undefined> =
  | ServiceResponseFail
  | ServiceResponseSuccess<T>;
