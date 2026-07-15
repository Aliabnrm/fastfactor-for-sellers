import api from "@/services/useApiClient";
import { AuthContext } from "@/hooks/useAuth";
import type { User } from "@/schema/auth.schema";
import { tokenStore } from "@/lib/auth/tokenStore";
import { useEffect, useState, type ReactNode } from "react";
import { getMeApi, logoutApi, refreshApi } from "@/services/auth/auth.api";

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

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const { accessToken } = await refreshApi(api)

        tokenStore.set(accessToken)

        const currentUser = await getMeApi(api)

        setUser(currentUser)
      } catch (e) {
        // console.log("BOOTSTRAP ERROR", e)

        tokenStore.clear()
        setUser(null)
      } finally {
        console.log("BOOTSTRAP END")

        setLoading(false)
      }
    }

    bootstrap()
  }, [])

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