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
      {/* HEADER */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Customers
        </h1>
        <p className="text-gray-500 mt-1">Manage your customer database</p>
      </div>

      {/* FILTERS */}
      <div className="mb-6 md:mb-8 space-y-3 md:space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          {/* SEARCH */}
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* FILTER */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="w-full sm:w-auto px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Suspended</option>
          </select>

          <button className="w-full sm:w-auto px-4 py-2.5 border rounded-lg flex items-center justify-center gap-2">
            More Filters <ChevronDown size={18} />
          </button>
        </div>
      </div>

      {/* CUSTOMER LIST */}
      <div className="space-y-4 mb-8 md:mb-12">
        {filteredCustomers.length === 0 ? (
          <div className="bg-white p-6 text-center rounded-lg">
            No Customers Found
          </div>
        ) : (
          filteredCustomers.map(customer => (
            <div
              key={customer.id}
              onClick={() => navigate(`/customers/${customer.id}`)}
              className="bg-white p-4 md:p-6 rounded-lg border border-gray-300 hover:shadow-md cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* LEFT */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 flex-1">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-xl">
                    {customer.profileImage}
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold">{customer.name}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded ${getStatusColor(customer.status)}`}
                      >
                        {customer.status}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600">✉️ {customer.email}</p>
                    <p className="text-sm text-gray-600">📞 {customer.phone}</p>
                    {/* <p className="text-xs text-gray-500 mt-1">
                      Joined: {customer.joinedDate}
                    </p> */}
                    <p className="text-xs text-gray-500 mt-1">
                      Joined: {customer.joinedDate} • Last order:{' '}
                      {customer.lastOrder}
                    </p>
                  </div>
                </div>

                {/* RIGHT STATS */}
                <div className="flex flex-col sm:flex-row gap-4 text-left md:text-right">
                  <div>
                    <p className="text-sm text-gray-600">Orders</p>
                    <p className="text-sm md:text-[17px] font-bold">
                      {customer.totalOrders}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Spent</p>
                    <p className="text-sm md:text-[17px] font-bold">
                      {customer.totalSpent}
                    </p>
                  </div>
                </div>

                <button className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg">
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8">
        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs md:text-sm text-gray-600 mb-1">
                Total Customers
              </p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">
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
              <p className="text-xl md:text-2xl font-bold text-green-600">
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
              <p className="text-xl md:text-2xl font-bold text-gray-900">
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
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                {totalOrders}
              </p>
            </div>
            <div className="text-2xl">📦</div>
          </div>
        </div>
      </div>

      {/* ACTIVITY */}
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
