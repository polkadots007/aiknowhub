import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

const AuthListener = () => {
  const { login, logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session) {
        login(session.user, session);
        toast.success("Email Verified! Logging you in...", {
          duration: 2000,
        });
        navigate("/dashboard");
      }

      if (event === "SIGNED_OUT") {
        logout();
        toast.success("Signing you out", {
          duration: 2000,
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return null;
};

export default AuthListener;