import { NavLink } from "react-router-dom";
import { IoPeople, IoSettings } from "react-icons/io5";
import { FaLayerGroup } from "react-icons/fa";

const Sidebar = () => {
  const linkStyles = `group flex gap-x-3 items-center align-middle py-2 px-4 text-slate-500 hover:bg-slate-200 hover:text-gray-700 transition-all duration-300`;
  const linkACtive = `group flex gap-x-3 items-center align-middle py-2 px-4 bg-slate-200 text-green-700`;
  return (
    <nav className="flex flex-col rounded-md shadow-md h-full font-medium pt-5">
      <ul className="flex flex-col text-sm">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? linkACtive : linkStyles)}
          >
            <FaLayerGroup />
            <span className="text-gray-700">Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/employee"
            className={({ isActive }) => (isActive ? linkACtive : linkStyles)}
          >
            <IoPeople />
            <span className="text-gray-700">Employee</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/administration"
            className={({ isActive }) => (isActive ? linkACtive : linkStyles)}
          >
            <IoSettings />
            <span className="text-gray-700">Administration</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
