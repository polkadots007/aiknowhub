import { BugAntIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

export const Logo = () => {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center gap-3 text-blue-500 cursor-pointer"
      onClick={() => navigate("/")}
    >
      <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shadow-violet-500/20">
        <BugAntIcon className="w-6 h-6 text-white" />
      </div>
      <span className="text-lg bg-gradient-to-r from-violet-400 to-blue-500 bg-clip-text text-transparent">
        AIKnowHub
      </span>
    </div>
  );
};

export const LogoSymbol = () => {
  return (
    <div className="flex items-center gap-3 text-blue-500">
      <div className="p-2 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 shadow-lg shadow-violet-500/20">
        <BugAntIcon className="w-6 h-6 text-white" />
      </div>
    </div>
  );
};
