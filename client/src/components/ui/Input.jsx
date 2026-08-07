const Input = ({
  type = "text",
  placeholder,
  className = "",
  ...props
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-700 ${className}`}
      {...props}
    />
  );
};

export default Input;