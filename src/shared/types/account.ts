import * as z from "zod";
import { Errors } from "./error/list";

export const Email = z.string().email(Errors.EmailIncorrect);
export const Password = z
  .string()
  .min(8, Errors.PasswordTooShort)
  .max(64, Errors.PasswordTooLong);

export const FirstName = z
  .string()
  .min(2, Errors.FirstNameIncorrect)
  .max(64, Errors.FirstNameIncorrect);

export const LastName = z
  .string()
  .min(2, Errors.LastNameIncorrect)
  .max(64, Errors.LastNameIncorrect);

export const Phone = z
  .string()
  .regex(/^\+?[0-9]{6,14}$/, Errors.PhoneIncorrect);
