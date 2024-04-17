import Searchbar from "../utils/Searchbar";

const Employee = () => {
  return (
    <section className="flex justify-between items-center">
      <Searchbar />
      <button
        type="button"
        className="text-white bg-slate-800 text-xs py-2 px-5 rounded-md font-semibold hover:bg-slate-600 hover:scale-110 transition-all duration-300"
      >
        Add New
      </button>
    </section>
  );
};

export default Employee;
