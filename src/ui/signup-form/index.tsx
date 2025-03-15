"use client";

import { cn } from "@/lib/utils";
import { Label } from "@/shared/primitives/label";
import { CountryCode } from "@/shared/data/countries";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { SignInPasswordRequest } from "@/backend/controllers/auth/sign-in/dto";
import { useRouter } from "next/navigation";
import { Input } from "@/shared/primitives/input";
import { PhoneInput } from "@/shared/primitives/phone-input";
import { Textarea } from "@/shared/primitives/textarea";
import { Button } from "@/shared/primitives/button";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpRequest } from "@/backend/controllers/auth/sign-up/dto";
import { CountryBox } from "@/shared/components/CountryBox";
import { signUp } from "@/backend/controllers/auth/sign-up";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/shared/primitives/radio-group";
import { IntendedUse } from "@prisma/client";
import { ErrorType } from "@/shared/types/error/parser";
import { Errors } from "@/shared/types/error/list";
import { ErrorLabel } from "@/shared/components/Form";

interface SignupFormProps extends React.ComponentPropsWithoutRef<"form"> {
  countryCode: CountryCode;
}

export function SignupForm({
  className,
  countryCode,
  ...props
}: SignupFormProps) {
  const { push } = useRouter();
  const form = useForm({
    defaultValues: {
      country: countryCode,
      preferredCommunicationLanguage: countryCode,
    },
    resolver: zodResolver(SignUpRequest),
  });
  const { register, handleSubmit, control } = form;

  const onAfterSignUp = async (data: SignInPasswordRequest) => {
    const toastId = toast.loading("Signing in...");
    const response = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    toast.dismiss(toastId);

    if (response?.error) {
      toast.error("An error occurred while signing in");
    }

    toast.success("Signed in successfully");

    push("/");
  };

  const onSubmit = async (data: SignUpRequest) => {
    const toastId = toast.loading("Creating account...");

    const response = await signUp(data);
    toast.dismiss(toastId);

    if (!response.success) {
      if (response.error.type === ErrorType.VALIDATION) {
        const errors = response.error.inputs;
        Object.keys(data).forEach((key) => {
          const error = errors[key];

          if (error) {
            form.setError(key as keyof SignUpRequest, {
              type: "manual",
              message: error,
            });
          }
        });
      } else {
        if (response.error.error === Errors.AccountAlreadyExists) {
          form.setError(
            "email",
            {
              type: "manual",
              message: Errors.AccountAlreadyExists,
            },
            {
              shouldFocus: true,
            },
          );

          return;
        }

        // 500 > Internal server error
        toast.error("An error occurred while signing up");
      }

      return;
    }

    onAfterSignUp({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <FormProvider {...form}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Sign up for an account</h1>
          <p className="text-balance text-sm text-muted-foreground">
            Enter your details below to create an account
          </p>
        </div>
        <div className="grid">
          <div className="grid">
            <ErrorLabel htmlFor="email">Email</ErrorLabel>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="m@example.com"
              {...register("email")}
            />
          </div>
          <div className="grid">
            <ErrorLabel htmlFor="password">Password</ErrorLabel>
            <Input
              type="password"
              id="password"
              autoComplete="new-password"
              {...register("password")}
            />
          </div>

          <div className="grid">
            <ErrorLabel htmlFor="firstName">First name</ErrorLabel>

            <Input
              id="firstName"
              autoComplete="given-name"
              placeholder="John"
              {...register("firstName")}
            />
          </div>

          <div className="grid">
            <ErrorLabel htmlFor="lastName">Last name</ErrorLabel>
            <Input
              id="lastName"
              autoComplete="family-name"
              placeholder="Doe"
              {...register("lastName")}
            />
          </div>

          <div className="grid">
            <ErrorLabel htmlFor="currentRole">Current role</ErrorLabel>
            <Input id="currentRole" {...register("currentRole")} />
          </div>

          <div className="grid">
            <ErrorLabel htmlFor="country">Country</ErrorLabel>

            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <CountryBox
                  value={field.value as CountryCode}
                  onValueChange={field.onChange}
                />
              )}
            />
          </div>

          <div className="grid">
            <ErrorLabel htmlFor="preferredCommunicationLanguage">
              Preffered communication language
            </ErrorLabel>

            <Controller
              name="preferredCommunicationLanguage"
              control={control}
              render={({ field }) => (
                <CountryBox
                  value={field.value as CountryCode}
                  onValueChange={field.onChange}
                />
              )}
            />
          </div>
          <div className="grid">
            <ErrorLabel htmlFor="whatsapp">Whatsapp</ErrorLabel>

            <Controller
              name="whatsapp"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  defaultCountry={countryCode}
                  id="whatsapp"
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value.target.value.replace(/\s/g, ""));
                  }}
                />
              )}
            />
          </div>
          <div className="grid">
            <ErrorLabel htmlFor="companyName">Company name</ErrorLabel>
            <Input
              id="companyName"
              autoComplete="organization"
              placeholder="Acme Inc."
              {...register("companyName")}
            />
          </div>
          <div className="grid my-2">
            <Label htmlFor={IntendedUse.BUSINESS_EFFICIENCY}>
              Intended usage of the platform
            </Label>
            <Controller
              name="intendedUse"
              control={control}
              defaultValue={IntendedUse.BUSINESS_EFFICIENCY}
              render={({ field }) => (
                <RadioGroup value={field.value} onValueChange={field.onChange}>
                  {Object.values(IntendedUse).map((value) => (
                    <div key={value} className="flex items-center space-x-2">
                      <RadioGroupItem value={value} id={value} />
                      <Label htmlFor={value}>{value}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
          </div>
          <div className="grid">
            <ErrorLabel htmlFor="comments">Comments</ErrorLabel>
            <Textarea
              id="comments"
              placeholder="Comments"
              rows={5}
              {...register("comments")}
            />
          </div>
          <Button size="lg" type="submit" className="w-full mt-4">
            Sign up
          </Button>
        </div>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </FormProvider>
    </form>
  );
}
