import PropTypes from "prop-types";
import { RiErrorWarningFill, RiCloseCircleFill } from "react-icons/ri";

const Alert = ({ subject, body, closer }) => {
  const handleClose = () => {
    closer((e) => !e);
  };

  return (
    <div
      className="w-fit bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative flex align-middle gap-x-1 text-xs"
      role="alert"
    >
      <span>
        <RiErrorWarningFill className="fill-current h-5 w-5 text-red-700" />
      </span>
      <strong className="font-bold ms-2">{subject}</strong>
      <span className="block sm:inline">{` ${body}`}</span>
      <span
        className="absolute top-0 bottom-0 right-0 px-4 py-3 text-red-700 hover:scale-110 cursor-pointer hover:text-red-800"
        onClick={handleClose}
      >
        <RiCloseCircleFill className="fill-current h-5 w-5" />
      </span>
    </div>
  );
};

Alert.propTypes = {
  subject: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  closer: PropTypes.func.isRequired,
};

export default Alert;
