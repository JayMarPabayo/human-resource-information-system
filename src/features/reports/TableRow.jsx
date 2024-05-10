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

        <td className="p-1">{employee.departments?.departmentName || "N/A"}</td>

        <td className="p-1">{employee.employeeDesignation || "N/A"}</td>

        <td className="p-1">
          {employee.employeeEmail
            ? employee.employeeEmail
            : employee.employeeMobile
            ? employee.employeeMobile
            : "N/A"}
        </td>
        <td className="flex justify-between align-middle text-base p-1 gap-2">
          <button
            type="button"
            title="Print Single Data Sheet"
            className="flex items-center justify-center gap-x-2 text-slate-700 border border-slate-600 border-opacity-20 shadow-md w-fit bg-slate-300 py-1 px-4 rounded-md hover:bg-slate-200 hover:scale-110 transition-all duration-300 active:scale-95"
            onClick={() => setShowEmployeePrint(true)}
          >
            <FcPrint className="text-lg" />
          </button>
        </td>
      </tr>
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
