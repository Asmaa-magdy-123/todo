interface FilterButtonsProps {
  isActive: string;
  setIsActive: (status: string) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  selectedPriority: string;
  setSelectedPriority: (priority: string) => void;
  theme:string;
}

export default function FilterButtons({
  isActive,
  setIsActive,
  setSelectedDate,
  selectedPriority,
  setSelectedPriority,
  theme,
}: FilterButtonsProps) {
  const statusButtons = ["All", "Completed", "Not Completed"];

  return (
    <div className="filters flex flex-col items-start mt-2 gap-4 mb-4">
      {/* ✅ فلتر التاريخ */}
      <div className="flex  gap-3">
        <div className="flex items-center gap-2">
          <label htmlFor="date" className="text-sm font-medium">
            Filter by Date:
          </label>
          <input
            type="date"
            id="date"
            className={` ${theme==='light'?'bg-white':'bg-gray-700'} border w-[50%]  border-gray-300 rounded-lg px-3 py-1 text-sm`}
            onChange={(e) =>
              setSelectedDate(e.target.value ? new Date(e.target.value) : null)
            }
          />
        </div>

        {/* ✅ فلتر الأولوية */}
        <div className="flex items-center gap-2">
          <label htmlFor="priority" className="text-sm font-medium">
            Priority:
          </label>
          <select
            id="priority"
            className={` ${theme==='light'?'bg-white':'bg-gray-700'} border border-gray-300 rounded-lg px-3  text-sm`}
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
          >
            <option value="">All</option>
            <option value="high">High</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* ✅ أزرار الحالة */}
      <div className="filters-by-status flex gap-1">
        {statusButtons.map((status) => (
          <button
            key={status}
            className={`px-3 py-1 rounded-md border ${
              isActive === status
                ? "bg-blue-500 text-white"
                : "bg-gray-50 text-blue-700"
            }`}
            onClick={() => setIsActive(status)}
          >
            {status}
          </button>
        ))}
      </div>
    </div>
  );
}
