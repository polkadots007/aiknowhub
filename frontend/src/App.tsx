import "./App.css";
import Notes from "./pages/Notes";
import { Toaster } from "sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, SignUp, VerifyEmail } from "./pages";
import { AuthCallback, AuthListener, ProtectedRoute } from "./helper";

export default function App() {
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
