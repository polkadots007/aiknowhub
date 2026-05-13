import { useState } from "react";
import { Tooltip } from "./Tooltip";

type ToggleProps = {
  toggled: boolean;
  setToggle: () => void;
};
const Toggle = ({ toggled, setToggle }: ToggleProps) => {
  const [isOpen, setOpen] = useState<boolean>(toggled);
  function onToggle() {
    setOpen((prev) => !prev);
    setToggle();
  }

  return (
    <Tooltip>
      <button
        aria-label="Toggle dark mode"
        className={`${isOpen ? "bg-blue-600" : "bg-gray-600"}  w-14 h-7 rounded-full transition-all duration-300 cursor-pointer shadow-md flex items-center hover:scale-105`}
        onClick={() => onToggle()}
      >
        <div
          className={` w-5 h-5 rounded-full bg-white ${!isOpen ? "translate-x-0" : "translate-x-8"} transition-all duration-300 flex items-center justify-center`}
        ></div>
      </button>
    </Tooltip>
  );
};

export { Toggle };
