import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { session } = useAuthStore();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
