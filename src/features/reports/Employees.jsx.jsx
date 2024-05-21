import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import PropTypes from "prop-types";

const Employees = ({
  setShowEmployeePrint,
  employees,
  department,
  designation,
}) => {
  console.log(employees);
  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Employees",
    onBeforePrint: () => console.log("before printing..."),
    onAfterPrint: () => console.log("after printing..."),
    removeAfterPrint: true,
  });

  const employeesCount = employees?.length || 0;

  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  return (
    <>
      <div className="rounded-none h-[160mm] w-[240mm] border-2 overflow-y-scroll pe-1">
        <div
          ref={contentToPrint}
          className="min-h-[356mm] min-w-[216mm] px-4 py-6 flex flex-col gap-3 text-sm"
        >
          <section className="grid grid-cols-5 h-fit w-fit ps-2 gap-x-2">
            <img
              src="/logo.png"
              alt="Logo"
              className="col-span-1 row-span-2 w-12 h-12 drop-shadow-md"
            />
            <h2 className="col-span-4 font-extrabold text-lg">
              LIST OF EMPLOYEES
            </h2>
            <h2 className="col-span-4 text-slate-400 font-medium text-xs">
              Human Resource Information System
            </h2>
          </section>
          <div className="flex pe-5 justify-between">
            <section className="ps-2 text-xs text-slate-400 font-medium mt-3">
              <h2>
                Date:{" "}
                <span className="text-slate-700">
                  {today.toLocaleDateString("en-US", options)}
                </span>
              </h2>
              <h2>
                No. of Employees:{" "}
                <span className="text-slate-700">{employeesCount}</span>
              </h2>
            </section>
            {department && (
              <section className="ps-2 text-xs text-slate-400 font-medium mt-3">
                <h2>
                  Department:{" "}
                  <span className="text-slate-700">{department || ""}</span>
                </h2>
                {designation && (
                  <h2>
                    Designation:{" "}
                    <span className="text-slate-700">{designation || ""}</span>
                  </h2>
                )}
              </section>
            )}
          </div>
          <table className="table-auto w-full text-sm text-left text-gray-600 mt-5">
            <thead
              className="text-gray-700 uppercase bg-slate-200"
              style={{
                fontSize: "0.65rem",
              }}
            >
              <tr>
                <th colSpan={1} className="py-2 ps-2">
                  ID
                </th>
                <th colSpan={1} className="py-2 px-1">
                  Name
                </th>
                <th colSpan={1} className="py-2 px-1">
                  Gender
                </th>
                <th colSpan={1} className="py-2 px-1">
                  Department
                </th>
                <th colSpan={1} className="py-2 px-1">
                  Designation
                </th>
                <th colSpan={1} className="py-2 px-1">
                  Contact Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white text-xs ">
              {employees.map((employee, index) => (
                <tr key={index} className="align-top">
                  <td className="py-2 px-1 ps-2">{employee.id}</td>
                  <td className="py-2 px-1">
                    {" "}
                    {`${employee.employeeLastName} ${
                      employee.employeeFirstName
                    }${
                      employee.extension_name
                        ? ` ${employee.extension_name}`
                        : ""
                    }, ${employee.employeeMiddleName}`}
                  </td>
                  <td className="py-2 px-1">
                    {employee.employeeGender || "N/A"}
                  </td>
                  <td className="py-2 px-1">
                    {employee.departmentname || "N/A"}
                  </td>
                  <td className="py-2 px-1">
                    {employee.employeeDesignation || "N/A"}
                  </td>
                  <td className="py-2 px-1">
                    {employee.employeeEmail
                      ? employee.employeeEmail
                      : employee.employeeMobile
                      ? employee.employeeMobile
                      : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <section className="flex gap-x-4 items-center justify-end px-3 mt-5">
        <button
          type="button"
          title="Cancel"
          className="text-sm font-semibold w-40 text-slate-700 border border-opacity-10 border-slate-600 bg-slate-100 p-2 rounded-md hover:bg-slate-200 hover:text-slate-900 hover:scale-110 transition-all duration-300"
          onClick={() => setShowEmployeePrint(false)}
        >
          <span>Cancel</span>
        </button>
        <button
          type="button"
          title="Delete"
          className="text-sm font-semibold w-40 text-white bg-slate-700 p-2 rounded-md hover:bg-slate-600 hover:scale-110 transition-all duration-300"
          onClick={() => {
            handlePrint(null, () => contentToPrint.current);
          }}
        >
          <span>Print</span>
        </button>
      </section>
    </>
  );
};

Employees.propTypes = {
  setShowEmployeePrint: PropTypes.func,
  employees: PropTypes.array,
  department: PropTypes.string,
  designation: PropTypes.string,
};

export default Employees;
