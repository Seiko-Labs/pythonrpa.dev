import {
  AsYouType,
  type CarrierCode,
  type CountryCallingCode,
  type E164Number,
  type NationalNumber,
  type CountryCode,
  type NumberType,
  getCountryCallingCode,
} from "libphonenumber-js";
import * as React from "react";
import { useStateHistory } from "../hooks/use-state-history";
import { Input } from "./input";

export type PhoneData = {
  phoneNumber?: E164Number;
  countryCode?: CountryCode;
  countryCallingCode?: CountryCallingCode;
  carrierCode?: CarrierCode;
  nationalNumber?: NationalNumber;
  internationalNumber?: string;
  possibleCountries?: string;
  isValid?: boolean;
  isPossible?: boolean;
  uri?: string;
  type?: NumberType;
};

interface PhoneInputProps extends React.ComponentPropsWithoutRef<"input"> {
  value?: string;
  defaultCountry: CountryCode;
}

export function getPhoneData(phone: string): PhoneData {
  const asYouType = new AsYouType();
  asYouType.input(phone);
  const number = asYouType.getNumber();
  return {
    phoneNumber: number?.number,
    countryCode: number?.country,
    countryCallingCode: number?.countryCallingCode,
    carrierCode: number?.carrierCode,
    nationalNumber: number?.nationalNumber,
    internationalNumber: number?.formatInternational(),
    possibleCountries: number?.getPossibleCountries().join(", "),
    isValid: number?.isValid(),
    isPossible: number?.isPossible(),
    uri: number?.getURI(),
    type: number?.getType(),
  };
}

export function PhoneInput({
  value: valueProp,
  id,
  defaultCountry,
  required = true,
  ...rest
}: PhoneInputProps) {
  const asYouType = new AsYouType();

  const inputRef = React.useRef<HTMLInputElement>(null);

  const [value, handlers, history] = useStateHistory(valueProp);

  const initializeDefaultValue = () => {
    if (value) {
      return value;
    }

    return `+${getCountryCallingCode(defaultCountry)}`;
  };

  const handleOnInput = (event: React.FormEvent<HTMLInputElement>) => {
    asYouType.reset();

    let value = event.currentTarget.value;
    if (!value.startsWith("+")) {
      value = `+${value}`;
    }

    const formattedValue = asYouType.input(value);

    event.currentTarget.value = formattedValue;

    handlers.set(formattedValue);
  };

  const handleOnPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    asYouType.reset();

    const clipboardData = event.clipboardData;

    if (clipboardData) {
      const pastedData = clipboardData.getData("text/plain");
      const formattedValue = asYouType.input(pastedData);

      event.currentTarget.value = formattedValue;
      handlers.set(formattedValue);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "z") {
      handlers.back();
      if (
        inputRef.current &&
        history.current > 0 &&
        history.history[history.current - 1] !== undefined
      ) {
        event.preventDefault();
        inputRef.current.value = history.history[history.current - 1] || "";
      }
    }
  };

  return (
    <Input
      ref={inputRef}
      type="text"
      pattern="^(\+)?[0-9\s]*$"
      id={id}
      title="Phone number must be in international format"
      defaultValue={initializeDefaultValue()}
      onInput={handleOnInput}
      onPaste={handleOnPaste}
      onKeyDown={handleKeyDown}
      required={required}
      aria-required={required}
      {...rest}
    />
  );
}
