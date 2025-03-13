import * as z from "zod";
import "server-only";
import { env } from "next-runtime-env";

const Configuration = z.object({
  /**
   * Current environment
   */
  NODE_ENV: z.string().default("development"),

  /**
   * Secret (pepper) for Argon2 password hashing
   */
  ARGON2_SECRET: z.string(),
});

/**
 * Wrap env() to return empty string if the variable is not set to pass CI checks
 * @param name - Environment variable name
 * @returns Environment variable value or empty string
 */
const readEnv = (name: string): string | undefined => {
  const value = env(name);
  if (value !== undefined) {
    return value;
  }

  // During build, runtime env configuration might not be available
  return env("CI") === "true" ? "" : undefined;
};

export const config = Configuration.parse({
  NODE_ENV: readEnv("NODE_ENV"),
  ARGON2_SECRET: readEnv("ARGON2_SECRET"),
});
