import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;

    if (hash.includes("error_code=otp_expired")) {
      toast.error("Verification link expired");

      navigate("/verify");

      return;
    }

    navigate("/dashboard");
  }, []);

  return null;
};

export default AuthCallback;
