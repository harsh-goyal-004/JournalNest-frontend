import React from "react";

function InputField({
  type = "text",
  id,
  name,
  placeholder,
  autoComplete,
  required = false,
  className = "",
  onChange,
  value,
  readOnly = false,
}) {
  return (
    <div>
      <input
        type={type}
        value={value}
        id={id}
        name={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={required}
        className={`shadow-sm border-2 border-gray-50 px-2 rounded-sm  mt-1  py-2 ${className}`}
        onChange={onChange}
        readOnly={readOnly}
      />
    </div>
  );
}

export default InputField;
