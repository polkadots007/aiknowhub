import Header from "./Header";
import geminiLogo from "../../src/assets/gemini.svg";
import {
  ArrowRightIcon,
  CpuChipIcon,
  MagnifyingGlassIcon,
  TagIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  function redirectToSignUp() {
    navigate("/signUp");
  }
  function redirectToLogIn() {
    navigate("/login");
  }
  return (
    <div className="flex flex-col">
      <Header />
      <div className="dark:bg-[#0b1020] flex min-h-[calc(100vh-100px)] pt-16">
        <section className="relative overflow-hidden p-16 w-1/2 pl-24">
          <div className="flex gap-2 justify-center items-center text-gray-800 dark:text-white px-4 py-2 border border-gray-600 rounded-xl w-fit">
            <img src={geminiLogo} alt="Gemini Logo" width="30" height="30" />
            Turn Notes Into Knowledge.
          </div>

          <div className="absolute top-40 left-40 w-72 h-72 bg-violet-500/20 blur-[120px] rounded-full tracking-tight leading-[1.05]" />
          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-black dark:!text-white">
            Smart Notes.
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(99,102,241,0.35)]">
              Powered by AI.
            </span>
          </h1>
          <p className="mt-6 text-gray-800 dark:text-gray-400 text-lg max-w-xl leading-relaxed">
            Capture ideas, organize notes, and generate instant AI summaries.
            Learn faster and stay productive with your AI-powered second brain.
          </p>
          <div className="flex gap-4 mt-6">
            <button
              className="group flex items-center gap-2 px-6 py-2 rounded-xl text-sm font-medium text-white cursor-pointer
            bg-gradient-to-r from-violet-500 to-blue-500
            hover:from-violet-600 hover:to-blue-600
            transition-all duration-300
            shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40"
              onClick={() => redirectToSignUp()}
            >
              Sign Up
              <ArrowRightIcon className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              className="group border border-blue-600 px-6 py-2 rounded-xl  text-sm cursor-pointer hover:bg-gradient-to-r hover:from-violet-500 hover:to-blue-500 dark:text-white border dark:border-white/10 bg-white/5 backdrop-blur-lg
             hover:bg-white/10 hover:text-white"
              onClick={() => redirectToLogIn()}
            >
              Log In
            </button>
          </div>
          <div className="flex gap-10 px-4 py-3 mt-10 overflow-hidden text-white w-full">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="p-3 rounded-lg border border-violet-400">
                <img
                  src={geminiLogo}
                  alt="Gemini Logo"
                  width="20"
                  height="20"
                />
              </div>
              <span className="text-transparent bg-gradient-to-r from-violet-400 to-blue-500 bg-clip-text">
                AI Summary
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="p-3 rounded-lg bg-gradient-to-r from-violet-500 to-blue-500">
                <MagnifyingGlassIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-transparent bg-gradient-to-r from-violet-400 to-blue-500 bg-clip-text">
                Smart Search
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="p-3 rounded-lg bg-gradient-to-r from-violet-500 to-blue-500">
                <TagIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-transparent bg-gradient-to-r from-violet-400 to-blue-500 bg-clip-text">
                Auto Tags
              </span>
            </div>
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="p-3 rounded-lg bg-gradient-to-r from-violet-500 to-blue-500">
                <CpuChipIcon className="w-4 h-4 text-white" />
              </div>
              <span className="text-transparent bg-gradient-to-r from-violet-400 to-blue-500 bg-clip-text">
                Semantic Notes
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 mt-10">
            <div className="w-fit px-6 py-2 border dark:border-white/[0.6] rounded-xl dark:text-white">
              Used by students, developers, and researchers
            </div>
            <div className="w-fit px-6 py-2 border dark:border-white/[0.6] rounded-xl dark:text-white">
              10K+ AI Summaries
            </div>
            <div className="w-fit px-6 py-2 border dark:border-white/[0.6] rounded-xl dark:text-white">
              No Payment needed
            </div>
          </div>
        </section>
        <div className="w-1/2 pr-24 pt-16">
          <div
            className="bg-white/[0.03] backdrop-blur-xl border border-black/50 dark:border-white/10 rounded-3xl p-6 shadow-[0_0_60px_rgba(139,92,246,0.15)] rotate-[2deg]
hover:rotate-0
transition-transform duration-500"
          >
            <div className="space-y-4">
              <div className="flex gap-6">
                <div className="h-4 w-16 bg-violet-500 rounded-full" />
                <div className="h-4 w-126 bg-violet-500 rounded-full" />
                <div className="h-4 w-16 bg-violet-500 rounded-full" />
                <div className="h-4 w-16 bg-violet-500 rounded-full" />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col justify-start gap-10 h-150">
                  <div className="h-60 bg-blue-500/10 rounded-xl" />
                  <div className="h-60 bg-blue-500/10 rounded-xl" />
                </div>
                <div className="h-[600px] bg-white/5 rounded-2xl p-6 flex flex-col">
                  <style>{`
                        @keyframes blink {
                            0% { opacity: 1; }
                            50% { opacity: 0; }
                            100% { opacity: 1; }
                        }
                        .cursor { animation: blink 1s step-start infinite; }
                    `}</style>

                  <div className="flex flex-col gap-3 h-full">
                    <div className="h-6 bg-black/50  text-white dark:bg-white/10 rounded-md w-full flex items-center px-2">
                      <span className="text-sm text-gray/90">
                        AIKnowhub is very
                      </span>
                    </div>
                    <div className="h-6 bg-black/50  text-white dark:bg-white/10 rounded-md w-5/6 flex items-center px-2">
                      <span className="text-sm text-gray/90">seriously</span>
                    </div>
                    <div className="h-6 bg-black/50  text-white dark:bg-white/10 rounded-md w-3/4 flex items-center px-2">
                      <span className="text-sm text-gray/90">thinking...</span>
                      <span className="cursor ml-2 w-1 h-5 bg-white inline-block" />
                    </div>
                    <div className="h-6 bg-black/50  text-white dark:bg-white/10 rounded-md w-2/3 mt-auto" />
                  </div>
                </div>
                <div className="flex flex-col gap-4 h-150 bg-violet-500/10 rounded-xl">
                  <div className="h-20 w-full mr-auto bg-gradient-to-r from-violet-500/20 to-blue-500/20 rounded-xl animate-pulse" />
                  <div className="h-10 w-full ml-auto bg-gradient-to-r from-violet-500/20 to-blue-500/20 rounded-xl animate-pulse" />
                  <div className="h-40 w-full mr-auto bg-gradient-to-r from-violet-500/20 to-blue-500/20 rounded-xl animate-pulse" />
                  <div className="h-20 w-full ml-auto bg-gradient-to-r from-violet-500/20 to-blue-500/20 rounded-xl animate-pulse" />
                  <div className="h-20 w-full mr-auto bg-gradient-to-r from-violet-500/20 to-blue-500/20 rounded-xl animate-pulse" />
                  <div className="h-10 w-full mt-auto bg-gradient-to-r from-violet-500/20 to-blue-500/20 rounded-xl animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
