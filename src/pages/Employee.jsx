import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "../services/apiEmployees";
import { useState } from "react";

import { FcPlus } from "react-icons/fc";

import { useDeleteEmployee } from "../features/employees/useDeleteEmployee";

import Searchbar from "../utils/Searchbar";
import Spinner from "../utils/Spinner";
import CreateFrom from "../features/employees/CreateForm";
import Modal from "../utils/Modal";
import TableRow from "../features/employees/TableRow";

const Employee = () => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openCreateFormModal, setOpenCreateFormModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [searchKey, setSearchKey] = useState("");

  const { isDeleting, deleteEmployee } = useDeleteEmployee();

  const { isLoading, data } = useQuery({
    queryKey: ["employees"],
    queryFn: () => getEmployees(),
  });

  let filteredData = searchKey
    ? data?.filter((employee) => {
        const fullName =
          `${employee.employeeFirstName} ${employee.employeeLastName} ${employee.employeeMiddleName} ${employee.employeeDesignation} ${employee.departments.departmentName}`.toLowerCase();
        return fullName.includes(searchKey.toLowerCase());
      })
    : data;

  return (
    <>
      <section className="flex justify-between items-center">
        <Searchbar
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button
          type="button"
          title="Add New Employee"
          className=" flex items-center justify-center gap-x-2 text-slate-700 border border-slate-600 border-opacity-20 shadow-md w-fit bg-slate-300 py-1 px-4 rounded-md hover:bg-slate-200 hover:scale-110 transition-all duration-300 active:scale-95"
          onClick={() => setOpenCreateFormModal(true)}
        >
          <FcPlus className="text-lg" />
          <span className="text-xs font-medium">Add Employee</span>
        </button>
      </section>

      <div className="inline-block min-w-full py-2">
        <div className="overflow-hidden">
          <table className="w-full border border-slate-600 border-opacity-10 shadow-sm text-xs">
            <thead className="text-left">
              <tr className="bg-slate-300 text-slate-600 py-2">
                <th className="py-2 px-2">ID</th>
                <th colSpan={2} className="py-2 px-1">
                  <span>Name</span>
                  <span className="ms-2 text-xs italic text-gray-500 font-normal">
                    Last Name, First Name, M.I.
                  </span>
                </th>
                <th className="py-2 px-1">Department</th>
                <th className="py-2 px-1">Designation</th>
                <th className="py-2 px-1">Contact Details</th>
                <th className="py-2 px-1 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredData?.map((employee, index) => (
                <TableRow
                  key={index}
                  employee={employee}
                  index={index}
                  setOpenConfirmModal={setOpenConfirmModal}
                  setSelectedEmployee={setSelectedEmployee}
                  openUpdateFormModal={() =>
                    setOpenCreateFormModal((bol) => !bol)
                  }
                />
              ))}
            </tbody>
          </table>
          {isLoading && <Spinner />}
          <Modal open={openConfirmModal} size="w-1/3">
            <h6 className="text-xl font-semibold text-slate-800">
              Are you sure you want to delete this record?
            </h6>
            <p className="text-slate-500 mt-4 text-sm">
              Deleting this data is permanent and cannot be undone. All related
              files, information, and progress will be lost. Please ensure you
              have backed up any important content before proceeding. Do you
              still wish to continue?
            </p>
            <section className="flex gap-x-4 items-center justify-end px-3 mt-5">
              <button
                type="button"
                title="Cancel"
                className="text-sm font-semibold w-40 text-slate-700 border border-opacity-10 border-slate-600 bg-slate-100 p-2 rounded-md hover:bg-slate-200 hover:text-slate-900 hover:scale-110 transition-all duration-300"
                onClick={() => setOpenConfirmModal(false)}
              >
                <span>Cancel</span>
              </button>
              <button
                type="button"
                title="Delete"
                className="text-sm font-semibold w-40 text-white bg-slate-700 p-2 rounded-md hover:bg-slate-600 hover:scale-110 transition-all duration-300"
                onClick={() => {
                  if (!selectedEmployee) return;
                  deleteEmployee(selectedEmployee, {
                    onSuccess: () => {
                      setSelectedEmployee(null);
                      setOpenConfirmModal(false);
                    },
                  });
                }}
                disabled={isDeleting}
              >
                <span>Delete</span>
              </button>
            </section>
          </Modal>
        </div>
      </div>
      <Modal open={openCreateFormModal} size="w-[78rem]">
        <CreateFrom onClose={() => setOpenCreateFormModal(false)} />
      </Modal>
    </>
  );
};

export default Employee;
