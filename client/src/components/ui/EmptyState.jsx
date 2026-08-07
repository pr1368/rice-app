import { FaBoxOpen } from "react-icons/fa";

const EmptyState = ({
  title = "موردی یافت نشد",
  description = "",
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 px-6 py-16 text-center">
      <FaBoxOpen className="mb-5 text-6xl text-gray-400" />

      <h2 className="text-2xl font-bold text-gray-800">
        {title}
      </h2>

      {description && (
        <p className="mt-3 max-w-md text-gray-500">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;