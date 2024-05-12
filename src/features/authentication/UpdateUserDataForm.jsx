import { useForm } from "react-hook-form";

import { CgSpinner } from "react-icons/cg";

import { useUpdateUser } from "./useUpdateUser";
import { useUser } from "./useUser";

import TextInput from "../../utils/TextInput";

const UpdateUserDataForm = () => {
  const { updateUser, isUpdating } = useUpdateUser();

  const {
    user: {
      email,
      user_metadata: { fullname: currentFullName },
    },
  } = useUser();

  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      userFullName: currentFullName,
      userEmail: email,
    },
  });
  const { errors } = formState;

  // const [fullname, setFullname] = useState(currentFullName);

  function onError(errors) {
    console.error(errors);
  }

  function onSubmit({ userFullName }) {
    if (!userFullName) return;
    updateUser({ fullname: userFullName });
  }
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="w-1/2 mt-4 bg-slate-100 rounded-md p-3 flex flex-col justify-start"
      >
        <h6 className="text-xl font-semibold text-emerald-800 border-b pb-3">
          Update User Data
        </h6>
        <section className="py-3 flex flex-col gap-4 pb-5">
          <TextInput
            type="email"
            label="Email Address"
            textSize="text-xs"
            placeholder="User email address"
            disabled={true}
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
            label="Full Name"
            textSize="text-xs"
            placeholder="User full name"
            disabled={isUpdating}
            errorState={errors?.userFullName?.message}
            {...register("userFullName", {
              required: "This field is required",
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

// UpdateUserDataForm.propTypes = {};
export default UpdateUserDataForm;
