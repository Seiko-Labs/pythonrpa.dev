import { SignUpRequest } from "@/backend/controllers/auth/sign-up/dto";
import type { z } from "zod";

export type CreateAccountInput = Omit<z.infer<typeof SignUpRequest>, "passwordConfirmation">;
