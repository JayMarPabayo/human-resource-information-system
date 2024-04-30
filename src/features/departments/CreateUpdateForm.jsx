import { useCreateDepartment } from "./useCreateDepartment";
import { useUpdateDepartment } from "./useUpdateDepartment";
import { useForm } from "react-hook-form";

import { BiSolidGroup } from "react-icons/bi";

import TextInput from "../../utils/TextInput";
import PropTypes from "prop-types";

const CreateUpdateForm = ({ onClose, deparmentData = {} }) => {
  const {
    departmentCreating,
    createDepartment,
    isdepartmentCreatingError,
    error: departmentCreatingError,
    reset: createDepartmentReset,
  } = useCreateDepartment();

  const {
    departmentUpdating,
    updateDepartment,
    isdepartmentUpdatingError,
    error: departmentUpdatingError,
    reset: updateDepartmentReset,
  } = useUpdateDepartment();

  const { id: editID, ...editValues } = deparmentData;
  const { register, reset, handleSubmit, formState } = useForm({
    defaultValues: editID ? editValues : {},
  });

  const { errors } = formState;

  function onError(errors) {
    console.error(errors);
  }

  function onSubmit(data) {
    if (editID) {
      updateDepartment(
        {
          department: data,
          id: editID,
        },
        {
          onSuccess: () => {
            reset();
            onClose(false);
          },
        }
      );
    } else {
      createDepartment(data, {
        onSuccess: () => {
          reset();
          onClose(false);
        },
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)}>
      <section className="flex justify-between gap-x-3 items-center">
        <h6 className="text-xl font-semibold text-slate-800">Add Department</h6>
        {isdepartmentCreatingError ||
          (isdepartmentUpdatingError && (
            <span className="text-xs text-red-700 font-medium">
              {departmentCreatingError?.message ||
                departmentUpdatingError?.message}
            </span>
          ))}
      </section>
      <div className="text-slate-500 mt-4 text-sm flex items-center gap-x-3">
        <div className="text-3xl text-emerald-800">
          <BiSolidGroup />
        </div>
        <TextInput
          placeholder="Department Name"
          errorState={errors?.departmentName?.message}
          {...register("departmentName", {
            required: "This field is required",
          })}
        />
      </div>
      <section className="flex gap-x-4 items-center justify-end px-3 mt-5">
        <button
          type="button"
          title="Cancel"
          className="text-sm font-semibold w-40 text-slate-700 border border-opacity-10 border-slate-600 bg-slate-100 p-2 rounded-md hover:bg-slate-200 hover:text-slate-900 hover:scale-110 transition-all duration-300"
          onClick={() => {
            reset();
            createDepartmentReset();
            updateDepartmentReset();
            onClose(false);
          }}
        >
          <span>Cancel</span>
        </button>
        <button
          type="submit"
          title="Add Department"
          className="text-sm font-semibold w-40 text-white bg-slate-700 p-2 rounded-md hover:bg-slate-600 hover:scale-110 transition-all duration-300"
          onClick={() => {}}
          disabled={departmentUpdating || departmentCreating}
        >
          <span>Submit</span>
        </button>
      </section>
    </form>
  );
};

CreateUpdateForm.propTypes = {
  onClose: PropTypes.func,
  deparmentData: PropTypes.object,
};

export default CreateUpdateForm;
