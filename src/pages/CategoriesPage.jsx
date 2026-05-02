import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, ChevronDown, MoreVertical } from 'lucide-react';
import { categoriesData } from '../data/categories';

const CategoriesPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(categoriesData);
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [searchTerm, setSearchTerm] = useState('');
  const [openMenuId, setOpenMenuId] = useState(null);

  const filteredCategories = categories.filter(category => {
    const matchStatus =
      statusFilter === 'All Status' || category.status === statusFilter;
    const matchSearch =
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const isEmpty = filteredCategories.length === 0 && categories.length === 0;

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(category => category.id !== id));
      setOpenMenuId(null);
    }
  };

  const handleView = (id, e) => {
    e.stopPropagation();
    navigate(`/categories/${id}`);
    setOpenMenuId(null);
  };

  const handleEdit = (id, e) => {
    e.stopPropagation();
    navigate(`/edit-category/${id}`);
    setOpenMenuId(null);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500 mt-1">Manage your product categories</p>
        </div>
        <button
          onClick={() => navigate('/add-category')}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      {isEmpty ? (
        // Empty State
        <div className="bg-white rounded-lg p-12 shadow-sm border border-gray-200 flex flex-col items-center justify-center min-h-96">
          <div className="text-6xl mb-4">📂</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            No Categories Yet
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Get started by adding your first category to organize your products
          </p>
          <button
            onClick={() => navigate('/add-category')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
          >
            Add Your First Category
          </button>
        </div>
      ) : (
        <>
          {/* Filters and Search */}
          <div className="mb-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white cursor-pointer"
                >
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                  <option>Draft</option>
                </select>
              </div>

              {/* More Filters */}
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700 flex items-center gap-2">
                More Filters
                <ChevronDown size={18} />
              </button>
            </div>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {filteredCategories.map(category => (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group"
              >
                {/* Category Image */}
                <div
                  className="bg-gradient-to-br from-blue-100 to-blue-50 aspect-video flex items-center justify-center text-6xl group-hover:scale-105 transition-transform relative cursor-pointer"
                  onClick={() => navigate(`/categories/${category.id}`)}
                >
                  {category.image}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="relative">
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          setOpenMenuId(
                            openMenuId === category.id ? null : category.id,
                          );
                        }}
                        className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 flex items-center justify-center"
                      >
                        <MoreVertical size={20} className="text-gray-700" />
                      </button>
                      {openMenuId === category.id && (
                        <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                          <button
                            onClick={e => handleView(category.id, e)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100 first:rounded-t-lg"
                          >
                            View
                          </button>
                          <button
                            onClick={e => handleEdit(category.id, e)}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-100"
                          >
                            Edit
                          </button>
                          <button
                            onClick={e => handleDelete(category.id, e)}
                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 last:rounded-b-lg"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Category Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                    {category.description}
                  </p>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Products</p>
                      <p className="text-lg font-bold text-gray-900">
                        {category.totalProducts}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${
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

                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-600">
                      Revenue: {category.totalRevenue}
                    </p>
                    <p className="text-xs text-gray-600">
                      Rating:{' '}
                      {category.avgRating > 0
                        ? `${category.avgRating}/5`
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCategories.length === 0 && categories.length > 0 && (
            <div className="bg-white rounded-lg p-12 shadow-sm border border-gray-200 flex flex-col items-center justify-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                No Categories Found
              </h2>
              <p className="text-gray-500 mb-6">Try adjusting your filters</p>
              <button
                onClick={() => navigate('/add-category')}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                <Plus size={20} />
                Add Your First Category
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CategoriesPage;
