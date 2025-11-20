import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";

export type CardInfo = {
  ownerName: string;
  cardNumber: string;
};

export type User = {
  id: string;
  mobile: string;
  name?: string;
  slug?: string;
  cardInfo?: CardInfo;
  shippingCost?: number;
  isOnboarded: boolean;
};

type LoginPayload = {
  mobile: string;
  password: string;
};

type SignupPayload = {
  mobile: string;
  password: string;
};

type AuthContextValue = {
  user: User | null;
  isReady: boolean;
  login: (payload: LoginPayload) => User;
  signup: (payload: SignupPayload) => User;
  logout: () => void;
  updateUser: (updates: Partial<User>) => User | null;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "fastfactor:user";

const canUseStorage = () => typeof window !== "undefined" && !!window.localStorage;

const readStoredUser = (): User | null => {
  if (!canUseStorage()) {
    return null;
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return null;
  }

  try {
    return JSON.parse(stored) as User;
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
};

const persistUser = (next: User | null) => {
  if (!canUseStorage()) {
    return;
  }

  if (!next) {
    localStorage.removeItem(STORAGE_KEY);
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
};

const generateId = () => {
  if (
    typeof globalThis !== "undefined" &&
    globalThis.crypto &&
    typeof globalThis.crypto.randomUUID === "function"
  ) {
    return globalThis.crypto.randomUUID();
  }

  return `user-${Date.now()}`;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => readStoredUser());
  const [isReady, setIsReady] = useState(() => canUseStorage());

  useEffect(() => {
    if (!canUseStorage()) {
      setIsReady(true);
      return;
    }

    setUser(readStoredUser());
    setIsReady(true);
  }, []);

  const login = (payload: LoginPayload): User => {
    const existing = readStoredUser();

    const nextUser: User =
      existing && existing.mobile === payload.mobile
        ? existing
        : {
            id: generateId(),
            mobile: payload.mobile,
            isOnboarded: false,
          };

    setUser(nextUser);
    persistUser(nextUser);
    return nextUser;
  };

  const signup = (payload: SignupPayload): User => {
    const newUser: User = {
      id: generateId(),
      mobile: payload.mobile,
      isOnboarded: false,
    };

    setUser(newUser);
    persistUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
    persistUser(null);
  };

  const updateUser = (updates: Partial<User>): User | null => {
    let updatedUser: User | null = null;

    setUser((prev) => {
      if (!prev) {
        return prev;
      }

      const next: User = {
        ...prev,
        ...updates,
        cardInfo: updates.cardInfo
          ? {
              ...prev.cardInfo,
              ...updates.cardInfo,
            }
          : prev.cardInfo,
      };

      persistUser(next);
      updatedUser = next;
      return next;
    });

    return updatedUser;
  };

  const value = useMemo(
    () => ({
      user,
      isReady,
      login,
      signup,
      logout,
      updateUser,
    }),
    [isReady, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const  useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

