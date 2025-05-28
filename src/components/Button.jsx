function Button({ children, type = "submit", className = "", onClick }) {
  return (
    <div className="w-full">
      <button
        type={type}
        className={`border-2 rounded-sm bg-blue-500 text-white w-full text-lg font-medium py-2 ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
