import { z } from 'zod'
import { sanitizeString } from '@/lib/sanitization'

export interface User {
  id: string
  email: string
  first_name?: string | null
  last_name?: string | null
}

export interface SignupDTO {
  email: string
  password: string
  first_name?: string | null
  last_name?: string | null
}

export interface SigninDTO {
  email: string
  password: string
}

export interface RefreshDTO {
  refreshToken: string
}

export interface AuthResponse {
  user: User
  accessToken: string
  refreshToken?: string
}

export interface RefreshResponse {
  accessToken: string
}

const sanitizedStringSchema: z.ZodType<string> = z
  .string()
  .transform(sanitizeString)
const emailSchema = sanitizedStringSchema.pipe(z.string().email().max(255))
const tokenSchema = sanitizedStringSchema.pipe(z.string().min(1).max(4096))
const nullableNameSchema: z.ZodType<string | null | undefined> = z.preprocess(value => {
  if (value === '') {
    return undefined
  }

  return value
}, sanitizedStringSchema.optional().nullable())

// ========================
// USER
// ========================
export const UserSchema = z.object({
  id: z.string(),
  email: emailSchema,
  first_name: nullableNameSchema,
  last_name: nullableNameSchema,
}) as unknown as z.ZodType<User>

// ========================
// SIGN UP
// ========================
export const SignupSchema = z.object({
  email: emailSchema,
  password: z.string().min(8).max(72),
  first_name: nullableNameSchema,
  last_name: nullableNameSchema,
}) as unknown as z.ZodType<SignupDTO>

// ========================
// SIGN IN
// ========================
export const SigninSchema = z.object({
  email: emailSchema,
  password: z.string().max(1024),
}) as unknown as z.ZodType<SigninDTO>

// ========================
// REFRESH
// ========================
export const RefreshSchema = z.object({
  refreshToken: tokenSchema,
}) as unknown as z.ZodType<RefreshDTO>

// ========================
// RESPONSE
// ========================
export const AuthResponseSchema = z.object({
  user: UserSchema,
  accessToken: tokenSchema,
  refreshToken: tokenSchema.optional(),
}) as unknown as z.ZodType<AuthResponse>

export const RefreshResponseSchema = z.object({
  accessToken: tokenSchema,
  // refreshToken: z.string(),
}) as unknown as z.ZodType<RefreshResponse>
