import PropTypes from "prop-types";
const Modal = ({ open, children, size }) => {
  return (
    <div
      className={`fixed inset-0 flex justify-center items-center transition-all duration-300 ${
        open ? "visible bg-black/20" : "invisible"
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${size} bg-white rounded-xl shadow p-6 transition-all ${
          open ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  children: PropTypes.node,
  size: PropTypes.string,
};

export default Modal;
