import { useEffect, useState, type ReactNode } from "react";

import api from "@/services/useApiClient";
import { tokenStore } from "@/lib/auth/tokenStore";
import { AuthContext } from "@/hooks/useAuth";
import { getMeApi, logoutApi } from "@/services/auth/auth.api";
import type { User } from "@/schema/auth.schema";

interface Props {
  children: ReactNode;
}

export default function AuthProviderWrapper({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * بعد از Login / Register
   */
  const setAuth = (user: User, accessToken: string) => {
    tokenStore.set(accessToken);
    setUser(user);
  };

  /**
   * دریافت اطلاعات کاربر
   */
  const refreshUser = async () => {
    try {
      const currentUser = await getMeApi(api);
      setUser(currentUser);
    } catch {
      tokenStore.clear();
      setUser(null);
    }
  };

  /**
   * خروج از حساب
   */
  const logout = async () => {
    try {
      await logoutApi(api);
    } finally {
      tokenStore.clear();
      setUser(null);
    }
  };

  /**
   * اولین بار که برنامه بالا می‌آید
   */
  useEffect(() => {
    const bootstrap = async () => {
      try {
        await refreshUser();
      } finally {
        setLoading(false);
      }
    };

    bootstrap();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        setAuth,
        refreshUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}