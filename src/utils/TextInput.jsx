import PropTypes from "prop-types";
import React from "react";

const TextInput = React.forwardRef(
  ({ textSize, width, label, errorState, ...props }, ref) => {
    return (
      <div
        className={`relative flex flex-col gap-y-1 ${width ? width : "w-full"}`}
      >
        <label className="text-xs font-semibold tracking-wider text-gray-700 ms-1">
          {label}
        </label>
        <input
          className={`w-full py-[0.4rem] px-3 ${textSize} text-gray-800 font-medium tracking-widest border-2 rounded-lg placeholder:font-normal ${
            errorState ? "border-red-700" : " border-blue-300"
          } border-opacity-50 outline-none focus:border-blue-500 transition duration-200`}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

TextInput.propTypes = {
  textSize: PropTypes.string,
  width: PropTypes.string,
  errorState: PropTypes.string,
  label: PropTypes.string,
};

TextInput.displayName = "TextInput";

export default TextInput;
