import { useState } from "react";
import { Tooltip } from "./Tooltip";

const Toggle = () => {
  const [isOpen, setOpen] = useState<boolean>(true);

  return (
    <Tooltip>
      <button
        className={`${isOpen ? "bg-blue-600" : "bg-gray-600"}  w-14 h-8 rounded-full transition-all duration-300 cursor-pointer shadow-md flex items-center`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div
          className={` w-6 h-6 rounded-full bg-white ${!isOpen ? "translate-x-0" : "translate-x-6"} transition-all duration-300`}
        >
          {isOpen ? "🌙" : "☀️"}
        </div>
      </button>
    </Tooltip>
  );
};

export { Toggle };
