import {
  AsYouType,
  parsePhoneNumberFromString,
  type CountryCode,
} from "libphonenumber-js";

export const DEFAULT_PHONE_COUNTRY: CountryCode = "UZ";

/** Formats phone as the user types (e.g. +998 90 123 45 67). */
export function formatPhoneAsYouType(
  value: string,
  defaultCountry: CountryCode = DEFAULT_PHONE_COUNTRY,
): string {
  if (!value) return "";

  const trimmed = value.trim();
  const withPlus = trimmed.startsWith("+")
    ? trimmed
    : trimmed.startsWith("998")
      ? `+${trimmed}`
      : trimmed;

  return new AsYouType(defaultCountry).input(withPlus);
}

/** Normalizes to E.164 when valid; otherwise returns trimmed input. */
export function normalizePhone(
  value: string,
  defaultCountry: CountryCode = DEFAULT_PHONE_COUNTRY,
): string {
  const trimmed = value.trim();
  if (!trimmed) return "";

  const parsed = parsePhoneNumberFromString(trimmed, defaultCountry);
  if (parsed?.isValid()) {
    return parsed.format("E.164");
  }
  return trimmed;
}

export function isValidPhone(
  value: string,
  defaultCountry: CountryCode = DEFAULT_PHONE_COUNTRY,
): boolean {
  const trimmed = value.trim();
  if (!trimmed) return true;
  const parsed = parsePhoneNumberFromString(trimmed, defaultCountry);
  return parsed?.isValid() ?? false;
}
