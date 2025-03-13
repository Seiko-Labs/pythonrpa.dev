import { AccountRepository } from "@/backend/core/account";
import { Errors } from "@/shared/types/error/list";
import { type ServiceResponse } from "../types";
import { ErrorType } from "@/shared/types/error/parser";

export interface PasswordCredentials {
  email: string;
  password: string;
  totp?: string;
}

export interface PasswordAuthOpts {
  skipMfa?: boolean;
}

/**
 * Checks if the given credentials are valid.
 * @param credentials - User credentials.
 * @returns AccountRepository instance if the credentials are valid, null otherwise.
 */
export async function checkPasswordAuth(
  credentials: PasswordCredentials,
): Promise<ServiceResponse<AccountRepository>> {
  const account = await AccountRepository.findByEmail(credentials.email);
  if (!account) {
    return {
      success: false,
      error: {
        type: ErrorType.APP,
        error: Errors.AccountNotFound,
      },
    };
  }

  const valid = await account.verifyPassword(credentials.password);
  if (!valid) {
    return {
      success: false,
      error: {
        type: ErrorType.APP,
        error: Errors.InvalidCredentials,
      },
    };
  }

  return {
    success: true,
    data: account,
  };
}
