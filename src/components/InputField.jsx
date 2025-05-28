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
}) {
  return (
    <div>
      <input
        type={type}
        id={id}
        name={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={required}
        className={`shadow-sm border-2 border-gray-50 pl-2 w-full rounded-sm ml-1 mt-1  py-2 ${className}`}
        onChange={onChange}
      />
    </div>
  );
}

export default InputField;
