import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-slate-200 px-[5%] py-3 flex justify-between items-center text-gray-800">
      <div className="flex items-center">
        {/* Logo with site name */}
        <img src="/logo.png" alt="Logo" className="w-8 h-8 mr-2" />
        <h4 className="font-bold">Human Resource Information System</h4>
      </div>
      <button className="text-3xl hover:text-gray-700 hover:scale-110 transition-all duration-300">
        <FaUserCircle />
      </button>
    </header>
  );
};

export default Header;
