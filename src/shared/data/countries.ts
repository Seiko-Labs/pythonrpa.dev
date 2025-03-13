import { iso31661 } from "iso-3166";
import { CountryCode as CC } from "libphonenumber-js";

export type CountryName = string;
export type CountryCode = CC;
export type CountryEntry = [CountryCode, CountryName];

export const countries: CountryEntry[] = iso31661.map((entry) => [
  entry.alpha2 as CountryCode,
  entry.name,
]);

export const getCountryNameByCode = (countryCode: CountryCode): string => {
  const result = countries.find((country) => country[0] === countryCode);
  if (!result?.[1]) {
    throw new Error("Country not found");
  }

  return result?.[1];
};
