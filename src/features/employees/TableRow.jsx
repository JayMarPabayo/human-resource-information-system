import { useState } from "react";

import { FcEmptyTrash, FcPhone } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import { BsFillEyeFill, BsPenFill } from "react-icons/bs";

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
      <tr
        key={index}
        className="w-full border-b border-neutral-300 text-slate-600 font-medium hover:bg-slate-100 whitespace-nowrap transition-all duration-300"
      >
        <td className="py-1 px-2">{employee.id}</td>
        <td className="p-1">
          {employee.employeeGender == "Male" ? (
            <IoMdMale className="text-lg font-extrabold text-green-900" />
          ) : (
            <IoMdFemale className="text-lg font-extrabold text-pink-900" />
          )}
        </td>
        <td className="p-1">
          {`${employee.employeeLastName} ${employee.employeeFirstName} ${
            employee.extension_name || ""
          } 
    ${
      employee.employeeMiddleName
        ? employee.employeeMiddleName.charAt(0).toUpperCase() + "."
        : ""
    }`}
        </td>

        <td className="p-1">{employee.departmentname || "N/A"}</td>

        <td className="p-1">{employee.employeeDesignation || "N/A"}</td>

        <td className="p-1">
          <div className="flex items-center justify-start gap-3">
            {employee.employeeEmail ? (
              <MdEmail className="text-lg" />
            ) : <FcPhone className="text-lg" /> ? (
              <FcPhone className="text-lg" />
            ) : (
              ""
            )}
            <span>
              {employee.employeeEmail
                ? employee.employeeEmail
                : employee.employeeMobile
                ? employee.employeeMobile
                : "N/A"}
            </span>
          </div>
        </td>

        <td className="flex justify-between align-middle text-base p-1 gap-2">
          <button
            type="button"
            title="View"
            className="text-slate-700 border border-slate-600 border-opacity-20 shadow-md w-full bg-slate-300 py-1 px-2 rounded-md hover:bg-slate-200 hover:scale-110 transition-all duration-300"
            onClick={() => setShowViewForm((bol) => !bol)}
          >
            <BsFillEyeFill className="mx-auto text-emerald-600" />
          </button>
          <button
            type="button"
            title="Edit"
            className="text-slate-700 border border-slate-600 border-opacity-20 shadow-md w-full bg-slate-300 py-1 px-2 rounded-md hover:bg-slate-200 hover:scale-110 transition-all duration-300"
            onClick={() => setShowUpdateForm((bol) => !bol)}
          >
            <BsPenFill className="mx-auto text-stone-600" />
          </button>
          <button
            type="button"
            title="Delete"
            className="text-slate-700 border border-slate-600 border-opacity-20 shadow-md w-full bg-slate-300 py-1 px-2 rounded-md hover:bg-slate-200 hover:scale-110 transition-all duration-300"
            onClick={() => {
              setSelectedEmployee(employee.id);
              setOpenConfirmModal(true);
            }}
          >
            <FcEmptyTrash className="mx-auto" />
          </button>
        </td>
      </tr>

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
