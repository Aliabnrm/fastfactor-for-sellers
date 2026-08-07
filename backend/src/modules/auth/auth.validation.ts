import { z } from "zod";
import { sanitizedStringSchema } from "../../utils/sanitization.js";

const emailSchema = sanitizedStringSchema
  .pipe(z.string().email().max(255));

const passwordSchema = z.string().min(8).max(72);

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().max(1024),
});

export const refreshTokenSchema = sanitizedStringSchema
  .pipe(
    z.string()
      .min(1)
      .max(4096)
      .regex(/^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/),
  );

export const bearerTokenSchema = sanitizedStringSchema
  .pipe(
    z.string()
      .min(1)
      .max(4096)
      .regex(/^Bearer\s+[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/i),
  );

export const userIdSchema = z.string().uuid();
