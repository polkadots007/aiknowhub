export function NoteSkeleton() {
  return (
    <div className="p-4 border rounded-xl animate-pulse space-y-2">
      <div className="h-4 bg-gray-300 rounded w-3/4" />
      <div className="h-3 bg-gray-300 rounded w-1/2" />
      <div className="h-3 bg-gray-300 rounded w-2/3" />
    </div>
  );
}
