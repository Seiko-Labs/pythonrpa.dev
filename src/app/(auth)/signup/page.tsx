import { CountryCode } from "@/shared/data/countries";
import { SignupForm } from "@/ui/signup-form";
import { headers } from "next/headers";

async function getIp(): Promise<string | null> {
  const headersMap = await headers();

  if (process.env.NODE_ENV === "development") {
    // If we're in development, return a dummy IP address
    return "24.48.0.1";
  }

  return headersMap.get("x-forwarded-for")?.split(",")[0] ?? null;
}

export default async function SignupPage() {
  const ip = await getIp();

  const data: { countryCode: CountryCode } = await fetch(
    `http://ip-api.com/json/${ip}`
  ).then((res) => res.json());

  return <SignupForm countryCode={data.countryCode} />;
}
