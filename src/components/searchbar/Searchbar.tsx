import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
  search: string;
  theme:string;
  setSearch: (value: string) => void;
}

export default function SearchBar({ search, setSearch, theme }: SearchBarProps) {
  return (
    <div className={`search-container flex items-center px-4 rounded-full ${theme==='light'?'bg-gray-50':"bg-gray-700"}  bg-gray-50 border-2 mb-3 border-gray-100`}>
      <input
        type="text"
        value={search}
        placeholder="Search Task..."
        onChange={(e) => setSearch(e.target.value)}
        className={`w-full p-2 rounded-xl ${theme==='light'?'bg-gray-50':"bg-gray-700"}`}
      />
      <FontAwesomeIcon icon={faSearch} className="bg-blue-700 p-2 rounded-full text-white" />
    </div>
  );
}
