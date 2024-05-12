import { NavLink } from "react-router-dom";
import { IoSettings } from "react-icons/io5";
import { FaTable, FaLayerGroup } from "react-icons/fa";
import { FaPeopleRoof } from "react-icons/fa6";

const Sidebar = () => {
  const linkStyles = `flex gap-x-3 items-center align-middle py-2 px-4 text-slate-500 hover:bg-slate-200 hover:text-gray-700 transition-all duration-500`;
  const linkACtive = `flex gap-x-3 items-center align-middle py-2 px-4 bg-slate-200 text-slate-700 scale-105 rounded-sm`;
  return (
    <nav className="flex flex-col rounded-md shadow-md h-full font-medium pt-5">
      <ul className="flex flex-col text-sm">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) => (isActive ? linkACtive : linkStyles)}
          >
            <FaLayerGroup />
            <span>Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/employee"
            className={({ isActive }) => (isActive ? linkACtive : linkStyles)}
          >
            <FaPeopleRoof />
            <span>Employee</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/reports"
            className={({ isActive }) => (isActive ? linkACtive : linkStyles)}
          >
            <FaTable />
            <span>Reports</span>
          </NavLink>
        </li>
        {/* <li>
          <NavLink
            to="/users"
            className={({ isActive }) => (isActive ? linkACtive : linkStyles)}
          >
            <IoPeople />
            <span>Users</span>
          </NavLink>
        </li> */}
        <li>
          <NavLink
            to="/administration"
            className={({ isActive }) => (isActive ? linkACtive : linkStyles)}
          >
            <IoSettings />
            <span>Administration</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
