import { useState } from "react";

import { IoMdFemale, IoMdMale } from "react-icons/io";
import { FcPrint } from "react-icons/fc";

import PropTypes from "prop-types";

import Modal from "../../utils/Modal";
import Employee from "./Employee";

const TableRow = ({ employee, index }) => {
  const [showEmployeePrint, setShowEmployeePrint] = useState(false);

  return (
    <>
      <div
        key={index}
        className="w-full grid grid-cols-9 border-b border-neutral-300 text-slate-600 font-medium hover:bg-slate-100 whitespace-nowrap transition-all duration-300"
      >
        <div className="col-span-1 py-2 px-2 flex gap-x-2 items-center font-bold">
          {employee.id}{" "}
          {employee.employeeGender == "Male" ? (
            <IoMdMale className="text-lg font-extrabold text-green-900" />
          ) : (
            <IoMdFemale className="text-lg font-extrabold text-pink-900" />
          )}
        </div>
        <div className="col-span-2 py-2">
          {`${employee.employeeLastName} ${employee.employeeFirstName} ${
            employee.extension_name || ""
          } ${
            employee.employeeMiddleName
              ? employee.employeeMiddleName.charAt(0).toUpperCase() + "."
              : ""
          }`}
        </div>
        <div className="col-span-2 py-2 truncate">
          {employee.departments?.departmentName || "N/A"}
        </div>
        <div className="col-span-1 py-2 text-green-800">
          {employee.employeeDesignation || "N/A"}
        </div>
        <div className="col-span-2 py-2">
          {employee.employeeEmail
            ? employee.employeeEmail
            : employee.employeeMobile
            ? employee.employeeMobile
            : "N/A"}
        </div>
        <div className="col-span-1 flex justify-center align-middle px-1 gap-x-2 py-2">
          <button
            type="button"
            title="Print Single Data Sheet"
            className=" flex items-center justify-center gap-x-2 text-slate-700 border border-slate-600 border-opacity-20 shadow-md w-fit bg-slate-300 py-1 px-4 rounded-md hover:bg-slate-200 hover:scale-110 transition-all duration-300 active:scale-95"
            onClick={() => setShowEmployeePrint(true)}
          >
            <FcPrint className="text-lg" />
          </button>
        </div>
      </div>
      <Modal open={showEmployeePrint}>
        <Employee
          setShowEmployeePrint={setShowEmployeePrint}
          employee={employee}
        />
      </Modal>
    </>
  );
};
TableRow.propTypes = {
  employee: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default TableRow;
