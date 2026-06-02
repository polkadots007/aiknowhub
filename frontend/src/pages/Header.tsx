import {
  ArrowRightStartOnRectangleIcon,
  PlusIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Logo } from "../components/Reusable/Icons";
import { useNotesStore } from "../store/useNotesStore";
import type { NotesState, SharedUsersProp, ThemeState } from "../types";
import { useEffect, useState } from "react";
import { ConfirmationModal, ShareModal } from "../components/Reusable/Modal";
import SearchBar from "./Search";
import { Spinner } from "../components/Reusable/Spinner";
import { Toggle } from "../components/Reusable/Toggle";
import { useAI } from "../hooks/useAI";
import { useThemeStore } from "../store/useThemeStore";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { supabase } from "../lib/supabase";
import { toast } from "sonner";

const Header = () => {
  const addNote = useNotesStore((state: NotesState) => state.addNote);
  const deleteNote = useNotesStore((state: NotesState) => state.deleteNote);
  const activeNote = useNotesStore((state: NotesState) => state.activeNote);
  const isDarkTheme = useThemeStore((state: ThemeState) => state.isDarkTheme);
  const setTheme = useThemeStore((state: ThemeState) => state.setTheme);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openShareModal, setOpenShareModal] = useState<boolean>(false);
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const [emails, setEmails] = useState<string[]>([]);
  const { isLoading } = useAI();
  const { user, logout } = useAuthStore();
  const isAuthenticated = user !== null;
  const [isDarkMode, setDarkMode] = useState<boolean>(isDarkTheme ?? false);
  const navigate = useNavigate();
  const location = useLocation();
  const [sharedUsers, setSharedUsers] = useState<SharedUsersProp[]>([]);

  async function initiateShare() {
    if (!activeNote) return;

    const users = await fetchSharedUsers(activeNote.id);
    setSharedUsers(users);
    setOpenShareModal(true);
  }

  const isLoginPage = location.pathname === "/login";

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
  function onShare() {
    if (activeNote) shareNotebyEmails(activeNote.id, emails);
  }
  function onShareCancel() {
    setOpenShareModal(false);
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
  async function handleLogOut() {
    setIsPageLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      logout();

      navigate("/");
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
    } finally {
      setIsPageLoading(false);
    }
  }

  function handleAdd() {
    if (!user) return;
    addNote(user.id);
  }
  function getEmails(inputMailIds: string[]) {
    setEmails(inputMailIds);
  }
  async function fetchSharedUsers(noteId: string) {
    const { data, error } = await supabase
      .from("note_users")
      .select(
        `
      user_id,
      role,
      profiles (
        email
      )
    `,
      )
      .eq("note_id", noteId);

    if (error) throw error;

    return data;
  }
  async function shareNotebyEmails(noteId: number, emails: string[]) {
    try {
      const { error } = await supabase.rpc("share_note_by_emails", {
        p_note_id: noteId,
        p_emails: emails,
      });

      if (error) throw error;

      toast.success(`Note shared with ${emails.length} users!`, {
        duration: 2000,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
        toast.error(error.message, { duration: 2000 });
      } else {
        console.error(error);
        toast.error("An error occurred", { duration: 2000 });
      }
    } finally {
      setOpenShareModal(false);
    }
  }

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkTheme);
  }, [isDarkTheme]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.ctrlKey && event.key.toLowerCase() === "n") {
        event.preventDefault();
        if (!user) return;
        addNote(user.id);
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
              {!isAuthenticated && !isLoginPage && (
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
                  className="group flex gap-1 items-center bg-blue-600 px-3 py-1 rounded text-sm cursor-pointer hover:bg-blue-800 transition-colors duration-200 ease-in-out active:scale-[0.98]"
                  onClick={handleAdd}
                >
                  <PlusIcon className="w-6 h-6 text-white dark:text-blue-500 group-hover:stroke-white" />
                  New Note
                </button>
              )}
              {activeNote && isAuthenticated && (
                <>
                  <button
                    className="group flex gap-1 items-center bg-blue-600 px-3 py-1 rounded text-sm cursor-pointer hover:bg-blue-800
                    transition-colors duration-200 ease-in-out active:scale-[0.98]"
                    onClick={() => setOpenModal(true)}
                  >
                    <TrashIcon className="w-6 h-6 text-white dark:text-blue-500 group-hover:stroke-white" />
                    Delete Note
                  </button>
                  <button
                    className="group flex gap-1 items-center bg-blue-600 px-3 py-1 rounded text-sm cursor-pointer hover:bg-blue-800 transition-colors duration-200 ease-in-out active:scale-[0.98]"
                    onClick={() => initiateShare()}
                  >
                    <ShareIcon className="w-6 h-6 text-white dark:text-blue-500 group-hover:stroke-white" />
                    Share note
                  </button>
                </>
              )}
              <Toggle toggled={isDarkMode} setToggle={handleToggle} />
              {isAuthenticated && (
                <button
                  className="group flex gap-1 items-center bg-blue-600 px-3 py-1 rounded text-sm cursor-pointer hover:bg-blue-800
                  transition-colors duration-200 ease-in-out active:scale-[0.98]"
                  onClick={handleLogOut}
                >
                  <ArrowRightStartOnRectangleIcon className="w-6 h-6 text-white dark:text-blue-500 group-hover:stroke-white" />
                  Log Out
                </button>
              )}
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
      {openShareModal && (
        <ShareModal
          open={openShareModal}
          onConfirm={onShare}
          onCancel={onShareCancel}
          title={activeNote?.title || "Note"}
          getEmails={getEmails}
          sharedUsers={sharedUsers}
        />
      )}
      {(isLoading || isPageLoading) && <Spinner />}
    </div>
  );
};

export default Header;
