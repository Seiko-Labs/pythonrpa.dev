"use server";

import { reduceParserError } from "@/shared/types/error/parser";
import { SignUpRequest, SignUpResponse } from "./dto";
import { signUpWithPassword } from "@/backend/services/account/sign-up";

export async function signUp(values: SignUpRequest): Promise<SignUpResponse> {
  // Validate input
  const props = SignUpRequest.safeParse(values);
  if (!props.success) {
    return { success: false, error: reduceParserError(props.error) };
  }

  // Register account
  const acc = await signUpWithPassword(props.data);
  if (acc.success) {
    return { success: true };
  }

  return {
    success: false,
    error: acc.error,
  };
}
