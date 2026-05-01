const PagePlaceholder = ({ title, description }) => {
  return (
    <div className="p-8">
      <div className="bg-white rounded-lg p-12 shadow-sm border border-gray-200 flex flex-col items-center justify-center min-h-96">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-500 text-lg">{description}</p>
      </div>
    </div>
  );
};

export default PagePlaceholder;
