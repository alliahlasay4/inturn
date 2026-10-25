function Card({ title, children, className = "" }) {
    return (
      <div className={`bg-white dark:bg-slate-800 rounded-lg shadow-md p-6 ${className}`}>
        {title && <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{title}</h3>}
        {children}
      </div>
    );
  }
  
  export default Card;
