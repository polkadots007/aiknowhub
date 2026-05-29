import { useState } from "react";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { LogoSymbol } from "../components/Reusable/Icons";
import { Spinner } from "../components/Reusable/Spinner";
import Header from "./Header";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const navigate = useNavigate();
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const isValidPassword = passwordRegex.test(password);
  const isValidConfirmPwd = passwordRegex.test(confirmPassword);
  const passwordsMatch = password === confirmPassword;

  function redirectToLogIn() {
    navigate("/login");
  }
  function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }
  function handleconfirmPassword(e: React.ChangeEvent<HTMLInputElement>) {
    setConfirmPassword(e.target.value);
  }

  async function updatePassword() {
    setSubmitted(true);
    if (!isValidPassword) {
      console.error(
        "Password must contain uppercase, lowercase, number and special character",
      );
      return;
    }
    if (!passwordsMatch) {
      console.error("Password do not match");
      return;
    }
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password,
      });

      if (error) {
        throw error;
      }

      toast.success("Password updated!", {
        duration: 2000,
      });
      await supabase.auth.signOut();
      navigate("/");
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        toast.error(error.message, {
          duration: 2000,
        });
        return;
      } else {
        console.error(error);
        toast.error("Error occurred while updating password", {
          duration: 2000,
        });
        return;
      }
    } finally {
      setIsLoading(false);
      setSubmitted(false);
    }
  }

  return (
    <div className="flex flex-col">
      <Header />
      <div className="dark:bg-[#0b1020] dark:text-blue-600 dark:text-white flex justify-center items-start pt-24 min-h-[93.6dvh] relative overflow-hidden">
        <style>{`
            @keyframes float {
            0%, 100% {
                transform: translateY(0px);
            }
            50% {
                transform: translateY(-4px);
            }
            }
            .float {
            animation: float 6s ease-in-out infinite;
            }
            `}</style>
        <div className="absolute top-20 left-20 w-72 h-72 bg-violet-500/20 blur-[120px] rounded-full animate-pulse pointer-events-none" />

        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full animate-pulse pointer-events-none" />
        <div
          className="
                relative
                float
                max-w-md
                w-full
                bg-white/[0.04]
                backdrop-blur-2xl
                border border-gray-400 dark:border-white/10
                shadow-2xl
                rounded-3xl
                transition-all duration-500
                    "
        >
          <div className="px-6 py-3 flex gap-2 items-center justify-center text-blue-600 dark:text-white border-b border-gray-400 dark:border-white/5">
            <div className="w-1/8">
              <LogoSymbol />
            </div>
            <div className="flex-1 text-center text-xl font-semibold">
              Reset Password
            </div>
          </div>
          {isLoading && <Spinner />}
          <div className="flex flex-col gap-4 px-10 py-6">
            <div className="w-full gap-4 items-center">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  updatePassword();
                }}
              >
                <div className="w-full gap-4 items-center">
                  <div className="w-full text-blue-600 dark:text-white pb-2">
                    New Password{" "}
                  </div>
                  {!isValidPassword && submitted && password.length > 0 && (
                    <p className="text-red-500 text-sm mt-1">
                      Please enter a valid password
                    </p>
                  )}
                  <div className="relative">
                    <input
                      className={`
                h-12
                    w-full
                    bg-white/5
                    border 
                    rounded-xl
                    px-4 py-3
                    text-blue-600 dark:text-white
                    placeholder:text-gray-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-violet-500
                    focus:bg-white/10
                    transition-all duration-300
                    ${!isValidPassword && submitted && password.length > 0 ? "border-red-500" : "border-gray-400 dark:border-white/10"}
                    `}
                      type="password"
                      required={true}
                      onChange={handlePassword}
                    ></input>
                    {password.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                        hover:text-white
                        transition-colors
                      "
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="w-5 h-5" />
                        ) : (
                          <EyeIcon className="w-5 h-5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
                <div className="w-full gap-4 items-center">
                  <div className="w-full text-blue-600 dark:text-white pb-2 pt-2">
                    Confirm Password{" "}
                  </div>
                  {!isValidConfirmPwd &&
                  submitted &&
                  confirmPassword.length > 0 ? (
                    <p className="text-red-500 text-sm mt-1">
                      Please enter a valid password
                    </p>
                  ) : (
                    !passwordsMatch &&
                    submitted &&
                    confirmPassword.length > 0 && (
                      <p className="text-red-500 text-sm mt-1">
                        Passwords do not match
                      </p>
                    )
                  )}
                  <div className="relative">
                    <input
                      className={`
                h-12
                    w-full
                    bg-white/5
                    border 
                    rounded-xl
                    px-4 py-3
                    text-blue-600 dark:text-white
                    placeholder:text-gray-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-violet-500
                    focus:bg-white/10
                    transition-all duration-300
                    ${
                      confirmPassword.length > 0 &&
                      submitted &&
                      (!isValidConfirmPwd || !passwordsMatch)
                        ? "border-red-500"
                        : "border-gray-400 dark:border-white/10"
                    }
                    `}
                      type="password"
                      required={true}
                      onChange={handleconfirmPassword}
                    ></input>
                    {confirmPassword.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className="
                        absolute
                        right-3
                        top-1/2
                        -translate-y-1/2
                        text-gray-400
                        hover:text-white
                        transition-colors
                      "
                      >
                        {showConfirmPassword ? (
                          <EyeSlashIcon className="w-5 h-5" />
                        ) : (
                          <EyeIcon className="w-5 h-5" />
                        )}
                      </button>
                    )}
                  </div>
                </div>
                <div className="w-full flex justify-center mt-6">
                  <button
                    className="
                w-full py-3 rounded-xl text-sm cursor-pointer
                bg-gradient-to-r from-violet-500 to-blue-500
                hover:from-violet-600 hover:to-blue-600
                text-blue-600 dark:text-white
                transition-all duration-300
                hover:scale-[1.02]
                shadow-lg shadow-violet-500/20
                hover:shadow-violet-500/40
                disabled:opacity-50
                disabled:cursor-not-allowed
                "
                    disabled={isLoading}
                  >
                    Reset Password
                  </button>
                </div>
              </form>
              <div className="flex items-center gap-4 py-4">
                <div className="h-px bg-white/10 flex-1" />
                <span className="text-xs text-gray-500">OR CONTINUE WITH</span>
                <div className="h-px bg-white/10 flex-1" />
              </div>

              <div className="w-full flex justify-center">
                <span className="text-gray-400">Already registered?</span>
                <button
                  className="text-blue-600 hover:text-blue-800 pl-2 cursor-pointer"
                  onClick={() => redirectToLogIn()}
                >
                  {" "}
                  Log In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
