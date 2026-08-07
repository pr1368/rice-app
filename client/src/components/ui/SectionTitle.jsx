const SectionTitle = ({
  title,
  subtitle,
}) => {
  return (
    <div className="mb-14 text-center">

      <span className="text-green-700 font-semibold">
        Rice Shop
      </span>

      <h2 className="mt-2 text-4xl font-black text-gray-900">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-4 text-gray-500">
          {subtitle}
        </p>
      )}

    </div>
  );
};

export default SectionTitle;