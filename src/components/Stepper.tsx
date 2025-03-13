import { ReactNode } from "react";

interface StepProps {
  title: string;
  children: ReactNode;
}

export function Step({ title, children }: StepProps) {
  return (
    <div className="p-2.5 bg-muted rounded-md">
      <p className="font-bold mb-2">{title}</p>
      {children}
    </div>
  );
}

interface StepperProps {
  children: ReactNode;
}

export function Stepper({ children }: StepperProps) {
  return (
    <div className="space-y-4">
      {children}
    </div>
  );
} 