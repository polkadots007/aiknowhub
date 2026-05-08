import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { useNotesStore } from "../store/useNotesStore";
import Dropdown from "./Reusable/Dropdown";
import type { SearchTypeProp } from "../types";

const SearchBar = () => {
  const [searchWord, setSearchWords] = useState<string>("");
  const setSearchTerm = useNotesStore((state) => state.setSearchTerm);
  const setSearchType = useNotesStore((state) => state.setSearchType);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchWords(event.target.value);
  }
  function onSelect(value: SearchTypeProp) {
    setSearchType(value);
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(searchWord);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchWord]);

  return (
    <div className="flex gap-2 w-1/3 items-center">
      <MagnifyingGlassIcon className="w-6 h-6 text-blue-500" />
      <input
        className="w-full h-6 text-blue-500 focus:outline-none"
        placeholder="Search notes..."
        onChange={handleChange}
      />
      <Dropdown
        values={[
          { key: "Title", val: "title" },
          { key: "Content", val: "content" },
        ]}
        onSelect={onSelect}
      />
    </div>
  );
};

export default SearchBar;
