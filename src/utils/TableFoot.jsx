import {
  MdFirstPage,
  MdLastPage,
  MdNavigateNext,
  MdNavigateBefore,
} from "react-icons/md";

import PropTypes from "prop-types";

const TableFoot = ({ limit, setLimit, page, setPage, totalRows }) => {
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(startItem + limit - 1, totalRows);

  const lastPage = Math.ceil(totalRows / limit);

  const handleNextPage = () => {
    if (page < lastPage) {
      setPage((page) => page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleFirstPage = () => {
    setPage(1);
  };

  const handleLastPage = () => {
    setPage(lastPage);
  };

  return (
    <div className="mt-2 bg-slate-300 text-slate-600 p-2 border border-slate-600 border-opacity-10 text-xs font-bold flex gap-2">
      <span>Rows per page</span>
      <select
        value={limit}
        onChange={(event) => {
          setLimit(Number(event.target.value));
        }}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={15}>15</option>
      </select>
      <span className="w-28 text-center font-medium tracking-wider">
        <span className="font-bold text-teal-700">{startItem}</span>-
        <span className="font-bold text-teal-700">{endItem}</span> of{" "}
        <span className="font-bold">{totalRows}</span>
      </span>

      <button
        disabled={page === 1}
        onClick={handleFirstPage}
        className={`text-xl text-slate-400 duration-300 ${
          page !== 1 &&
          "text-slate-600 hover:scale-125 hover:drop-shadow-lg active:scale-95"
        }`}
      >
        <MdFirstPage />
      </button>
      <button
        disabled={page === 1}
        onClick={handlePrevPage}
        className={`text-xl text-slate-400 duration-300 ${
          page !== 1 &&
          "text-slate-600 hover:scale-125 hover:drop-shadow-lg active:scale-95"
        }`}
      >
        <MdNavigateBefore />
      </button>
      <button
        disabled={page === lastPage}
        onClick={handleNextPage}
        className={`text-xl text-slate-400 duration-300 ${
          page !== lastPage &&
          "text-slate-600 hover:scale-125 hover:drop-shadow-lg active:scale-95"
        }`}
      >
        <MdNavigateNext />
      </button>
      <button
        disabled={page === lastPage}
        onClick={handleLastPage}
        className={`text-xl text-slate-400 duration-300 ${
          page !== lastPage &&
          "text-slate-600 hover:scale-125 hover:drop-shadow-lg active:scale-95"
        }`}
      >
        <MdLastPage />
      </button>
    </div>
  );
};

TableFoot.propTypes = {
  limit: PropTypes.number,
  setLimit: PropTypes.func,
  page: PropTypes.number,
  setPage: PropTypes.func,
  totalRows: PropTypes.number,
};

export default TableFoot;
