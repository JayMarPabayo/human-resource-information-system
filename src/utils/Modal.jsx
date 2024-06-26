import PropTypes from "prop-types";
import { createPortal } from "react-dom";

const Modal = ({ open, children, size }) => {
  return createPortal(
    <div
      className={`fixed inset-0 flex justify-center items-center transition-all duration-300 ${
        open ? "visible bg-black/50" : "invisible"
      }`}
    >
      {open && (
        <div
          className={`${size} bg-white rounded-xl shadow p-6 transition-all${
            open ? "scale-100 opacity-100" : "scale-125 opacity-0"
          }`}
        >
          {children}
        </div>
      )}
    </div>,
    document.body
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node,
  size: PropTypes.string,
};

export default Modal;
