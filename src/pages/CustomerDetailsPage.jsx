import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Mail, Pen, Eye, AlertCircle } from 'lucide-react';
import { customersData } from '../data/customers';

const CustomerDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const customer = useMemo(() => {
    return customersData.find(c => c.id === parseInt(id)) || customersData[0];
  }, [id]);

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

  const getOrderStatusColor = status => {
    switch (status) {
      case 'Processing':
        return 'text-blue-600';
      case 'Delivered':
        return 'text-green-600';
      case 'Cancelled':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/customers')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ChevronLeft size={20} />
            Back
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {customer.name}
            </h1>
            <p className="text-gray-500 mt-1">Customer details and history</p>
          </div>
        </div>
        <span
          className={`text-sm font-semibold px-4 py-2 rounded-lg ${getStatusColor(
            customer.status,
          )}`}
        >
          {customer.status}
        </span>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Customer Information
            </h2>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Name</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{customer.profileImage}</span>
                  <p className="font-semibold text-gray-900">{customer.name}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="font-semibold text-gray-900">{customer.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Phone</p>
                <p className="font-semibold text-gray-900">{customer.phone}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Status</p>
                <span
                  className={`inline-block text-xs font-bold px-3 py-1 rounded ${getStatusColor(
                    customer.status,
                  )}`}
                >
                  {customer.status}
                </span>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Joined Date</p>
                <p className="font-semibold text-gray-900">
                  {customer.joinedDate}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Last Order</p>
                <p className="font-semibold text-gray-900">
                  {customer.lastOrder}
                </p>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Shipping Address
            </h2>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-xl">📍</span>
                <div>
                  <p className="font-semibold text-gray-900">
                    {customer.shippingAddress.street}
                  </p>
                  <p className="text-sm text-gray-600">
                    {customer.shippingAddress.city},{' '}
                    {customer.shippingAddress.state}{' '}
                    {customer.shippingAddress.zipCode}
                  </p>
                  <p className="text-sm text-gray-600">
                    {customer.shippingAddress.country}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Order History */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-6">
              Order History
            </h2>

            <div className="space-y-3">
              {customer.orderHistory.map((order, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">📋</span>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {order.orderId}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.date} • {order.items} items
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{order.total}</p>
                    <p
                      className={`text-sm font-medium ${getOrderStatusColor(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Customer Profile Card */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-6xl mx-auto mb-4">
              {customer.profileImage}
            </div>
            <h3 className="text-xl font-bold text-gray-900">{customer.name}</h3>
            <p className="text-sm text-gray-600">{customer.email}</p>
          </div>

          {/* Customer Stats */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Customer Stats
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📦</span>
                  <p className="text-sm text-gray-600">Total Orders</p>
                </div>
                <p className="font-bold text-gray-900">
                  {customer.totalOrders}
                </p>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-xl">💵</span>
                  <p className="text-sm text-gray-600">Total Spent</p>
                </div>
                <p className="font-bold text-gray-900">{customer.totalSpent}</p>
              </div>

              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📊</span>
                  <p className="text-sm text-gray-600">Avg Order Value</p>
                </div>
                <p className="font-bold text-gray-900">
                  {customer.avgOrderValue}
                </p>
              </div>
            </div>
          </div>

          {/* Preferences */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Preferences
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Favorite Category</p>
                <p className="font-semibold text-gray-900">
                  {customer.preferences.favoriteCategory}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Preferred Payment</p>
                <p className="font-semibold text-gray-900">
                  {customer.preferences.preferredPayment}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-1">
                  Newsletter Subscription
                </p>
                <p className="font-semibold text-gray-900">
                  {customer.preferences.newsletterSubscription}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Recent Activity
            </h2>

            <div className="space-y-3">
              {customer.recentActivity.map((activity, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 pb-3 border-b border-gray-200 last:border-b-0"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.type}
                    </p>
                    {activity.description && (
                      <p className="text-xs text-gray-600">
                        {activity.description}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Actions</h2>

            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2">
                <Mail size={18} />
                Send Email
              </button>

              <button className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center justify-center gap-2">
                <Pen size={18} />
                Edit Customer
              </button>

              <button className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center justify-center gap-2">
                <Eye size={18} />
                View Orders
              </button>

              {customer.status !== 'Suspended' && (
                <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2">
                  <AlertCircle size={18} />
                  Suspend Customer
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsPage;
