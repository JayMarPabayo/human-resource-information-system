import { useState } from "react";

import { FaTrash, FaPen } from "react-icons/fa6";

import PropTypes from "prop-types";
import Modal from "../../utils/Modal";
import CreateUpdateForm from "./CreateUpdateForm";

const TableRow = ({
  department,
  setOpenConfirmModal,
  setSelectedDeparment,
}) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  return (
    <>
      <li className="w-full flex items-center tracking-widest shadow-md">
        <span className="bg-emerald-800 px-2 py-3 font-medium"></span>
        <div className=" bg-slate-50 w-full ps-3 py-1 flex items-center justify-between">
          <h6 className="text-xs text-slate-600 font-medium">
            {department.departmentName}
          </h6>
          <div className="flex items-center px-2 gap-x-3 text-green-800">
            <button
              onClick={() => {
                setShowUpdateModal(true);
              }}
            >
              <FaPen className="cursor-pointer hover:scale-125 active:scale-95 hover:text-green-700 transition-all duration-300" />
            </button>
            <button
              onClick={() => {
                setSelectedDeparment(department.id);
                setOpenConfirmModal(true);
              }}
            >
              <FaTrash className="cursor-pointer hover:scale-125 active:scale-95 hover:text-green-700 transition-all duration-300" />
            </button>
          </div>
        </div>
      </li>
      <Modal open={showUpdateModal} size="w-1/3">
        <CreateUpdateForm
          onClose={setShowUpdateModal}
          deparmentData={department}
        />
      </Modal>
    </>
  );
};

TableRow.propTypes = {
  department: PropTypes.object.isRequired,
  setOpenConfirmModal: PropTypes.func,
  setSelectedDeparment: PropTypes.func,
};

export default TableRow;
