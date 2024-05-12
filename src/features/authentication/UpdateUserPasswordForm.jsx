import { useForm } from "react-hook-form";

import { CgSpinner } from "react-icons/cg";

import { useUpdateUser } from "./useUpdateUser";

import TextInput from "../../utils/TextInput";

const UpdateUserPasswordForm = () => {
  const { updateUser, isUpdating } = useUpdateUser();

  const { reset, register, handleSubmit, formState, getValues } = useForm();
  const { errors } = formState;

  function onError(errors) {
    console.error(errors);
  }

  function onSubmit({ userPassword }) {
    if (!userPassword) return;
    updateUser(
      { password: userPassword },
      {
        onSettled: reset,
      }
    );
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="w-1/2 mt-4 bg-slate-100 rounded-md p-3 flex flex-col justify-start"
      >
        <h6 className="text-xl font-semibold text-emerald-800 border-b pb-3">
          Update User Password
        </h6>
        <section className="py-3 flex flex-col gap-4 pb-5">
          <TextInput
            type="password"
            label="New Password"
            textSize="text-xs"
            placeholder="New password"
            autoComplete="new-password"
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
        <section className="mt-auto flex gap-x-4 items-center justify-end px-3">
          <button
            type="submit"
            title="Submit"
            className="flex justify-center items-center gap-2 text-sm font-semibold w-40 text-white bg-slate-700 p-2 rounded-md hover:bg-slate-600 hover:scale-105 active:scale-95 transition-all duration-300"
            disabled={isUpdating}
          >
            {isUpdating && <CgSpinner className="animate-spin text-lg" />}
            <span>Submit</span>
          </button>
        </section>
      </form>
    </>
  );
};

export default UpdateUserPasswordForm;
