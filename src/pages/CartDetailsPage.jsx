import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { cartsData } from '../data/carts';

const CartDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const cart = useMemo(() => {
    return cartsData.find(c => c.id === parseInt(id)) || cartsData[0];
  }, [id]);

  const getStatusColor = status => {
    switch (status) {
      case 'Active':
        return 'bg-blue-100 text-blue-700';
      case 'Abandoned':
        return 'bg-red-100 text-red-700';
      case 'Converted':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
        <button
          onClick={() => navigate('/carts')}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <ChevronLeft size={20} />
          Back
        </button>
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Cart {cart.cartId}
            </h1>
            <span
              className={`text-sm font-semibold px-3 py-1 rounded ${getStatusColor(
                cart.status,
              )}`}
            >
              {cart.status}
            </span>
          </div>
          <p className="text-gray-500 mt-1">Shopping cart details</p>
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
              <div>
                <p className="text-sm text-gray-600 mb-2">Customer</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">👤</span>
                  <p className="font-semibold text-gray-900">
                    {cart.customerName}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="font-semibold text-gray-900">{cart.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Phone</p>
                <p className="font-semibold text-gray-900">{cart.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Created</p>
                <p className="font-semibold text-gray-900">
                  {cart.createdDate}
                </p>
              </div>
            </div>

            {cart.status === 'Abandoned' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 md:p-4">
                <p className="text-sm font-semibold text-yellow-800 mb-1">
                  📧 Recovery email sent 1 time(s)
                </p>
                <p className="text-xs text-yellow-700">
                  Last sent: January 15, 2024 at 12:00 PM
                </p>
              </div>
            )}
          </div>

          {/* Cart Items */}
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4 md:mb-6">
              Cart Items ({cart.itemCount})
            </h2>

            <div className="space-y-3 md:space-y-4">
              {cart.items.map(item => (
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
            <p className="text-gray-900">{cart.shippingAddress.street}</p>
            <p className="text-gray-900">
              {cart.shippingAddress.city}, {cart.shippingAddress.state}{' '}
              {cart.shippingAddress.zip}
            </p>
            <p className="text-gray-900">{cart.shippingAddress.country}</p>
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
                <p className="text-sm text-gray-600">Subtotal</p>
                <p className="font-semibold text-gray-900">
                  {cart.orderSummary.subtotal}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Tax</p>
                <p className="font-semibold text-gray-900">
                  {cart.orderSummary.tax}
                </p>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-600">Shipping</p>
                <p className="font-semibold text-gray-900">
                  {cart.orderSummary.shipping}
                </p>
              </div>
              <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                <p className="font-bold text-gray-900">Total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {cart.orderSummary.total}
                </p>
              </div>
            </div>
          </div>

          {/* Cart Timeline */}
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">
              Cart Timeline
            </h2>

            <div className="space-y-3 md:space-y-4">
              {cart.timeline.map((event, idx) => (
                <div key={event.id} className="flex gap-2 md:gap-3">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl">{event.icon}</span>
                    {idx !== cart.timeline.length - 1 && (
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
                ✈️ Send Recovery Email
              </button>
              <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2.5 md:py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                💬 Contact Customer
              </button>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2.5 md:py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                🗑️ Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetailsPage;
