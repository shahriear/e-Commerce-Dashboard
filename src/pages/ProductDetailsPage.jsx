import { useState, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Trash2, Plus } from 'lucide-react';
import { productsData } from '../data/products';

const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const product = useMemo(() => {
    return productsData.find(p => p.id === parseInt(id)) || productsData[0];
  }, [id]);

  const [showAddVariant, setShowAddVariant] = useState(true);
  const [newVariant, setNewVariant] = useState({
    color: '',
    size: '',
    stock: '',
    price: '',
  });

  const handleAddVariant = () => {
    if (
      newVariant.color &&
      newVariant.size &&
      newVariant.stock &&
      newVariant.price
    ) {
      alert('Variant added successfully!');
      setNewVariant({ color: '', size: '', stock: '', price: '' });
      setShowAddVariant(false);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
        <button
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <ChevronLeft size={20} />
          Back
        </button>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex-1">
          {product.name}
        </h1>
        <button
          onClick={() => navigate(`/edit-product/${product.id}`)}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 md:py-2 rounded-lg font-medium transition-colors"
        >
          ✏️ Edit
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {/* Left Column - Images & Info */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {/* Product Images */}
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">
              Product Images
            </h2>

            {/* Main Image */}
            <div className="bg-yellow-100 rounded-lg p-4 md:p-6 lg:p-8 flex items-center justify-center text-7xl mb-3 md:mb-4">
              {product.image}
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-2 md:gap-3">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className="w-20 h-20 bg-yellow-100 rounded-lg flex items-center justify-center text-4xl cursor-pointer hover:ring-2 hover:ring-blue-500"
                >
                  {img}
                </div>
              ))}
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Title</p>
                <p className="font-semibold text-gray-900">{product.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Category</p>
                <p className="font-semibold text-gray-900">
                  {product.category}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Price</p>
                <p className="font-semibold text-gray-900">{product.price}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded">
                  {product.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Stock</p>
                <p className="font-semibold text-gray-900">
                  {product.stock} units
                </p>
              </div>
            </div>

            <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Description</p>
              <p className="text-gray-700">{product.description}</p>
            </div>
          </div>

          {/* Product Variants */}
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 md:gap-4 mb-4 md:mb-6">
              <h2 className="text-base md:text-lg font-bold text-gray-900">
                Product Variants
              </h2>
              <button
                onClick={() => setShowAddVariant(!showAddVariant)}
                className="w-full sm:w-auto flex items-center justify-center sm:justify-start gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors"
              >
                <Plus size={16} />
                Add Variant
              </button>
            </div>

            {/* Add Variant Form */}
            {showAddVariant && (
              <div className="mb-4 md:mb-6 p-3 md:p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-3 md:mb-4">
                  <input
                    type="text"
                    placeholder="Color (e.g., Black)"
                    value={newVariant.color}
                    onChange={e =>
                      setNewVariant({ ...newVariant, color: e.target.value })
                    }
                    className="px-3 md:px-4 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Size (e.g., M)"
                    value={newVariant.size}
                    onChange={e =>
                      setNewVariant({ ...newVariant, size: e.target.value })
                    }
                    className="px-3 md:px-4 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={newVariant.stock}
                    onChange={e =>
                      setNewVariant({ ...newVariant, stock: e.target.value })
                    }
                    className="px-3 md:px-4 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Price"
                    value={newVariant.price}
                    onChange={e =>
                      setNewVariant({ ...newVariant, price: e.target.value })
                    }
                    className="px-3 md:px-4 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                  <button
                    onClick={handleAddVariant}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 md:py-2 rounded text-sm font-medium transition-colors"
                  >
                    Add Variant
                  </button>
                  <button
                    onClick={() => setShowAddVariant(false)}
                    className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2.5 md:py-2 rounded text-sm font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Variants Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Color
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Size
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Stock
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Price
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {product.variants.map(variant => (
                    <tr
                      key={variant.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded ${
                              variant.color === 'Black'
                                ? 'bg-black'
                                : 'bg-white border border-gray-300'
                            }`}
                          ></div>
                          {variant.color}
                        </div>
                      </td>
                      <td className="py-3 px-4">{variant.size}</td>
                      <td className="py-3 px-4">{variant.stock}</td>
                      <td className="py-3 px-4 font-semibold text-gray-900">
                        {variant.price}
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                          {variant.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-red-600 hover:text-red-700 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Performance & Activity */}
        <div className="space-y-4 md:space-y-6">
          {/* Performance */}
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">
              Performance
            </h2>

            <div className="space-y-3 md:space-y-4">
              <div>
                <p className="text-sm text-gray-600">Total Sales</p>
                <p className="text-2xl font-bold text-gray-900">
                  {product.performance.totalSales}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  {product.performance.revenue}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Rating</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {product.performance.rating}
                  </span>
                  <span className="text-yellow-400">⭐</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Reviews</p>
                <p className="text-lg font-bold text-gray-900">
                  {product.performance.reviews}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">
              Recent Activity
            </h2>

            <div className="space-y-2 md:space-y-3">
              {product.recentActivity.map(activity => (
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
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
