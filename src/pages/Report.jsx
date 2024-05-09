import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { getEmployees } from "../services/apiEmployees";

import { TiArrowSortedDown } from "react-icons/ti";
import { FcPrint } from "react-icons/fc";

import Searchbar from "../utils/Searchbar";
import Spinner from "../utils/Spinner";
import TableRow from "../features/reports/TableRow";
import Modal from "../utils/Modal.jsx";
import Employees from "../features/reports/Employees.jsx";

const Report = () => {
  const [searchKey, setSearchKey] = useState("");

  const [showEmployeesPrint, setShowEmployeesPrint] = useState(false);

  const [departmentDropdown, setDepartmentDropdown] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");

  const [designationDropdown, setDesignationDropdown] = useState(false);
  const [selectedDesignation, setSelectedDesignation] = useState("");

  const toggleDepartmentDropdown = () => {
    setDepartmentDropdown(!departmentDropdown);
  };

  const toggleDesignationDropdown = () => {
    setDesignationDropdown(!designationDropdown);
  };

  const { isLoading, data } = useQuery({
    queryKey: ["employees"],
    queryFn: () => getEmployees(),
  });

  const departments = [
    ...new Set(data?.map((employee) => employee.departments.departmentName)),
  ];
  let filteredData =
    searchKey || selectedDepartment
      ? data?.filter((employee) => {
          const fullName =
            `${employee.employeeFirstName} ${employee.employeeLastName} ${employee.employeeMiddleName} ${employee.employeeDesignation} ${employee.departments.departmentName}`.toLowerCase();
          const department = employee.departments.departmentName.toLowerCase();
          const designation = employee.employeeDesignation.toLowerCase();

          return (
            fullName.includes(searchKey?.toLowerCase()) &&
            department.includes(selectedDepartment?.toLowerCase()) &&
            designation.includes(selectedDesignation?.toLowerCase())
          );
        })
      : data;

  const designations = [
    ...new Set(
      data
        ?.filter((employee) =>
          employee.departments.departmentName
            .toLowerCase()
            .includes(selectedDepartment?.toLowerCase())
        )
        .map((employee) => employee.employeeDesignation)
    ),
  ];

  return (
    <>
      <section className="flex justify-between items-center">
        <Searchbar
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button
          type="button"
          title="Print Table Data"
          className=" flex items-center justify-center gap-x-2 text-slate-700 border border-slate-600 border-opacity-20 shadow-md w-fit bg-slate-300 py-1 px-4 rounded-md hover:bg-slate-200 hover:scale-110 transition-all duration-300 active:scale-95"
          onClick={() => setShowEmployeesPrint(true)}
        >
          <FcPrint className="text-lg" />
          <span className="text-xs">Print Table</span>
        </button>
      </section>
      <div className="flex flex-col h-full">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 h-full">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8  h-full">
            <div className="overflow-hidden h-[90%]">
              <div className="min-w-full text-left text-sm">
                <section className="grid grid-cols-9 bg-slate-300 text-xs text-slate-600 border border-slate-600 border-opacity-10 shadow-sm">
                  <div className="py-2 px-2 col-span-1">ID</div>
                  <div className="py-2 col-span-2">
                    <span>Name</span>
                    <span className="ms-2 text-xs italic text-gray-500 font-normal">
                      Last Name, First Name, M.I.
                    </span>
                  </div>
                  {/* Department Header */}
                  <div
                    className="py-2 col-span-2 relative  cursor-pointer flex justify-between items-center ps-1 pe-5 hover:bg-slate-200 hover:rounded-sm duration-300"
                    onClick={toggleDepartmentDropdown}
                  >
                    <span>{selectedDepartment || "Department"}</span>
                    <TiArrowSortedDown className="text-lg" />
                    <div
                      className={`absolute top-full w-full ${
                        departmentDropdown ? "" : "hidden"
                      }`}
                    >
                      <ul className="bg-slate-200 border border-slate-300 shadow-md py-2 -ms-1 font-medium">
                        <li
                          className="cursor-pointer hover:bg-slate-100 px-2 py-1 duration-300"
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelectedDesignation("");
                            setDesignationDropdown(false);
                            setSelectedDepartment("");
                            setDepartmentDropdown(false);
                          }}
                        >
                          All
                        </li>
                        {departments?.map((department, index) => {
                          return (
                            <li
                              key={index}
                              className="cursor-pointer hover:bg-slate-100 px-2 py-1 duration-300"
                              onClick={(event) => {
                                event.stopPropagation();
                                setSelectedDepartment(department);
                                setDepartmentDropdown(false);
                              }}
                            >
                              {department}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  {/* Designation Header */}
                  <div
                    className={`py-2 col-span-1 relative flex justify-between items-center ps-1 pe-5 duration-300 ${
                      selectedDepartment &&
                      "hover:bg-slate-200 hover:rounded-sm cursor-pointer"
                    }`}
                    onClick={() => {
                      if (selectedDepartment) {
                        toggleDesignationDropdown();
                      }
                    }}
                  >
                    <span>{selectedDesignation || "Designation"}</span>
                    {selectedDepartment && (
                      <TiArrowSortedDown className="text-lg" />
                    )}
                    <div
                      className={`absolute top-full w-full ${
                        designationDropdown ? "" : "hidden"
                      }`}
                    >
                      <ul className="bg-slate-200 border border-slate-300 shadow-md py-2 -ms-1 font-medium">
                        <li
                          className="cursor-pointer hover:bg-slate-100 px-2 py-1 duration-300"
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelectedDesignation("");
                            setDesignationDropdown(false);
                          }}
                        >
                          All
                        </li>
                        {designations?.map((designation, index) => {
                          return (
                            <li
                              key={index}
                              className="cursor-pointer hover:bg-slate-100 px-2 py-1 duration-300"
                              onClick={(event) => {
                                event.stopPropagation();
                                setSelectedDesignation(designation);
                                setDesignationDropdown(false);
                              }}
                            >
                              {designation}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                  <div className="py-2 col-span-2">Contact Details</div>
                  <div className="py-2 text-center col-span-1">Export</div>
                </section>
                <section className="w-full text-xs font-normal tracking-wide">
                  {filteredData?.map((employee, index) => {
                    return (
                      <TableRow key={index} employee={employee} index={index} />
                    );
                  })}
                </section>
              </div>
              {isLoading && <Spinner />}
            </div>
          </div>
        </div>
      </div>

      <Modal open={showEmployeesPrint}>
        <Employees
          setShowEmployeePrint={setShowEmployeesPrint}
          employees={filteredData}
          department={selectedDepartment}
          designation={selectedDesignation}
        />
      </Modal>
    </>
  );
};

export default Report;
