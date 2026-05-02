import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';
import { paymentsData } from '../data/payments';

const PaymentsPage = () => {
  const navigate = useNavigate();
  const [payments, setPayments] = useState(paymentsData);
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPayments = payments.filter(payment => {
    const matchStatus =
      statusFilter === 'All Status' || payment.status === statusFilter;
    const matchSearch =
      payment.paymentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchSearch;
  });

  const getStatusColor = status => {
    switch (status) {
      case 'Succeeded':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Failed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getPaymentMethodIcon = method => {
    switch (method) {
      case 'Credit Card':
        return '💳';
      case 'PayPal':
        return '🅿️';
      case 'Bank Transfer':
        return '🏦';
      default:
        return '💰';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-500 mt-1">
          Manage customer payments and transactions
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
              placeholder="Search payments by ID, customer or order..."
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
              <option>Succeeded</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
          </div>

          {/* More Filters */}
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-gray-700 flex items-center gap-2">
            More Filters
            <ChevronDown size={18} />
          </button>
        </div>
      </div>

      {/* Payments List */}
      <div className="space-y-4">
        {filteredPayments.length === 0 ? (
          <div className="bg-white rounded-lg p-12 shadow-sm border border-gray-200 flex flex-col items-center justify-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              No Payments Found
            </h2>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        ) : (
          filteredPayments.map(payment => (
            <div
              key={payment.id}
              onClick={() => navigate(`/payments/${payment.id}`)}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  {/* Payment Icon */}
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                    💳
                  </div>

                  {/* Payment Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {payment.paymentId}
                      </h3>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(
                          payment.status,
                        )}`}
                      >
                        {payment.status}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600 mb-1">
                      {payment.customerName} • {payment.email}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                      <span>Order: {payment.orderId}</span>
                      <span>•</span>
                      <span>{payment.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        {getPaymentMethodIcon(payment.paymentMethod)}
                        {payment.cardBrand}
                      </span>
                      <span>•</span>
                      <span>{payment.cardNumber}</span>
                    </div>
                  </div>
                </div>

                {/* Amount */}
                <div className="text-right flex-shrink-0">
                  <p className="text-2xl font-bold text-gray-900">
                    {payment.amount}
                  </p>
                  <p className="text-xs text-gray-500">{payment.currency}</p>
                </div>
              </div>

              {/* View Details Button */}
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary Stats */}
      {payments.length > 0 && (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Payments</p>
                <p className="text-3xl font-bold text-gray-900">
                  {payments.length}
                </p>
              </div>
              <div className="text-2xl">💰</div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
                <p className="text-3xl font-bold text-gray-900">
                  $
                  {payments
                    .reduce((sum, p) => sum + parseFloat(p.amount.slice(1)), 0)
                    .toFixed(2)}
                </p>
              </div>
              <div className="text-2xl">💵</div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Successful</p>
                <p className="text-3xl font-bold text-green-600">
                  {payments.filter(p => p.status === 'Succeeded').length}
                </p>
              </div>
              <div className="text-2xl">✅</div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Success Rate</p>
                <p className="text-3xl font-bold text-blue-600">
                  {Math.round(
                    (payments.filter(p => p.status === 'Succeeded').length /
                      payments.length) *
                      100,
                  )}
                  %
                </p>
              </div>
              <div className="text-2xl">📈</div>
            </div>
          </div>
        </div>
      )}

      {/* Payment Methods Section */}
      {payments.length > 0 && (
        <div className="mt-8 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 mb-4">
            Payment Methods
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">💳</div>
                <div>
                  <p className="font-semibold text-gray-900">Credit Card</p>
                  <p className="text-sm text-gray-500">
                    {
                      payments.filter(p => p.paymentMethod === 'Credit Card')
                        .length
                    }{' '}
                    payments
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🅿️</div>
                <div>
                  <p className="font-semibold text-gray-900">PayPal</p>
                  <p className="text-sm text-gray-500">
                    {payments.filter(p => p.paymentMethod === 'PayPal').length}{' '}
                    payments
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🏦</div>
                <div>
                  <p className="font-semibold text-gray-900">Bank Transfer</p>
                  <p className="text-sm text-gray-500">
                    {
                      payments.filter(p => p.paymentMethod === 'Bank Transfer')
                        .length
                    }{' '}
                    payments
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentsPage;
