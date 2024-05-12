import { useForm } from "react-hook-form";

import { CgSpinner } from "react-icons/cg";

import PropTypes from "prop-types";

import { useSignup } from "./useSignup";

import TextInput from "../../utils/TextInput";

const SignupForm = ({ toggle }) => {
  const { signup, isSigningUp } = useSignup();

  const { register, reset, handleSubmit, formState, getValues } = useForm();
  const { errors } = formState;

  function onError(errors) {
    console.error(errors);
  }

  function onSubmit({ userFullName, userEmail, userPassword }) {
    signup(
      { userFullName, userEmail, userPassword },
      {
        onSettled: reset,
      }
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="w-[30rem] h-fit p-8 bg-white bg-opacity-30 rounded-md shadow-md flex flex-col gap-y-7 py-10"
      >
        <h6 className="text-center text-2xl font-semibold text-slate-800">
          Member Sign up
        </h6>
        <section className="py-3 flex flex-col gap-4">
          <TextInput
            label="Full Name"
            textSize="text-xs"
            placeholder="User full name"
            errorState={errors?.userFullName?.message}
            {...register("userFullName", {
              required: "This field is required",
            })}
          />
          <TextInput
            type="text"
            label="Email Address"
            textSize="text-xs"
            placeholder="User email address"
            errorState={errors?.userEmail?.message}
            {...register("userEmail", {
              required: "This field is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Please provide a valid email address",
              },
            })}
          />
          <TextInput
            type="password"
            label="Password"
            textSize="text-xs"
            placeholder="User password"
            autoComplete="user-password"
            errorState={errors?.userPassword?.message}
            {...register("userPassword", {
              required: "This field is required",
              minLength: {
                value: 6,
                message: "Password should at least have 6 characters",
              },
            })}
          />
          <TextInput
            type="password"
            label="Repeat Password"
            textSize="text-xs"
            autoComplete="retype-password"
            placeholder="Re-type entered password"
            errorState={errors?.userRepeatPassword?.message}
            {...register("userRepeatPassword", {
              required: "This field is required",
              validate: (value) =>
                value === getValues().userPassword || "Passwords did not match",
            })}
          />
        </section>
        <section className="flex items-center justify-end mt-5">
          <button
            type="submit"
            title="Submit"
            className="w-full flex justify-center items-center gap-2 text-sm font-semibold py-3 text-white bg-slate-700 rounded-md hover:bg-slate-600 hover:scale-105 active:scale-95 transition-all duration-300"
            disabled={isSigningUp}
          >
            {isSigningUp && <CgSpinner className="animate-spin text-lg" />}
            <span>Submit</span>
          </button>
        </section>
        <div className="flex justify-center items-center gap-2 w-full text-base">
          <span className="w-fit">Already have an account?</span>
          <span
            onClick={toggle}
            className="w-fit p-0 text-cyan-800 font-medium hover:underline hover:text-cyan-700 cursor-pointer"
          >
            Log in here
          </span>
        </div>
      </form>
    </>
  );
};

SignupForm.propTypes = {
  toggle: PropTypes.func,
};
export default SignupForm;
