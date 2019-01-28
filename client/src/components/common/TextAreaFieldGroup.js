import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

function TextAreaFieldGroup({
  name,
  placeholder,
  value,
  error,
  info,
  onChange
}) {
  return (
    <div className="form-group">
      <textarea
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <div className="form-text text-muted">{info}</div>}
      {error && <small style={{ color: "red" }}>{error}</small>}
    </div>
  );
}

TextAreaFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  info: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextAreaFieldGroup;
