import { Link } from "react-router-dom";
import { MdOutlineSettings, MdGroup } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa";

const Sidebar = () => {
  return (
    <nav className="flex flex-col rounded-md shadow-md h-full text-gray-700 font-medium pt-5">
      <ul className="flex flex-col">
        <li>
          <Link
            to="/"
            className="flex gap-x-3 items-center align-middle py-2 px-4 hover:bg-slate-200 hover:text-gray-950 transition-all duration-300"
          >
            <FaLayerGroup />
            <span>Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            to="/account"
            className="flex gap-x-3 items-center align-middle py-2 px-4 hover:bg-slate-200 hover:text-gray-950 transition-all duration-300"
          >
            <MdOutlineSettings />
            <span>Account</span>
          </Link>
        </li>
        <li>
          <Link
            to="/employee"
            className="flex gap-x-3 items-center align-middle py-2 px-4 hover:bg-slate-200 hover:text-gray-950 transition-all duration-300"
          >
            <MdGroup />
            <span>Employee</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
