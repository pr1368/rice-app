const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  fullWidth = false,
  disabled = false,
  className = "",
  ...props
}) => {
  const variants = {
    primary: "bg-green-700 text-white hover:bg-green-800",
    outline:
      "border border-green-700 text-green-700 hover:bg-green-700 hover:text-white",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center gap-2
        rounded-xl
        font-medium
        transition-all
        duration-300
        disabled:cursor-not-allowed
        disabled:opacity-60
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
      {...props}
    >
      {icon && iconPosition === "right" && icon}

      <span>{children}</span>

      {icon && iconPosition === "left" && icon}
    </button>
  );
};

export default Button;