import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { type ServiceResponse } from "./backend/services/types";
import { Errors } from "./shared/types/error/list";
import { signInPassword } from "./backend/controllers/auth/sign-in";
import { SignInPasswordRequest } from "./backend/controllers/auth/sign-in/dto";
import { ErrorType } from "./shared/types/error/parser";

export interface CustomUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  provider: string;
  isAdmin: boolean;
}

export interface Session {
  user: CustomUser;
  expires: string;
}

const nextAuth = NextAuth({
  pages: {
    error: "/",
  },
  providers: [
    Credentials({
      name: "Email",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john@acme.corp",
          required: true,
        },
        password: {
          label: "Password",
          type: "password",
          required: true,
        },
      },
      async authorize(params) {
        const authorization = await signInPassword(
          params as SignInPasswordRequest,
        );

        if (!authorization.success) {
          throw new CredentialsSignin("Invalid credentials");
        }

        const account = authorization.data;
        return {
          id: account.id,
          email: account.email,
          firstName: account.firstName,
          lastName: account.lastName,
          provider: "credentials",
          isAdmin: account.isAdmin,
        } as CustomUser;
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (!account) {
        return false;
      }

      if (account.provider === "credentials") {
        return true;
      }

      return false;
    },
    session({ token, session }) {
      return {
        user: {
          id: token.id,
          firstName: token.firstName,
          lastName: token.lastName,
          email: token.email,
          provider: token.provider,
          isAdmin: token.isAdmin,
        } as CustomUser,
        expires: session.expires,
      };
    },
    async jwt({ account, token, user, trigger }) {
      // Passthrough the token during session requests
      if (!trigger) {
        return token;
      }

      const { provider } = account!;

      if (provider === "credentials") {
        const u = user as CustomUser;
        const newToken: typeof token & CustomUser = {
          ...token,
          id: u.id,
          firstName: u.firstName,
          lastName: u.lastName,
          email: u.email,
          isAdmin: u.isAdmin,
          provider,
        };

        return newToken;
      }

      return token;
    },
  },
});

/**
 * Returns the current session for RSC
 * Use with caution, as this function will throw an error if the session is not available.
 *
 * For safe usage, consider using `getSessionSafe` instead.
 * @returns Session
 */
export async function getSession(): Promise<Session> {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Session is not available");
  }

  return {
    user: session.user as CustomUser,
    expires: session.expires,
  };
}

/**
 * Returns the current session for RSC
 * @returns Session if available, otherwise null
 */
export async function getSessionSafe(): Promise<Session | null> {
  const session = await auth();
  if (!session?.user) {
    return null;
  }

  return {
    user: session.user as CustomUser,
    expires: session.expires,
  };
}

/**
 * Returns the current session for RSC as a service response.
 * @param opts - Optional parameters
 * @returns Session or standard error response
 */
export async function getServiceSession(): Promise<ServiceResponse<Session>> {
  const session = await getSessionSafe();
  if (!session) {
    return {
      success: false,
      error: {
        type: ErrorType.APP,
        error: Errors.Unauthorized,
      },
    };
  }

  return {
    success: true,
    data: session,
  };
}

/**
 * Returns the current session for RSC as a service response.
 * Additionally, checks if the organization ID is available.
 * @returns Session or standard error response
 */
export async function getServiceSessionWithOrg(): Promise<
  ServiceResponse<Session>
> {
  const session = await getServiceSession();

  if (!session.success) {
    return {
      success: false,
      error: {
        type: ErrorType.APP,
        error: Errors.Unauthorized,
      },
    };
  }

  return session as ServiceResponse<Session>;
}

export const { auth } = nextAuth;
export const { GET, POST } = nextAuth.handlers;
