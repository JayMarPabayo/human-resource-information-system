import { ImSpinner9 } from "react-icons/im";

const BigSpinner = () => {
  return (
    <div className="fixed inset-0 bg-black/40 z-50">
      <div className="flex flex-col gap-3 justify-center items-center h-full">
        <ImSpinner9 className="animate-spin w-10 h-10 text-white" />
        <small className="text-base font-semibold tracking-wider text-white">
          Loading...
        </small>
      </div>
    </div>
  );
};

export default BigSpinner;
