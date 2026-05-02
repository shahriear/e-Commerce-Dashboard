const PagePlaceholder = ({ title, description }) => {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="bg-white rounded-lg p-6 md:p-8 lg:p-12 shadow-sm border border-gray-200 flex flex-col items-center justify-center min-h-96">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
          {title}
        </h1>
        <p className="text-gray-500 text-base md:text-lg text-center">
          {description}
        </p>
      </div>
    </div>
  );
};

export default PagePlaceholder;
