import { cn } from "@/lib/utils";
import { FC, ComponentProps } from "react";
import { FieldError, useFormContext } from "react-hook-form";
import { Label } from "../primitives/label";

export const ErrorLabel: FC<
  ComponentProps<typeof Label> & { htmlFor: string }
> = ({ children, htmlFor, className, ...props }) => {
  const context = useFormContext();
  const error = context.formState.errors[htmlFor] as FieldError;

  return (
    <Label
      htmlFor={htmlFor}
      className={cn("overflow-hidden text-ellipsis", className)}
      {...props}
    >
      {children}{" "}
      {error?.message ? (
        <span className="text-destructive text-xs">{error?.message}</span>
      ) : null}
    </Label>
  );
};
