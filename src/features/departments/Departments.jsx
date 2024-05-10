import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getDepartments } from "../../services/apiDepartments";
import { useDeleteDepartment } from "./useDeleteDepartment";

import { FaCirclePlus } from "react-icons/fa6";

import CreateUpdateForm from "./CreateUpdateForm";
import Spinner from "../../utils/Spinner";
import Modal from "../../utils/Modal";
import TableRow from "./TableRow";

const Departments = () => {
  const [setShowAddModal, setSetShowAddModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const { isLoading, data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: () => getDepartments(),
  });

  const { isDeleting, deleteDepartment } = useDeleteDepartment();

  return (
    <>
      <div className="w-72 h-48 text-slate-700 relative">
        <div className="flex justify-between items-center">
          <h6 className="font-medium text-base">Departments</h6>
          <button
            className="text-xl hover:text-slate-600 hover:scale-125 active:scale-95 duration-300"
            onClick={() => {
              setSetShowAddModal((bol) => !bol);
            }}
          >
            <FaCirclePlus className="text-xl" />
          </button>
        </div>
        {!isLoading && (
          <ol className="flex flex-col pt-3 text-xs gap-y-2">
            {departments?.map((department, index) => {
              return (
                <TableRow
                  key={index}
                  department={department}
                  setOpenConfirmModal={setOpenConfirmModal}
                  setSelectedDeparment={setSelectedDepartment}
                />
              );
            })}
          </ol>
        )}
        {isLoading && <Spinner />}
        <Modal open={openConfirmModal} size="w-1/3">
          <h6 className="text-xl font-semibold text-slate-800">
            Are you sure you want to delete this record?
          </h6>
          <p className="text-slate-500 mt-4 text-sm">
            Deleting this data is permanent and cannot be undone. All related
            files, information, and progress will be lost. Please ensure you
            have backed up any important content before proceeding. Do you still
            wish to continue?
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
                if (!selectedDepartment) return;
                deleteDepartment(selectedDepartment, {
                  onSuccess: () => {
                    setSelectedDepartment(null);
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
      <Modal open={setShowAddModal} size="w-1/3">
        <CreateUpdateForm onClose={setSetShowAddModal} />
      </Modal>
    </>
  );
};

export default Departments;
