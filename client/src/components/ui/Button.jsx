const Button = ({
  children,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}) => {
  const variants = {
    primary:
      "bg-green-700 text-white hover:bg-green-800",

    outline:
      "border border-green-700 text-green-700 hover:bg-green-700 hover:text-white",

    danger:
      "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      className={`rounded-xl px-6 py-3 font-medium transition duration-300 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;