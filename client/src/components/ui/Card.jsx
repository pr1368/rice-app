const Card = ({
  children,
  className = "",
  hover = true,
  padding = true,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-3xl
        overflow-hidden
        border
        border-gray-100
        bg-white
        shadow-sm
        transition-all
        duration-500
        ${
          hover
            ? "hover:-translate-y-2 hover:shadow-2xl"
            : ""
        }
        ${padding ? "p-6" : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;