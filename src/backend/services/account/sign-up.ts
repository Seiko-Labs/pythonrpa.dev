import { AccountRepository } from "@/backend/core/account";
import { ServiceResponse } from "../types";
import { ErrorType } from "@/shared/types/error/parser";
import { Errors } from "@/shared/types/error/list";
import { CreateAccountInput } from "@/backend/core/account/types";

export async function signUpWithPassword(
  input: CreateAccountInput,
): Promise<ServiceResponse<null>> {
  // Check that the email is not already taken
  const existingAccount = await AccountRepository.findByEmail(input.email);

  if (existingAccount) {
    return {
      success: false,
      error: {
        type: ErrorType.APP,
        error: Errors.AccountAlreadyExists,
      },
    };
  }

  await AccountRepository.create(input);

  return { success: true, data: null };
}
