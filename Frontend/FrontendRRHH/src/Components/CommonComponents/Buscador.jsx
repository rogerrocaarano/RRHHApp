
export function Buscador() {
  return (
    <div className="flex flex-col items-center mt-4">
      <input
        type="text"
        placeholder="Search..."
        className="w-64 p-2 mb-4 border border-gray-300 rounded"
      />
      <div className="w-64 border border-gray-300 rounded max-h-40 overflow-y-auto">
        {(item, index) => (
          <div
            key={index}
            className="p-2 border-b last:border-b-0 border-gray-200"
          >
            {item}
          </div>
        )}
      </div>
    </div>
  );
}