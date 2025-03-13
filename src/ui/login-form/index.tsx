"use client";

import { SignInPasswordRequest } from "@/backend/controllers/auth/sign-in/dto";
import { cn } from "@/lib/utils";
import { ErrorLabel } from "@/shared/components/Form";
import { Button } from "@/shared/primitives/button";
import { Input } from "@/shared/primitives/input";
import { Errors } from "@/shared/types/error/list";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const { push } = useRouter();

  const form = useForm({
    resolver: zodResolver(SignInPasswordRequest),
  });
  const { register, handleSubmit } = form;

  const t = useTranslations("LoginForm");

  const onSubmit = async (data: SignInPasswordRequest) => {
    const toastId = toast.loading(t("signingIn"));
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    toast.dismiss(toastId);

    if (response?.error) {
      form.setError("email", {
        type: "manual",
        message: Errors.InvalidCredentials,
      });

      return;
    }

    toast.success(t("signInSuccess"));

    push("/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FormProvider {...form}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <p className="text-balance text-sm text-muted-foreground">
            {t("description")}
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid">
            <ErrorLabel htmlFor="email">{t("emailLabel")}</ErrorLabel>
            <Input
              id="email"
              placeholder="m@example.com"
              type="email"
              autoComplete="email"
              {...register("email")}
            />
          </div>
          <div className="grid">
            <div className="flex items-center">
              <ErrorLabel htmlFor="password">{t("passwordLabel")}</ErrorLabel>
              <Link
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                {t("forgotPassword")}
              </Link>
            </div>

            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              {...register("password")}
            />
          </div>
          <Button type="submit" className="w-full">
            {t("submitButton")}
          </Button>
        </div>
        <div className="text-center text-sm">
          {t("noAccount")}{" "}
          <Link href="/signup" className="underline underline-offset-4">
            {t("signUp")}
          </Link>
        </div>
      </FormProvider>
    </form>
  );
}
