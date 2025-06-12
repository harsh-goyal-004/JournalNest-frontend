function Button({
  children,
  type = "submit",
  className = "",
  onClick,
  disabled = false,
}) {
  return (
    <div className="w-full">
      <button
        disabled={disabled}
        type={type}
        className={`border-2 rounded-sm bg-blue-500 hover:bg-blue-400 text-white text-lg font-medium py-2 ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
