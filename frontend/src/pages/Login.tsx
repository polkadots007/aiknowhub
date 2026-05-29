import { useNavigate } from "react-router-dom";
import { LogoSymbol } from "../components/Reusable/Icons";
import Header from "./Header";
import { useState } from "react";
import type { UserLoginType } from "../types";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

const Login = () => {
  const [user, setUser] = useState<UserLoginType>({
    email: "",
    password: "",
  });
  const [submitted, setSubmitted] = useState<boolean>(false);
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const isValidEmail = emailRegex.test(user.email);
  const isValidPassword = passwordRegex.test(user.password);

  function redirectToSignUp() {
    navigate("/signUp");
  }
  async function handleLogin() {
    setSubmitted(true);
    if (!isValidEmail) {
      console.error("Invalid email");
      return;
    }
    if (!isValidPassword) {
      console.error(
        "Password must contain uppercase, lowercase, number and special character",
      );
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: user.password,
      });

      console.log("Logged in:", data);
      toast.success("Logged In", {
        duration: 2000,
      });

      if (error) {
        throw error;
      }

      navigate("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message, {
          duration: 2000,
        });
      } else {
        console.error(error);
        toast.error("An error occurred", {
          duration: 2000,
        });
      }
    }
  }
  function handleInput(type: keyof UserLoginType, value: string) {
    setUser((prev) => {
      return {
        ...prev,
        [type]: value,
      };
    });
  }
  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleInput("email", e.target.value);
  }
  function handlePwdChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleInput("password", e.target.value);
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
              Welcome back to your AI workspace
            </div>
          </div>
          <div className="text-xs text-gray-500 text-center mt-2 mb-2 tracking-wide">
            Continue learning smarter with AIKnowHub
          </div>
          <div className="flex flex-col gap-4 px-10 py-6">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <div className="w-full gap-4 items-center">
                <div className="w-20 text-blue-600 dark:text-white pb-2">
                  Email{" "}
                </div>
                {!isValidEmail && submitted && user.email.length > 0 && (
                  <p className="text-red-500 text-sm mt-1">
                    Please enter a valid email
                  </p>
                )}
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
                    ${!isValidEmail && submitted && user.email.length > 0 ? "border-red-500" : "border-gray-400 dark:border-white/10"}
                    `}
                  type="email"
                  required={true}
                  onChange={handleEmailChange}
                ></input>
              </div>
              <div className="w-full">
                <div className="w-20 text-blue-600 dark:text-white pb-2">
                  Password{" "}
                </div>
                {!isValidPassword && submitted && user.password.length > 0 && (
                  <p className="text-red-500 text-sm mt-1">
                    Password must be at least 8 characters and include
                    uppercase, lowercase, number, and special character.{" "}
                  </p>
                )}
                <input
                  className="
                    h-12
                    w-full
                    bg-white/5
                    border border-gray-400 dark:border-white/10
                    rounded-xl
                    px-4 py-3
                    text-blue-600 dark:text-white
                    placeholder:text-gray-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-violet-500
                    focus:bg-white/10
                    transition-all duration-300
                    "
                  type="password"
                  required={true}
                  onChange={handlePwdChange}
                ></input>
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
                "
                >
                  Log In
                </button>
              </div>
            </form>
            <div className="w-full flex justify-center">
              <span className="text-gray-400">Forgot Password?</span>
              <button
                type="submit"
                className="text-blue-600 hover:text-blue-800 pl-2 cursor-pointer"
                onClick={() => console.log("recover")}
              >
                {" "}
                Recover account
              </button>
            </div>
            <div className="flex items-center gap-4 py-4">
              <div className="h-px bg-white/10 flex-1" />
              <span className="text-xs text-gray-500">OR CONTINUE WITH</span>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="w-full flex justify-center">
              <span className="text-gray-400">Not registered?</span>
              <button
                className="text-blue-600 hover:text-blue-800 pl-2 cursor-pointer"
                onClick={() => redirectToSignUp()}
              >
                {" "}
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
