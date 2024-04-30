import { useQuery } from "@tanstack/react-query";
import { getEmployees } from "../services/apiEmployees";
import { useState } from "react";

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
    queryKey: ["employees", searchKey],
    queryFn: () => getEmployees({ searchKey: searchKey }),
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
          className="text-white bg-slate-800 text-xs py-2 px-5 rounded-md font-semibold hover:bg-slate-600 hover:scale-105 transition-all duration-300"
          onClick={() => setOpenCreateFormModal(true)}
        >
          Add New
        </button>
      </section>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <div className="min-w-full text-left text-sm">
                <section className="grid grid-cols-9 border-b bg-slate-300 border-neutral-300 text-xs text-gray-700">
                  <div className="py-2 px-2 col-span-1">#</div>
                  <div className="py-2 col-span-2">
                    <span>Name</span>
                    <span className="ms-2 text-xs italic text-gray-500 font-normal">
                      Last Name, First Name, M.I.
                    </span>
                  </div>
                  <div className="py-2 col-span-2">Department</div>
                  <div className="py-2 col-span-1">Designation</div>
                  <div className="py-2 col-span-2">Contact Details</div>
                  <div className="py-2 text-center col-span-1">Action</div>
                </section>
                <section className="w-full text-xs font-normal tracking-wide">
                  {data?.map((employee, index) => {
                    return (
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
                    );
                  })}
                </section>
              </div>
              {isLoading && <Spinner />}
              <Modal open={openConfirmModal} size="w-1/3">
                <h6 className="text-xl font-semibold text-slate-800">
                  Are you sure you want to delete this record?
                </h6>
                <p className="text-slate-500 mt-4 text-sm">
                  Deleting this data is permanent and cannot be undone. All
                  related files, information, and progress will be lost. Please
                  ensure you have backed up any important content before
                  proceeding. Do you still wish to continue?
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
        </div>
      </div>
      <Modal open={openCreateFormModal} size="w-[78rem]">
        <CreateFrom onClose={() => setOpenCreateFormModal(false)} />
      </Modal>
    </>
  );
};

export default Employee;
