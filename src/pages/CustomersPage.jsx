import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';
import { customersData } from '../data/customers';

const CustomersPage = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState(customersData);
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(customer => {
    const matchStatus =
      statusFilter === 'All Status' || customer.status === statusFilter;
    const matchSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const getStatusColor = status => {
    switch (status) {
      case 'Active':
        return 'bg-green-100 text-green-700';
      case 'Inactive':
        return 'bg-gray-100 text-gray-700';
      case 'Suspended':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  const totalRevenue = customers.reduce((sum, c) => {
    const amount = parseFloat(c.totalSpent.replace('$', ''));
    return sum + amount;
  }, 0);

  const totalOrders = customers.reduce((sum, c) => sum + c.totalOrders, 0);

  const activeCustomers = customers.filter(c => c.status === 'Active').length;

  // Recent activity from all customers
  const recentActivities = customers
    .flatMap(c =>
      c.recentActivity.map(activity => ({
        ...activity,
        customerName: c.name,
      })),
    )
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .slice(0, 4);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Customers
        </h1>
        <p className="text-gray-500 mt-1">Manage your customer database</p>
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
              placeholder="Search customers by name, email or phone..."
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
              <option>Active</option>
              <option>Inactive</option>
              <option>Suspended</option>
            </select>
          </div>

          {/* More Filters */}
          <button className="w-full sm:w-auto px-4 py-2.5 md:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700 flex items-center justify-center sm:justify-start gap-2">
            More Filters
            <ChevronDown size={18} />
          </button>
        </div>
      </div>

      {/* Customers List */}
      <div className="space-y-3 md:space-y-4 mb-8 md:mb-12">
        {filteredCustomers.length === 0 ? (
          <div className="bg-white rounded-lg p-6 md:p-12 shadow-sm border border-gray-200 flex flex-col items-center justify-center">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
              No Customers Found
            </h2>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        ) : (
          filteredCustomers.map(customer => (
            <div
              key={customer.id}
              onClick={() => navigate(`/customers/${customer.id}`)}
              className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  {/* Customer Avatar */}
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                    {customer.profileImage}
                  </div>

                  {/* Customer Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {customer.name}
                      </h3>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(
                          customer.status,
                        )}`}
                      >
                        {customer.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-1">
                      <span className="flex items-center gap-1">
                        ✉️ {customer.email}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        📞 {customer.phone}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500">
                      Joined: {customer.joinedDate} • Last order:{' '}
                      {customer.lastOrder}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="text-right flex-shrink-0 mr-4">
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-sm text-gray-600">Orders</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {customer.totalOrders}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Spent</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {customer.totalSpent}
                      </p>
                    </div>
                  </div>
                </div>

                {/* View Details Button */}
                <button className="px-4 py-2.5 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs md:text-sm font-medium flex-shrink-0">
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8">
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs md:text-sm text-gray-600 mb-1">
                Total Customers
              </p>
              <p className="text-2xl md:text-3xl font-bold text-gray-900">
                {customers.length}
              </p>
            </div>
            <div className="text-2xl">👥</div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Customers</p>
              <p className="text-3xl font-bold text-green-600">
                {activeCustomers}
              </p>
            </div>
            <div className="text-2xl">👤</div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">
                ${totalRevenue.toFixed(2)}
              </p>
            </div>
            <div className="text-2xl">💵</div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Orders</p>
              <p className="text-3xl font-bold text-gray-900">{totalOrders}</p>
            </div>
            <div className="text-2xl">📦</div>
          </div>
        </div>
      </div>

      {/* Recent Customer Activity */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Recent Customer Activity
        </h2>

        <div className="space-y-4">
          {recentActivities.length === 0 ? (
            <p className="text-gray-500 text-center py-4">No recent activity</p>
          ) : (
            recentActivities.map((activity, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 pb-4 border-b border-gray-200 last:border-b-0"
              >
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.type}</p>
                  <p className="text-sm text-gray-600">
                    {activity.customerName} • {activity.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;
