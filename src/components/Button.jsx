function Button({ text, onClick, type = "primary", disabled = false, className = "" }) {
    const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all duration-200";
    const typeStyles = {
      primary: "bg-blue-600 hover:bg-blue-700 text-white",
      secondary: "bg-gray-500 hover:bg-gray-600 text-white",
      success: "bg-green-600 hover:bg-green-700 text-white",
      danger: "bg-red-600 hover:bg-red-700 text-white",
      outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
    };
  
    return (
      <button 
        onClick={onClick}
        disabled={disabled}
        className={`${baseStyles} ${typeStyles[type]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      >
        {text}
      </button>
    );
  }
  
  export default Button;
