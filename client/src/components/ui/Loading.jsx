const Loading = ({
  text = "در حال بارگذاری...",
  fullScreen = false,
}) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-green-700 border-t-transparent" />

      <p className="text-sm text-gray-600">
        {text}
      </p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        {content}
      </div>
    );
  }

  return content;
};

export default Loading;