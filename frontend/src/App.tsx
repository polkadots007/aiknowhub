import "./App.css";
import Notes from "./pages/Notes";
import { toast, Toaster } from "sonner";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import {
  Home,
  Login,
  Recover,
  ResetPassword,
  SignUp,
  VerifyEmail,
} from "./pages";
import { AuthCallback, AuthListener, ProtectedRoute } from "./helper";
import { useEffect } from "react";
import { supabase } from "./lib/supabase";

export default function App() {
  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data }) => {
  //     if (!data.session) {
  //       toast.error("Invalid or expired reset link");

  //       navigate("/login");
  //     }
  //   });
  // }, []);
  return (
    <div className="dark:bg-[#16171d]">
      <BrowserRouter>
        <AuthListener />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/recover" element={<Recover />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<Home />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster richColors position="top-center" />
    </div>
  );
}
