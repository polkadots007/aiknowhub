import { useState } from "react";
import { Tooltip } from "./Tooltip";

const Toggle = () => {
  const [isOpen, setOpen] = useState<boolean>(true);

  return (
    <Tooltip>
      <button
        aria-label="Toggle dark mode"
        className={`${isOpen ? "bg-blue-600" : "bg-gray-600"}  w-14 h-7 rounded-full transition-all duration-300 cursor-pointer shadow-md flex items-center hover:scale-105`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <div
          className={` w-5 h-5 rounded-full bg-white ${!isOpen ? "translate-x-0" : "translate-x-8"} transition-all duration-300 flex items-center justify-center`}
        ></div>
      </button>
    </Tooltip>
  );
};

export { Toggle };
