import { Outlet } from "react-router-dom/dist";
import Header from "./Header";
import Sidebar from "./Sidebar";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-bl from-slate-400 to-slate-600 flex flex-col">
      <Header />
      <div className=" flex-grow  grid grid-cols-5 px-[5%] gap-5 py-5 h-full">
        <nav className="col-span-1 rounded-md bg-slate-100 bg-opacity-80 h-full">
          <Sidebar />
        </nav>
        <main className="col-span-4 rounded-md shadow-md bg-slate-100 bg-opacity-80 p-5 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
