import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import SunIcon from "@/shared/icons/sun.svg";
import MoonIcon from "@/shared/icons/moon.svg";

const ThemeSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    checked
    className={cn(
      "peer inline-flex h-[30px] relative w-[60px] shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-theme-checked data-[state=unchecked]:bg-theme-unchecked",
      className
    )}
    {...props}
    ref={ref}
  >
    <SunIcon className="size-5 absolute ml-[3px] z-30 left-0 top-1/2 -translate-y-1/2" />
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none block h-[26.25px] w-[26.25px] rounded-full theme-switch-thumb shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-[28.75px] data-[state=unchecked]:translate-x-0"
      )}
    />
    <MoonIcon className="size-5 absolute mr-[3px] z-30 right-0 top-1/2 -translate-y-1/2" />
  </SwitchPrimitives.Root>
));

ThemeSwitch.displayName = "ThemeSwitch";

export { ThemeSwitch };
