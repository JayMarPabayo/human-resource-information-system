import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { getEmployees } from "../services/apiEmployees";
import {
  getUniqueDepartments,
  getUniqueDesignations,
} from "../services/apiDepartments.js";

import { TiArrowSortedDown } from "react-icons/ti";
import {
  FcPrint,
  FcAlphabeticalSortingAz,
  FcAlphabeticalSortingZa,
} from "react-icons/fc";

import Searchbar from "../utils/Searchbar";
import Spinner from "../utils/Spinner";
import TableRow from "../features/reports/TableRow";
import Modal from "../utils/Modal.jsx";
import Employees from "../features/reports/Employees.jsx";
import TableFoot from "../utils/TableFoot";

const Report = () => {
  const [showEmployeesPrint, setShowEmployeesPrint] = useState(false);
  const [departmentDropdown, setDepartmentDropdown] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [designationDropdown, setDesignationDropdown] = useState(false);
  const [selectedDesignation, setSelectedDesignation] = useState("");

  const [searchKey, setSearchKey] = useState("");
  const [sortBy, setSortBy] = useState(true);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [filterBy, setFilterBy] = useState({
    departmentname: "",
    employeeDesignation: "",
  });

  const toggleDepartmentDropdown = () => {
    setDepartmentDropdown(!departmentDropdown);
  };

  const toggleDesignationDropdown = () => {
    setDesignationDropdown(!designationDropdown);
  };

  const { isLoading, data: { data: employees = [], count = 0 } = {} } =
    useQuery({
      queryKey: ["employees", searchKey, sortBy, page, limit, filterBy],
      queryFn: () => getEmployees(searchKey, sortBy, page, limit, filterBy),
    });

  const { data: departments } = useQuery({
    queryKey: ["uniquedepartments"],
    queryFn: () => getUniqueDepartments(),
  });

  const { data: designations } = useQuery({
    queryKey: ["uniquedesignations", selectedDepartment],
    queryFn: () => getUniqueDesignations(selectedDepartment),
  });

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
          onClick={() => {
            if (employees?.length <= 0) return;
            setShowEmployeesPrint(true);
          }}
        >
          <FcPrint className="text-lg" />
          <span className="text-xs font-medium">Print Table</span>
        </button>
      </section>
      <div className="inline-block min-w-full py-2 h-full">
        <div className="min-h-[400px] overflow-y-auto">
          <table className="w-full border border-slate-600 border-opacity-10 shadow-sm text-xs">
            <thead className="text-left">
              <tr className="bg-slate-300 text-slate-600 py-2">
                <th className="py-2 px-2">ID</th>
                <th
                  colSpan={2}
                  className="p-0"
                  onClick={() => setSortBy((curr) => !curr)}
                >
                  <div className="py-2 px-1 flex items-center justify-start gap-3 cursor-pointer hover:bg-slate-200 hover:rounded-sm duration-300">
                    <span>Name</span>
                    <span className="ms-2 text-xs italic text-gray-500 font-normal">
                      Last Name, First Name, M.I.
                    </span>
                    <span className="mx-auto">
                      {sortBy === true ? (
                        <FcAlphabeticalSortingAz className="text-base" />
                      ) : (
                        <FcAlphabeticalSortingZa className="text-base" />
                      )}
                    </span>
                  </div>
                </th>
                {/* Department Header */}
                <th onClick={toggleDepartmentDropdown}>
                  <div className="py-2 px-1 relative flex justify-between items-center duration-300 hover:bg-slate-200 hover:rounded-sm cursor-pointer">
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
                            setFilterBy({
                              departmentname: "",
                              employeeDesignation: "",
                            });

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
                                setSelectedDepartment(
                                  department.departmentname
                                );
                                setFilterBy((prevState) => ({
                                  ...prevState,
                                  departmentname: department.departmentname,
                                }));
                                setDepartmentDropdown(false);
                              }}
                            >
                              {department.departmentname}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </th>
                {/* Designation Header */}
                <th onClick={toggleDesignationDropdown}>
                  <div className="py-2 px-1 relative flex justify-between items-center duration-300 hover:bg-slate-200 hover:rounded-sm cursor-pointer">
                    <span>{selectedDesignation || "Designation"}</span>
                    <TiArrowSortedDown className="text-lg" />
                    <div
                      className={`absolute top-full w-full ${
                        designationDropdown ? "" : "hidden"
                      }`}
                    >
                      <ul className="bg-slate-200 border w-fit border-slate-300 shadow-md p-2 -ms-1 font-medium overflow-y-auto max-h-[300px]">
                        <li
                          className="cursor-pointer hover:bg-slate-100 px-2 py-1 duration-300 break-inside-avoid"
                          onClick={(event) => {
                            event.stopPropagation();
                            setSelectedDesignation("");
                            setFilterBy((prevState) => ({
                              ...prevState,
                              employeeDesignation: "",
                            }));
                            setDesignationDropdown(false);
                          }}
                        >
                          All
                        </li>
                        {designations?.map((designation, index) => {
                          return (
                            <li
                              key={index}
                              className="cursor-pointer hover:bg-slate-100 px-2 py-1 duration-300 break-inside-avoid"
                              onClick={(event) => {
                                event.stopPropagation();
                                setSelectedDesignation(
                                  designation.employeeDesignation
                                );
                                setFilterBy((prevState) => ({
                                  ...prevState,
                                  employeeDesignation:
                                    designation.employeeDesignation,
                                }));
                                setDesignationDropdown(false);
                              }}
                            >
                              {designation.employeeDesignation}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </th>
                <th className="py-2 px-1 ">Contact Details</th>
                <th className="py-2 px-1 text-center">Export</th>
              </tr>
            </thead>
            <tbody className="w-full text-xs font-normal tracking-wide">
              {employees?.map((employee, index) => {
                return (
                  <TableRow key={index} employee={employee} index={index} />
                );
              })}
            </tbody>
          </table>
          {isLoading && <Spinner />}
        </div>
        <TableFoot
          limit={limit}
          setLimit={setLimit}
          page={page}
          setPage={setPage}
          totalRows={count}
        />
      </div>

      <Modal open={showEmployeesPrint}>
        <Employees
          setShowEmployeePrint={setShowEmployeesPrint}
          employees={employees}
          department={selectedDepartment}
          designation={selectedDesignation}
        />
      </Modal>
    </>
  );
};

export default Report;
