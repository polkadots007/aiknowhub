type Props = {
  children: React.ReactNode;
};

export const Tooltip = ({ children }: Props) => {
  return (
    <div className="relative group inline-block">
      {children}

      <div
        className="
    absolute
    top-full
    left-1/2
    -translate-x-[70%]
    mt-2
    invisible
    opacity-0
    group-hover:visible
    group-hover:opacity-100
    transition-all
    duration-200
    pointer-events-none
    bg-gray-800
    text-white
    text-xs
    px-2
    py-1
    rounded
    whitespace-nowrap
    z-50
  "
      >
        Toggle Dark Mode
      </div>
    </div>
  );
};
