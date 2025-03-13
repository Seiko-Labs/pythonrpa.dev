"use server";

import { checkPasswordAuth } from "@/backend/services/account/sign-in";
import type { SignInPasswordResponse } from "./dto";
import { SignInPasswordRequest } from "./dto";
import { reduceParserError } from "@/shared/types/error/parser";

const signInPassword = async (
  values: SignInPasswordRequest,
): Promise<SignInPasswordResponse> => {
  // Validate input
  const props = SignInPasswordRequest.safeParse(values);
  if (!props.success) {
    return {
      success: false,
      error: reduceParserError(props.error),
    };
  }

  // Validate credentials
  return checkPasswordAuth(props.data);
};

export { signInPassword };
