import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthProviderWrapper";

interface Props {
  children: ReactNode;
}

export default function PublicAuthRoute({ children }: Props) {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (user) return <Navigate to="/" replace />;

  return children;
}
