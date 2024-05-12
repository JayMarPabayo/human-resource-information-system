import { useNavigate } from "react-router-dom";

import { TbFaceIdError } from "react-icons/tb";
import { IoMdHome } from "react-icons/io";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-bl from-slate-400 to-slate-600 flex flex-col  justify-center items-center gap-4">
      <TbFaceIdError className="text-8xl text-slate-200 drop-shadow-md" />
      <h4 className="text-slate-50 drop-shadow-md text-8xl font-extrabold">
        404
      </h4>
      <h6 className="text-slate-50 drop-shadow-md text-3xl">Page not found</h6>
      <button
        onClick={() => navigate("/")}
        className="text-slate-50 bg-slate-900 rounded-md py-1 px-4 flex items-center justify-center gap-2 hover:bg-slate-800 hover:scale-110 active:scale-90 duration-300"
      >
        <IoMdHome />
        <span>Home</span>
      </button>
    </div>
  );
};

export default PageNotFound;
