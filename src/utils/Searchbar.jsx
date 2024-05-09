import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = ({ ...props }) => {
  return (
    <div className="relative w-2/5">
      <input
        type="search"
        className="text-xs w-full py-2 pl-10 pr-4 leading-tight focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg focus:border-indigo-300 focus:outline-indigo-300 focus:outline-2"
        placeholder="Search..."
        {...props}
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <AiOutlineSearch className="text-gray-500" />
      </div>
    </div>
  );
};

export default SearchBar;
