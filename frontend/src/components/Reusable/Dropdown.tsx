import { ChevronDownIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import type { SearchTypeProp } from "../../types";

type ItemProp = { key: string; val: SearchTypeProp };
type ItemActionProp = { key: string; val: string };
const Dropdown = ({
  values,
  onSelect,
}: {
  values: Array<ItemProp>;
  onSelect: (value: SearchTypeProp) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>(values[0].key);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  function handleClick(item: ItemProp) {
    onSelect(item.val);
    setSelectedValue(item.key);
    setOpen(false);
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    }
    if (open) {
      document.addEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [open]);
  useEffect(() => {}, [selectedValue]);
  return (
    <div className="relative inline-block" ref={wrapperRef}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex gap-2 justify-center items-center bg-blue-600 text-white px-3 py-1 rounded cursor-pointer"
      >
        {selectedValue}
        <ChevronDownIcon width={16} height={16} className="stroke-2" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-999 right-0 mt-2 w-40 bg-gray-900 border border-slate-700 rounded shadow-lg">
          {values.map((item: ItemProp, index: number) => (
            <button
              key={index}
              className={`block w-full text-left px-4 py-2 hover:bg-blue-600 ${selectedValue === item.key && "bg-blue-800"}`}
              onClick={() => handleClick(item)}
            >
              {item.key}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const AIActionDropdown = ({
  values,
  onSelect,
}: {
  values: Array<ItemActionProp>;
  onSelect: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>();
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  function handleClick(item: ItemActionProp) {
    onSelect(item.key);
    setSelectedValue(item.key);
    setOpen(false);
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    }
    if (open) {
      document.addEventListener("click", handleClick);
    }

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [open]);
  useEffect(() => {}, [selectedValue]);
  return (
    <div className="relative inline-block" ref={wrapperRef}>
      {/* Trigger */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex gap-2 justify-center items-center bg-blue-600 text-white px-3 py-1 rounded cursor-pointer"
      >
        <Cog6ToothIcon className="w-6 h-6 text-white" />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-999 right-0 mt-2 w-40 bg-white dark:bg-gray-900 border border-slate-700 rounded shadow-lg text-blue-600 dark:text-white">
          {values.map((item: ItemActionProp, index: number) => (
            <button
              key={index}
              className={`block w-full text-left px-4 py-2 hover:bg-blue-600 hover:text-white cursor-pointer ${selectedValue === item.key && "bg-blue-600 text-white"}`}
              onClick={() => handleClick(item)}
            >
              {selectedValue === item.key ? "✓ " + item.val : item.val}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export { Dropdown, AIActionDropdown };
