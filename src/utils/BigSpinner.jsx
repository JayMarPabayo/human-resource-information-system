import { AiOutlineLoading } from "react-icons/ai";

const BigSpinner = () => {
  return (
    <div className="absolute top-0 left-0 h-screen w-full bg-black bg-opacity-20 z-50">
      <div className="absolute top-1/2 left-1/2 flex flex-col gap-3 justify-center align-middle -translate-x-1/2 -translate-y-1/2">
        <AiOutlineLoading className="animate-spin w-full text-base font-semibold text-white" />
        <small className="text-base font-semibold tracking-wider text-gray-100">
          Loading...
        </small>
      </div>
    </div>
  );
};

export default BigSpinner;
