const Badge = ({
  children,
  className = "",
}) => {
  return (
    <span
      className={`inline-flex rounded-full bg-green-100 px-4 py-1 text-sm font-medium text-green-700 ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;