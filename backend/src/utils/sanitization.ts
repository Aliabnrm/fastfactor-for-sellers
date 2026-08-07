import { z } from "zod";

const SAFE_URL_PROTOCOLS = new Set(["http:", "https:"]);

const isUnsafeControlChar = (value: string) => {
  const code = value.charCodeAt(0);

  return code <= 8 || code === 11 || code === 12 || (code >= 14 && code <= 31) || code === 127;
};

export const sanitizeString = (value: string) => {
  return Array.from(value.normalize("NFC"))
    .filter((char) => !isUnsafeControlChar(char))
    .join("")
    .trim();
};

export const sanitizedStringSchema = z.string().transform(sanitizeString);

export const safeUrlSchema = sanitizedStringSchema
  .pipe(z.string().url().max(2048))
  .refine(
    (value) => {
      try {
        return SAFE_URL_PROTOCOLS.has(new URL(value).protocol);
      } catch {
        return false;
      }
    },
    {
      message: "URL protocol is not allowed",
    },
  );

export const optionalSafeUrlSchema = z.preprocess((value) => {
  if (value === "" || value === null) {
    return undefined;
  }

  return value;
}, safeUrlSchema.optional());
