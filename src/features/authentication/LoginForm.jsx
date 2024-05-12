import { useState } from "react";

import { FaEnvelope, FaLock } from "react-icons/fa";
import { MdNoEncryptionGmailerrorred } from "react-icons/md";

import PropTypes from "prop-types";

import { useLogin } from "./useLogin";

import BigSpinner from "../../utils/BigSpinner";

const LoginForm = ({ toggle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLogging, errorLogin, error } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login({ email, password });
  }

  return (
    <>
      {isLogging && <BigSpinner />}
      <form
        onSubmit={handleSubmit}
        className="w-[30rem] h-3/5 p-8 bg-white bg-opacity-30 rounded-md shadow-md flex flex-col gap-y-7 py-10"
      >
        <h6 className="text-center text-2xl font-semibold text-slate-800">
          Member Log in
        </h6>
        <div className="relative">
          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 focus:outline-none focus:shadow-outline border border-gray-300 rounded-md"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaEnvelope className="text-gray-500" />
          </div>
        </div>
        <div className="relative">
          <input
            type="password"
            autoComplete="password"
            className="w-full py-2 pl-10 pr-4 focus:outline-none focus:shadow-outline border border-gray-300 rounded-md"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FaLock className="text-gray-500" />
          </div>
        </div>
        {errorLogin && (
          <div className="flex items-center gap-2 text-red-500 text-sm tracking-wide font-medium drop-shadow-md">
            <MdNoEncryptionGmailerrorred className="text-red-700 text-lg" />
            <span>{error.message}</span>
          </div>
        )}
        <button
          type="submit"
          className="w-full flex justify-center items-center gap-2 text-sm font-semibold py-3 text-white bg-slate-700 rounded-md hover:bg-slate-600 hover:scale-105 active:scale-95 transition-all duration-300"
        >
          Log in
        </button>
        <div className="flex justify-center items-center gap-2 w-full text-base">
          <span className="w-fit">Don&apos;t have an account?</span>
          <span
            onClick={toggle}
            className="w-fit p-0 text-cyan-800 font-medium hover:underline hover:text-cyan-700 cursor-pointer"
          >
            Create an account
          </span>
        </div>
      </form>
    </>
  );
};
LoginForm.propTypes = {
  toggle: PropTypes.func,
};
export default LoginForm;
