import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';
import { ordersData } from '../data/orders';

const OrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState(ordersData);
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(order => {
    const matchStatus =
      statusFilter === 'All Status' || order.status === statusFilter;
    const matchSearch =
      order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const getStatusColor = status => {
    switch (status) {
      case 'Processing':
        return 'bg-blue-100 text-blue-700';
      case 'Shipped':
        return 'bg-purple-100 text-purple-700';
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-500 mt-1">
          Manage customer orders and track fulfillment
        </p>
      </div>

      {/* Filters and Search */}
      <div className="mb-6 md:mb-8 space-y-3 md:space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:gap-4">
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search orders by ID, customer name or email..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative flex-1 sm:flex-none">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white cursor-pointer"
            >
              <option>All Status</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
          </div>

          {/* More Filters */}
          <button className="w-full sm:w-auto px-4 py-2.5 md:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700 flex items-center justify-center sm:justify-start gap-2">
            More Filters
            <ChevronDown size={18} />
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-3 md:space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-lg p-6 md:p-12 shadow-sm border border-gray-200 flex flex-col items-center justify-center">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
              No Orders Found
            </h2>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div
              key={order.id}
              className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                    📋
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {order.orderId}
                      </h3>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(
                          order.status,
                        )}`}
                      >
                        {order.status}
                      </span>
                      <span className="text-xs font-semibold px-2 py-1 rounded bg-green-100 text-green-700">
                        {order.paymentStatus}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {order.customerName} • {order.email}
                    </p>
                    <p className="text-xs text-gray-500">
                      Created: {order.createdDate} • {order.itemCount} items •{' '}
                      {order.location}
                    </p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="text-xl font-bold text-gray-900">
                    {order.orderTotal}
                  </p>
                  <p className="text-xs text-gray-500">
                    {order.itemCount} items
                  </p>
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="mb-4 pb-4 border-t border-gray-200 pt-4">
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  Order Items:
                </p>
                <div className="space-y-1">
                  {order.items.map((item, idx) => (
                    <p key={idx} className="text-sm text-gray-600">
                      {item.name} × {item.quantity}
                      <span className="float-right text-gray-900 font-medium">
                        {item.totalPrice}
                      </span>
                    </p>
                  ))}
                </div>
              </div>

              {/* View Details Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => navigate(`/orders/${order.id}`)}
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 md:py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  👁️ View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
