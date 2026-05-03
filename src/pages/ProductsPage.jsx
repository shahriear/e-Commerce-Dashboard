import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, ChevronDown, MoreVertical } from 'lucide-react';
import { productsData } from '../data/products';

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(productsData);

  const [statusFilter, setStatusFilter] = useState('All Status');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [searchTerm, setSearchTerm] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);

  const filteredProducts = products.filter(product => {
    const matchStatus =
      statusFilter === 'All Status' || product.status === statusFilter;
    const matchCategory =
      categoryFilter === 'All Categories' ||
      product.category === categoryFilter;
    const matchSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchCategory && matchSearch;
  });

  const isEmpty = filteredProducts.length === 0 && products.length === 0;

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
      setOpenMenuId(null);
    }
  };

  const handleView = (id, e) => {
    e.stopPropagation();
    navigate(`/products/${id}`);
    setOpenMenuId(null);
  };

  const handleEdit = (id, e) => {
    e.stopPropagation();
    navigate(`/edit-product/${id}`);
    setOpenMenuId(null);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Products
          </h1>
          <p className="text-sm md:text-base text-gray-500 mt-1">
            Manage your product catalog
          </p>
        </div>
        <button
          onClick={() => navigate('/add-product')}
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 md:py-2.5 rounded-lg font-medium transition-colors text-sm md:text-base w-full sm:w-auto"
        >
          <Plus size={20} />
          <span>Add Product</span>
        </button>
      </div>

      {isEmpty ? (
        // Empty State
        <div className="bg-white rounded-lg p-8 md:p-12 shadow-sm border border-gray-200 flex flex-col items-center justify-center min-h-96">
          <div className="text-5xl md:text-6xl mb-4">📦</div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 text-center">
            No Products Yet
          </h2>
          <p className="text-gray-500 text-center mb-6 text-sm md:text-base">
            Get started by adding your first product to the catalog
          </p>
          <button
            onClick={() => navigate('/add-product')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 md:py-2.5 rounded-lg font-medium transition-colors text-sm md:text-base"
          >
            Add Your First Product
          </button>
        </div>
      ) : (
        <>
          {/* Filters and Search */}
          <div className="mb-6 space-y-3">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-[16px] focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filters Row - Stack on mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
              {/* Status Filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white cursor-pointer"
                >
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Draft</option>
                </select>
              </div>

              {/* Category Filter */}
              <div className="relative">
                <select
                  value={categoryFilter}
                  onChange={e => setCategoryFilter(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white cursor-pointer"
                >
                  <option>All Categories</option>
                  <option>Electronics</option>
                  <option>Accessories</option>
                  <option>Clothing</option>
                </select>
              </div>

              {/* More Filters */}
              <button className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700 flex items-center justify-center gap-2 text-sm">
                More Filters
                <ChevronDown size={16} />
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
              >
                {/* Product Image */}
                <div
                  className="bg-gradient-to-br from-yellow-100 to-yellow-50 aspect-square flex items-center justify-center text-4xl sm:text-5xl group-hover:scale-105 transition-transform relative cursor-pointer"
                  onClick={() => navigate(`/products/${product.id}`)}
                >
                  {product.image}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="relative">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setOpenMenuId(
                            openMenuId === product.id ? null : product.id,
                          );
                        }}
                        className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 flex items-center justify-center"
                      >
                        <MoreVertical size={18} className="text-gray-700" />
                      </button>
                      {openMenuId === product.id && (
                        <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                          <button
                            onClick={e => handleView(product.id, e)}
                            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100 first:rounded-t-lg transition-colors"
                          >
                            View
                          </button>
                          <button
                            onClick={e => handleEdit(product.id, e)}
                            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={e => handleDelete(product.id, e)}
                            className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 last:rounded-b-lg transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3 truncate">
                    {product.category}
                  </p>

                  <div className="flex items-center justify-between mb-3 gap-2">
                    <span className="text-lg font-bold text-gray-900">
                      {product.price}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded whitespace-nowrap ${
                        product.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : product.status === 'Inactive'
                            ? 'bg-gray-100 text-gray-700'
                            : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {product.status}
                    </span>
                  </div>

                  <p className="text-xs text-gray-600">
                    Stock: {product.stock}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && products.length > 0 && (
            <div className="bg-white rounded-lg p-8 md:p-12 shadow-sm border border-gray-200 flex flex-col items-center justify-center">
              <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2 text-center">
                No Products Found
              </h2>
              <p className="text-gray-500 mb-6 text-sm md:text-base text-center">
                Try adjusting your filters
              </p>
              <button
                onClick={() => navigate('/add-product')}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors text-sm md:text-base"
              >
                <Plus size={20} />
                Add Product
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsPage;
