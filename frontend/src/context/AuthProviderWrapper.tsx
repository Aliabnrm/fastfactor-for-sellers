import api from "@/services/useApiClient";
import { AuthContext } from "@/hooks/useAuth";
import type { User } from "@/schema/auth.schema";
import { tokenStore } from "@/lib/auth/tokenStore";
import { useEffect, useState, type ReactNode } from "react";
import { getMeApi, logoutApi, refreshApi } from "@/services/auth/auth.api";
import { useRefreshToken } from "@/services/auth/auth.hooks";

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

  const refreshMutation = useRefreshToken();

  // useEffect(() => {
  //   const bootstrap = async () => {
  //     try {
  //       const { accessToken } = await refreshMutation.mutateAsync()

  //       tokenStore.set(accessToken)

  //       const currentUser = await getMeApi(api)

  //       setUser(currentUser)
  //     } catch {
  //       tokenStore.clear()
  //       setUser(null)
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   bootstrap()
  // }, [])
  useEffect(() => {
    const bootstrap = async () => {
      console.log("BOOTSTRAP START")

      try {
        // const { accessToken } = await refreshMutation.mutateAsync()
        const { accessToken } = await refreshApi(api)

        console.log("REFRESH SUCCESS", accessToken)

        tokenStore.set(accessToken)

        const currentUser = await getMeApi(api)

        console.log("GET ME SUCCESS", currentUser)

        setUser(currentUser)
      } catch (e) {
        console.log("BOOTSTRAP ERROR", e)

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