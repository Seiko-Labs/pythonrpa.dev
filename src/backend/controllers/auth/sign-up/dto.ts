import {
  Email,
  Password,
  FirstName,
  LastName,
  Phone,
} from "@/shared/types/account";
import { ServiceError } from "@/shared/types/error/parser";
import { Country } from "@/shared/types/geo";
import { IntendedUse } from "@prisma/client";
import * as z from "zod";

export const SignUpRequest = z.object({
  firstName: FirstName,
  lastName: LastName,
  email: Email,
  password: Password,
  whatsapp: Phone,
  country: Country,
  companyName: z.string(),
  currentRole: z.string(),
  preferredCommunicationLanguage: Country,
  intendedUse: z.nativeEnum(IntendedUse),
  comments: z.string().optional(),
});

export interface SignUpSuccess {
  success: true;
}

export interface SignUpFailure {
  success: false;
  error: ServiceError;
}

export type SignUpRequest = z.infer<typeof SignUpRequest>;
export type SignUpResponse = SignUpSuccess | SignUpFailure;
