const SectionTitle = ({
  title,
  subtitle,
  className = "",
}) => {
  return (
    <div className={`mb-12 text-center ${className}`}>
      <h2 className="text-3xl font-extrabold text-gray-900 md:text-4xl">
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