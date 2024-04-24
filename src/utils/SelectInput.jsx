import PropTypes from "prop-types";
import React from "react";

const SelectInput = React.forwardRef(
  ({ textSize, width, label, options, errorState, ...props }, ref) => {
    return (
      <div
        className={`relative flex flex-col gap-y-1 ${width ? width : "w-full"}`}
      >
        <label className="text-xs font-semibold tracking-wider text-gray-700 ms-1">
          {label}
        </label>
        <select
          className={`w-full py-[0.4rem] px-3 ${textSize} text-gray-800 font-medium tracking-widest border-2 rounded-lg ${
            errorState ? "border-red-700" : " border-blue-300"
          } border-opacity-50 outline-none focus:border-blue-500 transition duration-200`}
          ref={ref}
          {...props}
        >
          {options?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

SelectInput.propTypes = {
  textSize: PropTypes.string,
  width: PropTypes.string,
  label: PropTypes.string,
  errorState: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    })
  ),
};

SelectInput.displayName = "SelectInput";

export default SelectInput;
