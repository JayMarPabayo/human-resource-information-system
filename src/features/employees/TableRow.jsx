import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import { useState } from "react";

import PropTypes from "prop-types";
import Modal from "../../utils/Modal";
import CreateForm from "./CreateForm";
import ViewDataForm from "./ViewDataForm";

const TableRow = ({
  employee,
  index,
  setOpenConfirmModal,
  setSelectedEmployee,
}) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [showViewForm, setShowViewForm] = useState(false);

  return (
    <>
      <div
        key={employee.id}
        className="w-full grid grid-cols-9 border-b border-neutral-300 text-slate-600 font-medium hover:bg-slate-100 whitespace-nowrap transition-all duration-300"
      >
        <div className="col-span-1 py-2 px-2 flex gap-x-2 items-center font-bold">
          {++index}{" "}
          {employee.employeeGender == "Male" ? (
            <IoMdMale className="text-lg font-extrabold text-green-900" />
          ) : (
            <IoMdFemale className="text-lg font-extrabold text-pink-900" />
          )}
        </div>
        <div className="col-span-2 py-2">
          {`${employee.employeeFirstName} ${employee.employeeLastName} ${
            employee.extension_name || ""
          } ${
            employee.employeeMiddleName
              ? employee.employeeMiddleName.charAt(0).toUpperCase() + "."
              : ""
          }`}
        </div>
        <div className="col-span-1 py-2">
          {employee.employeeDepartment || "N/A"}
        </div>
        <div className="col-span-1 py-2 text-green-800">
          {employee.employeeDesignation || "N/A"}
        </div>
        <div className="col-span-2 py-2">
          {employee.employeeEmail
            ? employee.employeeEmail
            : employee.employeeMobile
            ? employee.employeeMobile
            : ""}
        </div>
        <div className="col-span-2 flex justify-between align-middle px-1 gap-x-1 py-2">
          <button
            type="button"
            title="View"
            className="text-white w-full bg-slate-700 py-1 px-2 rounded-md hover:bg-slate-600 hover:scale-110 transition-all duration-300"
            onClick={() => setShowViewForm((bol) => !bol)}
          >
            <FaEye className="mx-auto" />
          </button>
          <button
            type="button"
            title="Edit"
            className="text-white w-full bg-slate-700 py-1 px-2 rounded-md hover:bg-slate-600 hover:scale-110 transition-all duration-300"
            onClick={() => setShowUpdateForm((bol) => !bol)}
          >
            <FaEdit className="mx-auto" />
          </button>
          <button
            type="button"
            title="Delete"
            className="text-white w-full bg-slate-700 py-1 px-2 rounded-md hover:bg-slate-600 hover:scale-110 transition-all duration-300"
            onClick={() => {
              setSelectedEmployee(employee.id);
              setOpenConfirmModal(true);
            }}
          >
            <FaTrash className="mx-auto" />
          </button>
        </div>
      </div>
      <Modal open={showUpdateForm} size="w-[78rem]">
        <CreateForm
          onClose={() => setShowUpdateForm(false)}
          employeeData={employee}
        />
      </Modal>
      <Modal open={showViewForm} size="w-[78rem]">
        <ViewDataForm
          onClose={() => setShowViewForm(false)}
          employeeData={employee}
        />
      </Modal>
    </>
  );
};
TableRow.propTypes = {
  employee: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  setOpenConfirmModal: PropTypes.func,
  setSelectedEmployee: PropTypes.func,
};

export default TableRow;
