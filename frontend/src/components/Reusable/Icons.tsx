import { BugAntIcon } from "@heroicons/react/24/outline";

export const Logo = () => {
  return (
    <div className="flex items-center gap-3 text-blue-500">
      <div className="bg-blue-600/20 p-2 rounded-lg">
        <BugAntIcon className="w-6 h-6 text-blue-500" />
      </div>
      <span className="font-semibold text-lg">AIKnow</span>
    </div>
  );
};
