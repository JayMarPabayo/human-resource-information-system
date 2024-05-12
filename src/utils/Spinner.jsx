import { ImSpinner9 } from "react-icons/im";

const Spinner = () => {
  return (
    <div className="absolute top-1/2 left-1/2 flex flex-col gap-3 justify-center align-middle -translate-x-1/2 -translate-y-1/2">
      <ImSpinner9 className="animate-spin w-full" />
      <small className="text-sm text-gray-600">Loading...</small>
    </div>
  );
};

export default Spinner;
