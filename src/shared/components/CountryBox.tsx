"use client";

import * as React from "react";
import { SearchIcon } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "../primitives/popover";

import { Button } from "../primitives/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../primitives/command";
import { countries, CountryCode } from "../data/countries";
import { Flag } from "../primitives/country-flag";

interface CountryBoxProps {
  value: CountryCode;
  onValueChange: (value: CountryCode) => void;
}

export function CountryBox({ value, onValueChange }: CountryBoxProps) {
  const [open, setOpen] = React.useState(false);

  const country = React.useMemo(
    () => countries.find(([code]) => code === value),
    [value]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="px-2 justify-between"
        >
          <Flag className="[&>img]:size-6" iso={country?.[0]}>
            {country?.[1]}
          </Flag>

          <SearchIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 min-w-[var(--radix-popover-trigger-width)] max-w-[var(--radix-popover-trigger-width)]">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            <CommandGroup>
              {countries.map(([code, name]) => (
                <CommandItem
                  key={code}
                  // Setting value a country name to make it searchable
                  value={name}
                  className={value === code ? "underline" : ""}
                  onSelect={() => {
                    onValueChange(code);
                    setOpen(false);
                  }}
                >
                  <Flag iso={code} className="[&>img]:size-5">
                    {name}
                  </Flag>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
