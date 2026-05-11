export const Spinner = () => {
  console.log("where");
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="animate-spin rounded-full border-4 border-blue-500 border-t-transparent w-10 h-10"></div>
    </div>
  );
};
