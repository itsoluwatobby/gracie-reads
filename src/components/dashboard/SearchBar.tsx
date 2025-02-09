import { Search } from "lucide-react";

type SearchBarProp = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}
export default function SearchBar({ searchQuery, setSearchQuery }: SearchBarProp) {

  return (
    <div className="w-full lg:maxw-2xl mxauto mb-8">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for audiobooks, authors, or narrators..."
          maxLength={30}
          className="w-full px-6 py-4 pr-12 text-black text-lg rounded-full border-2 border-sky-100 focus:border-sky-300 focus:ring-2 focus:ring-sky-200 focus:outline-none shadow-sm"
        />
        <button
          type="submit"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-sky-600 hover:text-sky-700"
        >
          <Search size={24} />
        </button>
      </div>
    </div>
  );
}
