import { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";

import Alert from "../utils/Alert";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false);

  const handleLogin = () => {
    if (username.trim() !== "" && password.trim() !== "") {
      window.location = "/dashboard";
    } else {
      setAlert(true);
      return;
    }
  };

  return (
    <div className="bg-gradient-to-bl from-slate-400 to-slate-600 h-screen w-full flex justify-center items-center gap-x-10">
      <div className="w-[40rem] h-4/5 flex flex-col gap-y-5 items-center text-white">
        <img src="/logo.png" alt="Logo" className="w-28 h-w-28" />
        <h1 className="text-xl font-semibold">
          Human Resource Information System
        </h1>
        <p className="text-center text-base text-opacity-70">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus
          perferendis aliquam doloremque saepe reprehenderit tempore corrupti
          illo provident fuga eaque ducimus, optio in hic laudantium dolorum?
          Saepe labore sed deserunt. Quasi nostrum ipsam quia? Facilis
          voluptatum quasi error veritatis, qui provident fugit modi asperiores
          deserunt nobis dolores officia neque nisi eos nam reiciendis cum,
          optio architecto doloremque nihil libero enim! Expedita sapiente harum
          ut, sequi delectus nam optio placeat quis at labore inventore
          provident officia voluptates quaerat reiciendis quas consectetur. Ut
          eveniet error dolores fugit est quam qui sapiente vitae.
        </p>
      </div>
      <form className="w-[30rem] h-3/5 p-8 bg-white bg-opacity-30 rounded-md shadow-md flex flex-col gap-y-7 py-10">
        <h6 className="text-center text-2xl font-semibold text-slate-800">
          Member Log in
        </h6>
        <div className="relative">
          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 leading-tight focus:outline-none focus:shadow-outline border border-gray-300 rounded-md"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaUser className="text-gray-500" />
          </div>
        </div>
        <div className="relative">
          <input
            type="password"
            className="w-full py-2 pl-10 pr-4 leading-tight focus:outline-none focus:shadow-outline border border-gray-300 rounded-md"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaLock className="text-gray-500" />
          </div>
        </div>
        {alert && (
          <Alert
            subject="Warning:"
            body="Fields can't be empty"
            closer={setAlert}
          />
        )}
        <button
          type="button"
          className="mt-auto w-full text-white bg-slate-800 py-3 rounded-md font-semibold hover:bg-slate-600 transition-all duration-300"
          onClick={handleLogin}
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
