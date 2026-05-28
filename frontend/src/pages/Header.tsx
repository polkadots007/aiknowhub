import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Logo } from "../components/Reusable/Icons";
import { useNotesStore } from "../store/useNotesStore";
import type { NotesState, ThemeState } from "../types";
import { useEffect, useState } from "react";
import { ConfirmationModal } from "../components/Reusable/Modal";
import SearchBar from "./Search";
import { Spinner } from "../components/Reusable/Spinner";
import { Toggle } from "../components/Reusable/Toggle";
import { useAI } from "../hooks/useAI";
import { useThemeStore } from "../store/useThemeStore";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const addNote = useNotesStore((state: NotesState) => state.addNote);
  const deleteNote = useNotesStore((state: NotesState) => state.deleteNote);
  const activeNote = useNotesStore((state: NotesState) => state.activeNote);
  const isDarkTheme = useThemeStore((state: ThemeState) => state.isDarkTheme);
  const setTheme = useThemeStore((state: ThemeState) => state.setTheme);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { isLoading } = useAI();
  const isAuthenticated = false;
  const isLoggingIn = true;
  const [isDarkMode, setDarkMode] = useState<boolean>(isDarkTheme ?? false);
  const navigate = useNavigate();

  function redirectToSignUp() {
    navigate("/signUp");
  }
  function redirectToLogIn() {
    navigate("/login");
  }

  function onConfirm() {
    if (activeNote) deleteNote(activeNote?.id);
    setOpenModal(false);
  }
  function onCancel() {
    setOpenModal(false);
  }
  function handleToggle() {
    setDarkMode((prev: boolean) => {
      if (prev) {
        document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.classList.add("dark");
      }
      setTheme(!prev);
      return !prev;
    });
  }

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkTheme);
  }, [isDarkTheme]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.ctrlKey && event.key.toLowerCase() === "n") {
        event.preventDefault();

        addNote();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div>
      <div>
        <div className="bg-white dark:bg-gray-950 border-b border-slate-800 text-white p-4">
          <div className="flex justify-between">
            {/* Left */}
            <Logo />
            {/* Middle */}
            {isAuthenticated && <SearchBar />}
            {/* Right */}
            <div className="flex items-center gap-4">
              {!isAuthenticated && !isLoggingIn && (
                <div className="flex gap-4">
                  <button
                    className="group flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-medium text-white cursor-pointer
            bg-gradient-to-r from-violet-500 to-blue-500
            hover:from-violet-600 hover:to-blue-600
            transition-all duration-300
            shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40"
                    onClick={() => redirectToSignUp()}
                  >
                    Sign Up
                  </button>
                  <button
                    className="group border border-blue-600 px-6 py-2 rounded-xl  text-sm cursor-pointer hover:bg-gradient-to-r hover:from-violet-500 hover:to-blue-500 dark:text-white border border-white/10 bg-white/5 backdrop-blur-lg
             hover:bg-white/10 hover:text-white"
                    onClick={() => redirectToLogIn()}
                  >
                    Log In
                  </button>
                </div>
              )}
              {isAuthenticated && (
                <button
                  className="group flex gap-1 items-center bg-blue-600 px-3 py-1 rounded text-sm cursor-pointer hover:bg-blue-800"
                  onClick={addNote}
                >
                  <PlusIcon className="w-6 h-6 text-white dark:text-blue-500 group-hover:stroke-white" />
                  New Note
                </button>
              )}
              {activeNote && isAuthenticated && (
                <button
                  className="group flex gap-1 items-center bg-blue-600 px-3 py-1 rounded text-sm cursor-pointer hover:bg-blue-800"
                  onClick={() => setOpenModal(true)}
                >
                  <TrashIcon className="w-6 h-6 text-white dark:text-blue-500 group-hover:stroke-white" />
                  Delete
                </button>
              )}
              <Toggle toggled={isDarkMode} setToggle={handleToggle} />
            </div>
          </div>
        </div>
      </div>
      {openModal && (
        <ConfirmationModal
          open={openModal}
          onConfirm={onConfirm}
          onCancel={onCancel}
          title={activeNote?.title || "Note"}
        />
      )}
      {isLoading && <Spinner />}
    </div>
  );
};

export default Header;
