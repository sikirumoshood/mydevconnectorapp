import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

function SelectListGroup({
  name,
  value,
  error,
  info,
  onChange,
  options,
  placeholder
}) {
  return (
    <div className="form-group">
      <select
        placeholder={placeholder}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {options.map(option => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {info && <div className="form-text text-muted">{info}</div>}
      {error && <small style={{ color: "red" }}>{error}</small>}
    </div>
  );
}

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string
};

export default SelectListGroup;
