import { iso31661 } from "iso-3166";
import * as z from "zod";
import { Errors } from "./error/list";

export const countries = iso31661.flatMap((c) => c.alpha2);

export const Country = z
  .string()
  .toUpperCase()
  .refine((c) => countries.includes(c), Errors.CountryIncorrect);
