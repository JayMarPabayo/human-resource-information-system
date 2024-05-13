import { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

import { FaUserCircle } from "react-icons/fa";
// import { MdManageAccounts } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import { CgSpinner } from "react-icons/cg";

import { useUser } from "../features/authentication/useUser";
import { useLogout } from "../features/authentication/useLogout";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { logout, isLoggingOut } = useLogout();
  const { user } = useUser();
  // const navigate = useNavigate();

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function handleLogout() {
    logout({
      id: user.id,
    });
  }

  return (
    <header className="bg-slate-200 px-[5%] py-3 flex justify-end gap-3 items-center text-gray-800">
      <div className="flex items-center me-auto">
        {/* Logo with site name */}
        <img src="/logo.png" alt="Logo" className="w-8 h-8 mr-2" />
        <h4 className="font-bold">Human Resource Information System</h4>
      </div>
      {showMenu && (
        <div
          ref={menuRef}
          className="absolute top-11 right-20 z-50 py-2 w-60 bg-slate-200 shadow-md rounded-md text-sm font-medium tracking-wide text-slate-600 border border-slate-300"
        >
          {/* <button
            onClick={() => navigate("/account")}
            className="w-full flex justify-start items-center gap-2 p-2 hover:bg-slate-100 hover:text-slate-700 duration-300"
          >
            <MdManageAccounts className="text-lg" />
            <span>Account</span>
          </button> */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex justify-start items-center gap-2 p-2 hover:bg-slate-100 hover:text-slate-700 duration-300"
          >
            {!isLoggingOut ? (
              <IoLogOut className="text-lg" />
            ) : (
              <CgSpinner className="animate-spin text-lg" />
            )}

            <span>Log out</span>
          </button>
        </div>
      )}
      <span className="text-xs font-medium tracking-wide text-slate-700 drop-shadow-md">
        {user?.userFullName.toUpperCase()}
      </span>
      <button
        ref={buttonRef}
        onClick={() => setShowMenu((curr) => !curr)}
        className="text-3xl hover:text-gray-700 hover:scale-110 active:scale-95 transition-all duration-300"
      >
        <FaUserCircle />
      </button>
    </header>
  );
};

export default Header;
