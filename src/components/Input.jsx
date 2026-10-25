function Input({ 
    label, 
    type = "text", 
    value, 
    onChange, 
    error, 
    placeholder,
    required = false 
  }) {
    return (
      <div className="mb-4">
        {label && (
          <label className="block text-gray-700 dark:text-slate-300 font-medium mb-2">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
        )}
        <input 
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition bg-white dark:bg-slate-700 dark:text-white dark:placeholder-slate-400 ${
            error 
              ? 'border-red-500 focus:ring-red-500' 
              : 'border-gray-300 dark:border-slate-600 focus:ring-blue-500'
          }`}
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
  
  export default Input;
