// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "./assets/vite.svg";
// import heroImg from "./assets/hero.png";
import "./App.css";
import Notes from "./pages/Notes";
import { Toaster } from "sonner";

function App() {
  return (
    <>
      <Notes />
      <Toaster richColors position="top-center" />
    </>
  );
}

export default App;
