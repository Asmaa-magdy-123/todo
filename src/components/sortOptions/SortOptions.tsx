interface SortOptionsProps {
  selectedSortByPriority: string;
  setSelectedSortByPriority: (value: string) => void;
  selectedSortByDate: string;
  setSelectedSortByDate: (value: string) => void;
  theme:string;
}

export default function SortOptions({
  selectedSortByPriority,
  setSelectedSortByPriority,
  selectedSortByDate,
  setSelectedSortByDate,
  theme,
}: SortOptionsProps) {
  return (
    <div className="sort-options mt-3 flex justify-between md:justify-start lg:justify-end w-full  gap-4 items-center">
      <div className="flex items-center   text-sm sm:text-md gap-1">
        <p>Sort by Priority:</p>
        <select
          value={selectedSortByPriority}
          onChange={(e) => setSelectedSortByPriority(e.target.value)}
          className={` ${theme==='light'?'bg-white':'bg-gray-700'} border  rounded-lg border-gray-200 px-1`}
        >
          <option value="">Select</option>
          <option value="high">High</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="flex items-center text-sm sm:text-md gap-1">
        <p>Sort by Date:</p>
        <select
          value={selectedSortByDate}
          onChange={(e) => setSelectedSortByDate(e.target.value)}
          className={`${theme==='light'?'bg-white':'bg-gray-700'} border  rounded-lg border-gray-200 px-1`}
        >
          <option value="">Select</option>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </div>
  );
}
