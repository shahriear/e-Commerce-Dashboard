import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';
import { cartsData } from '../data/carts';

const CartsPage = () => {
  const navigate = useNavigate();
  const [carts, setCarts] = useState(cartsData);
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCarts = carts.filter(cart => {
    const matchStatus =
      statusFilter === 'All Status' || cart.status === statusFilter;
    const matchSearch =
      cart.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cart.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const stats = useMemo(() => {
    const totalCarts = carts.length;
    const activeCarts = carts.filter(c => c.status === 'Active').length;
    const abandonedCarts = carts.filter(c => c.status === 'Abandoned').length;
    const totalValue = carts.reduce((sum, cart) => {
      const value = parseInt(cart.cartValue.replace('$', ''));
      return sum + value;
    }, 0);

    return {
      totalCarts,
      activeCarts,
      abandonedCarts,
      totalValue: `$${totalValue}`,
    };
  }, [carts]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Carts</h1>
        <p className="text-gray-500 mt-1">
          Monitor customer shopping carts and abandoned carts
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by customer name or email..."
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
              <option>Abandoned</option>
              <option>Converted</option>
            </select>
          </div>

          {/* More Filters */}
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700 flex items-center gap-2">
            More Filters
            <ChevronDown size={18} />
          </button>
        </div>
      </div>

      {/* Carts List */}
      <div className="space-y-4 mb-8">
        {filteredCarts.length === 0 ? (
          <div className="bg-white rounded-lg p-12 shadow-sm border border-gray-200 flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              No Carts Found
            </h2>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        ) : (
          filteredCarts.map(cart => (
            <div
              key={cart.id}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                    👤
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {cart.customerName}
                      </h3>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${
                          cart.status === 'Active'
                            ? 'bg-blue-100 text-blue-700'
                            : cart.status === 'Abandoned'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {cart.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-1">{cart.email}</p>
                    <p className="text-xs text-gray-500">
                      Cart ID: {cart.cartId} • Created: {cart.createdDate} •
                      Updated: {cart.updatedDate}
                    </p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="text-2xl font-bold text-gray-900">
                    {cart.cartValue}
                  </p>
                  <p className="text-xs text-gray-500">
                    {cart.itemCount} items
                  </p>
                </div>
              </div>

              {/* Items Preview */}
              <div className="mb-4 pb-4 border-t border-gray-200 pt-4">
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  Items in Cart:
                </p>
                <div className="space-y-2">
                  {cart.items.map(item => (
                    <div key={item.id} className="flex items-center gap-2">
                      <span className="text-lg">{item.image}</span>
                      <span className="text-sm text-gray-600">
                        {item.name} × {item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* View Details Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => navigate(`/carts/${cart.id}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Carts</p>
              <p className="text-3xl font-bold text-gray-900">
                {stats.totalCarts}
              </p>
            </div>
            <span className="text-4xl">🛒</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Carts</p>
              <p className="text-3xl font-bold text-blue-600">
                {stats.activeCarts}
              </p>
            </div>
            <span className="text-4xl">✅</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Abandoned Carts</p>
              <p className="text-3xl font-bold text-red-600">
                {stats.abandonedCarts}
              </p>
            </div>
            <span className="text-4xl">🚫</span>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Value</p>
              <p className="text-3xl font-bold text-green-600">
                {stats.totalValue}
              </p>
            </div>
            <span className="text-4xl">💰</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartsPage;
