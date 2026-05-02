import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { ordersData } from '../data/orders';

const OrderDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const order = useMemo(() => {
    return ordersData.find(o => o.id === parseInt(id)) || ordersData[0];
  }, [id]);

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

  const getPaymentStatusColor = status => {
    switch (status) {
      case 'succeeded':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'failed':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={() => navigate('/orders')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ChevronLeft size={20} />
            Back
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {order.orderId}
            </h1>
            <p className="text-gray-500 mt-1 text-sm md:text-base">
              Order details and management
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 md:gap-3">
          <span
            className={`text-sm font-semibold px-3 py-1 rounded ${getStatusColor(
              order.status,
            )}`}
          >
            {order.status}
          </span>
          <span className="text-sm font-semibold px-3 py-1 rounded bg-green-100 text-green-700">
            {order.paymentStatus}
          </span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4 md:mb-6">
              Customer Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Customer</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">👤</span>
                  <p className="font-semibold text-gray-900">
                    {order.customerName}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="font-semibold text-gray-900">{order.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Phone</p>
                <p className="font-semibold text-gray-900">{order.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Order Date</p>
                <p className="font-semibold text-gray-900">
                  {order.createdDate}
                </p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4 md:mb-6">
              Order Items
            </h2>

            <div className="space-y-3 md:space-y-4">
              {order.items.map(item => (
                <div
                  key={item.id}
                  className="flex items-start gap-3 md:gap-4 pb-3 md:pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <div className="text-5xl flex-shrink-0">{item.image}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Qty: {item.quantity} • Color: {item.color} • Size:{' '}
                      {item.size}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-semibold text-gray-900">{item.price}</p>
                    <p className="text-sm text-gray-500">{item.totalPrice}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Shipping Address
            </h2>
            <div className="flex items-start gap-2">
              <span className="text-xl">📍</span>
              <div>
                <p className="text-gray-900">{order.shippingAddress.street}</p>
                <p className="text-gray-900">
                  {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                  {order.shippingAddress.zip}
                </p>
                <p className="text-gray-900">{order.shippingAddress.country}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 md:space-y-6">
          {/* Order Summary */}
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">
              Order Summary
            </h2>

            <div className="space-y-2 md:space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">
                  Subtotal ({order.itemCount} items)
                </p>
                <p className="font-semibold text-gray-900">
                  {order.orderSummary.subtotal}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Tax</p>
                <p className="font-semibold text-gray-900">
                  {order.orderSummary.tax}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Shipping</p>
                <p className="font-semibold text-gray-900">
                  {order.orderSummary.shipping}
                </p>
              </div>
              <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                <p className="font-bold text-gray-900">Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {order.orderSummary.total}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">
              Payment Information
            </h2>

            <div className="space-y-3 md:space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Payment ID</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg">💳</span>
                  <p className="font-semibold text-gray-900">
                    {order.paymentInfo.paymentId}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Payment Status</p>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-lg ${getPaymentStatusColor(
                      order.paymentInfo.status,
                    )}`}
                  >
                    {order.paymentInfo.status === 'succeeded'
                      ? '✅'
                      : order.paymentInfo.status === 'pending'
                        ? '⏳'
                        : '❌'}
                  </span>
                  <p className="font-semibold text-gray-900 capitalize">
                    {order.paymentInfo.status}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Paid At</p>
                <p className="font-semibold text-gray-900">
                  {order.paymentInfo.paidAt}
                </p>
              </div>
            </div>
          </div>

          {/* Order Timeline */}
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">
              Order Timeline
            </h2>

            <div className="space-y-3 md:space-y-4">
              {order.timeline.map((event, idx) => (
                <div key={event.id} className="flex gap-2 md:gap-3">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl">{event.icon}</span>
                    {idx !== order.timeline.length - 1 && (
                      <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>
                    )}
                  </div>
                  <div className="pb-4">
                    <p className="font-semibold text-gray-900">
                      {event.action}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {event.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">
              Actions
            </h2>

            <div className="space-y-2 md:space-y-3">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 md:py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                ⬆️ Update Status
              </button>
              <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2.5 md:py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                📄 Send Invoice
              </button>
              <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2.5 md:py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                💬 Contact Customer
              </button>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 md:py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                ❌ Cancel Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
