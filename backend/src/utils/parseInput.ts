import { z } from "zod";
import { ValidationError } from "../errors/ValidationError.js";

export const parseInput = <T>(schema: z.ZodType<T>, value: unknown): T => {
  const result = schema.safeParse(value);

  if (!result.success) {
    throw new ValidationError(
      result.error.issues[0]?.message ?? "اطلاعات وارد شده معتبر نیست",
    );
  }

  return result.data;
};
