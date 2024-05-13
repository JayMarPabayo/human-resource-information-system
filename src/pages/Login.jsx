// import { useState } from "react";

import LoginForm from "../features/authentication/LoginForm";
// import SignupForm from "../features/authentication/SignupForm";

const Login = () => {
  // const [showLoginForm, setShowLoginForm] = useState(true);

  // const toggleForm = () => {
  //   setShowLoginForm(!showLoginForm);
  // };

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
      <LoginForm />
      {/* {showLoginForm ? (
        <LoginForm toggle={toggleForm} />
      ) : (
        <SignupForm toggle={toggleForm} />
      )} */}
    </div>
  );
};

export default Login;
