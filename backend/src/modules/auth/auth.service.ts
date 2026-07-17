import bcrypt from "bcrypt";
import {
  createUser,
  findUserByEmail,
  findRefreshToken,
  saveRefreshToken,
  revokeRefreshToken,
  findUserById,
} from "./auth.repository.js";
import type { AuthResponse, LoginDTO, RegisterDTO } from "./auth.types.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt.js";
import { AuthenticationError } from "../../errors/AuthenticationError.js";
import { ConflictError } from "../../errors/ConflictError.js";

export const register = async (data: RegisterDTO): Promise<AuthResponse> => {
  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    throw new ConflictError("کاربری با این ایمیل وجود دارد");
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const user = await createUser(data, passwordHash);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await saveRefreshToken(user.id, refreshToken, expiresAt);

  return {
    user: {
      id: user.id,
      email: user.email,
    },
    accessToken,
    refreshToken,
  };
};

export const login = async (data: LoginDTO): Promise<AuthResponse> => {
  const user = await findUserByEmail(data.email);

  if (!user) {
    throw new AuthenticationError("ایمیل یا رمز عبور اشتباه است");
  }

  const isValid = await bcrypt.compare(data.password, user.password_hash);

  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  await saveRefreshToken(user.id, refreshToken, expiresAt);

  return {
    user: {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    },
    accessToken,
    refreshToken,
  };
};

// refresh token
export const refresh = async (refreshToken: string): Promise<AuthResponse> => {
  const storedToken = await findRefreshToken(refreshToken);

  if (!storedToken) {
    throw new AuthenticationError("Refresh Token نامعتبر است");
  }

  if (storedToken.is_revoked) {
    throw new AuthenticationError("Refresh Token باطل شده است");
  }

  if (new Date(storedToken.expires_at) < new Date()) {
    throw new AuthenticationError("نشست کاربر منقضی شده است");
  }

  const user = await findUserById(storedToken.user_id);

  if (!user) {
    throw new AuthenticationError("کاربر یافت نشد");
  }

  await revokeRefreshToken(refreshToken);

  const accessToken = generateAccessToken(user.id);

  const newRefreshToken = generateRefreshToken(user.id);

  const expiresAt = new Date();

  expiresAt.setDate(expiresAt.getDate() + 7);

  await saveRefreshToken(user.id, newRefreshToken, expiresAt);

  return {
    user: {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
    },
    accessToken,
    refreshToken: newRefreshToken,
  };
};

// logout
export const logout = async (refreshToken: string) => {
  await revokeRefreshToken(refreshToken);
};

// getMe
export const getMe = async (userId: string) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new AuthenticationError("کاربر یافت نشد");
  }

  return {
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
  };
};