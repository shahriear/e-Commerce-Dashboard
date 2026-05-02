import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Trash2 } from 'lucide-react';
import { categoriesData } from '../data/categories';

const CategoryDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const category = useMemo(() => {
    return categoriesData.find(c => c.id === parseInt(id)) || categoriesData[0];
  }, [id]);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
        <button
          onClick={() => navigate('/categories')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <ChevronLeft size={20} />
          Back
        </button>
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {category.name}
          </h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">
            Category details and management
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
          <button
            onClick={() => navigate(`/edit-category/${category.id}`)}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 md:py-2 rounded-lg font-medium transition-colors"
          >
            ✏️ Edit
          </button>
          <button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 md:py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
            <Trash2 size={18} />
            Delete
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {/* Category Information */}
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4 md:mb-6">
              Category Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Name</p>
                <p className="font-semibold text-gray-900">{category.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Created Date</p>
                <p className="font-semibold text-gray-900">
                  {category.createdDate}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <span
                  className={`inline-block text-xs font-semibold px-3 py-1 rounded ${
                    category.status === 'Active'
                      ? 'bg-green-100 text-green-700'
                      : category.status === 'Inactive'
                        ? 'bg-gray-100 text-gray-700'
                        : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {category.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Products</p>
                <p className="font-semibold text-gray-900">
                  {category.totalProducts}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Average Rating</p>
                <p className="font-semibold text-gray-900">
                  {category.avgRating > 0 ? `${category.avgRating}/5` : 'N/A'}
                </p>
              </div>
            </div>

            <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Description</p>
              <p className="text-gray-700">{category.description}</p>
            </div>
          </div>

          {/* Products in Category */}
          {category.products && category.products.length > 0 && (
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4 mb-4 md:mb-6">
                <h2 className="text-lg font-bold text-gray-900">
                  Products in Category
                </h2>
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View all
                </a>
              </div>

              <div className="space-y-3 md:space-y-4">
                {category.products.map(product => (
                  <div
                    key={product.id}
                    className="flex items-center gap-3 md:gap-4 p-3 md:p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    <div className="text-4xl">{product.image}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Price: {product.price} • Stock: {product.stock} • Sold:{' '}
                        {product.sold}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        {product.rating}
                        <span className="text-yellow-400 ml-1">⭐</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-4 md:space-y-6">
          {/* Category Image */}
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">
              Category Image
            </h2>
            <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg p-4 md:p-6 lg:p-8 flex items-center justify-center text-7xl h-48">
              {category.image}
            </div>
          </div>

          {/* Performance */}
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">
              Performance
            </h2>

            <div className="space-y-3 md:space-y-4">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">
                  {category.totalProducts}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  {category.totalRevenue}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Avg Rating</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {category.avgRating > 0 ? category.avgRating : 'N/A'}
                  </span>
                  {category.avgRating > 0 && (
                    <span className="text-yellow-400">⭐</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          {category.recentActivity && category.recentActivity.length > 0 && (
            <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
              <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">
                Recent Activity
              </h2>

              <div className="space-y-2 md:space-y-3">
                {category.recentActivity.map(activity => (
                  <div
                    key={activity.id}
                    className="pb-3 border-b border-gray-100 last:border-0 last:pb-0"
                  >
                    <p className="text-sm font-medium text-gray-900">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">
                      by {activity.user} • {activity.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryDetailsPage;
