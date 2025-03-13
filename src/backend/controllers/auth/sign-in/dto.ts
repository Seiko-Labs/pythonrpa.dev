import * as z from "zod";
import type { AccountRepository } from "@/backend/core/account";
import { ServiceError } from "@/shared/types/error/parser";

export const SignInPasswordRequest = z.object({
  email: z.string().min(10),
  password: z.string(),
});

export type SignInPasswordRequest = z.infer<typeof SignInPasswordRequest>;

export interface SignInPasswordSuccess {
  success: true;
  data: AccountRepository;
}

export interface SignInPasswordFailure {
  success: false;
  error: ServiceError;
}

export type SignInPasswordResponse =
  | SignInPasswordSuccess
  | SignInPasswordFailure;
