import { BsFillEyeFill, BsPenFill } from "react-icons/bs";
import { FcEmptyTrash } from "react-icons/fc";

import PropTypes from "prop-types";

const TableRow = ({ index }) => {
  return (
    <tr
      key={index}
      className="w-full border-b border-neutral-300 text-slate-600 font-medium hover:bg-slate-100 whitespace-nowrap transition-all duration-300"
    >
      <td className="py-1 px-2">1001</td>
      <td className="py-1 px-2">Jay Mar B. Pabayo</td>
      <td className="py-1 px-2">Authenticated</td>
      <td className="py-1 px-2">jaymarpabayo@gmail.com</td>
      <td className="flex justify-between align-middle text-base p-1 gap-2">
        <button
          type="button"
          title="View"
          className="text-slate-700 border border-slate-600 border-opacity-20 shadow-md w-full bg-slate-300 py-1 px-2 rounded-md hover:bg-slate-200 hover:scale-110 transition-all duration-300"
          //   onClick={() => setShowViewForm((bol) => !bol)}
        >
          <BsFillEyeFill className="mx-auto text-emerald-600" />
        </button>
        <button
          type="button"
          title="Edit"
          className="text-slate-700 border border-slate-600 border-opacity-20 shadow-md w-full bg-slate-300 py-1 px-2 rounded-md hover:bg-slate-200 hover:scale-110 transition-all duration-300"
          //   onClick={() => setShowUpdateForm((bol) => !bol)}
        >
          <BsPenFill className="mx-auto text-stone-600" />
        </button>
        <button
          type="button"
          title="Delete"
          className="text-slate-700 border border-slate-600 border-opacity-20 shadow-md w-full bg-slate-300 py-1 px-2 rounded-md hover:bg-slate-200 hover:scale-110 transition-all duration-300"
          //   onClick={() => {
          //     setSelectedEmployee(employee.id);
          //     setOpenConfirmModal(true);
          //   }}
        >
          <FcEmptyTrash className="mx-auto" />
        </button>
      </td>
    </tr>
  );
};

TableRow.propTypes = {
  index: PropTypes.number,
};

export default TableRow;
