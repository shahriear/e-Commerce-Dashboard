import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Download, Eye, RotateCcw } from 'lucide-react';
import { paymentsData } from '../data/payments';

const PaymentDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const payment = useMemo(() => {
    return paymentsData.find(p => p.id === parseInt(id)) || paymentsData[0];
  }, [id]);

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

  const getStatusIcon = status => {
    switch (status) {
      case 'Succeeded':
        return '✓';
      case 'Pending':
        return '⏱';
      case 'Failed':
        return '✗';
      default:
        return '•';
    }
  };

  const getGatewayResponseColor = status => {
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
            onClick={() => navigate('/payments')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ChevronLeft size={20} />
            Back
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {payment.paymentId}
            </h1>
            <p className="text-gray-500 mt-1 text-sm md:text-base">
              Payment details and information
            </p>
          </div>
        </div>
        <span
          className={`text-sm font-semibold px-4 py-2 rounded-lg ${getStatusColor(
            payment.status,
          )}`}
        >
          {getStatusIcon(payment.status)} {payment.status}
        </span>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          {/* Payment Details */}
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4 md:mb-6">
              Payment Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {/* Card Information Section */}
              <div className="col-span-2">
                <h3 className="text-sm font-semibold text-gray-700 mb-4 text-blue-600">
                  Card Information
                </h3>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Card Number</p>
                <p className="font-semibold text-gray-900 flex items-center gap-2">
                  {payment.cardBrand === 'VISA' && '💳'}
                  {payment.cardBrand === 'MASTERCARD' && '💳'}
                  {payment.cardBrand === 'AMEX' && '💳'}
                  {payment.cardNumber}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Cardholder</p>
                <p className="font-semibold text-gray-900">
                  {payment.cardholderName}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Expires</p>
                <p className="font-semibold text-gray-900">
                  {payment.cardExpiry}
                </p>
              </div>

              {/* Transaction Details Section */}
              <div className="col-span-2 pt-4 border-t border-gray-200 mt-2">
                <h3 className="text-sm font-semibold text-gray-700 mb-4 text-blue-600">
                  Transaction Details
                </h3>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Amount</p>
                <p className="text-3xl font-bold text-gray-900">
                  {payment.amount}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Currency</p>
                <p className="font-semibold text-gray-900">
                  {payment.currency}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Gateway</p>
                <p className="font-semibold text-gray-900">{payment.gateway}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Transaction ID</p>
                <p className="font-semibold text-gray-900 text-sm">
                  {payment.transactionId}
                </p>
              </div>
            </div>
          </div>

          {/* Billing Address */}
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Billing Address
            </h2>

            <div className="space-y-3">
              <p className="font-semibold text-gray-900">
                {payment.billingAddress.street}
              </p>
              <div>
                <p className="text-sm text-gray-600">
                  {payment.billingAddress.city}, {payment.billingAddress.state}{' '}
                  {payment.billingAddress.zipCode}
                </p>
                <p className="text-sm text-gray-600">
                  {payment.billingAddress.country}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Timeline */}
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-4 md:mb-6">
              Payment Timeline
            </h2>

            <div className="space-y-3 md:space-y-4">
              {payment.timeline.map((event, idx) => (
                <div key={idx} className="flex gap-3 md:gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-600 flex-shrink-0">
                      {event.icon}
                    </div>
                    {idx !== payment.timeline.length - 1 && (
                      <div className="w-0.5 h-12 bg-gray-300 my-1"></div>
                    )}
                  </div>
                  <div className="pb-4">
                    <p className="font-semibold text-gray-900">
                      {event.status}
                    </p>
                    <p className="text-sm text-gray-600">{event.timestamp}</p>
                    <p className="text-xs text-gray-500 mt-1">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gateway Response */}
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">
              Gateway Response
            </h2>

            <div className="space-y-3 md:space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 md:p-4 bg-gray-50 rounded-lg gap-2 md:gap-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <p
                    className={`font-bold text-lg ${getGatewayResponseColor(
                      payment.gatewayResponse.status,
                    )}`}
                  >
                    {payment.gatewayResponse.status}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-1">Code</p>
                  <p className="font-bold text-lg text-gray-900">
                    {payment.gatewayResponse.code}
                  </p>
                </div>
              </div>

              <div className="p-3 md:p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">Message</p>
                <p className="font-medium text-gray-900">
                  {payment.gatewayResponse.message}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4 md:space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">
              Customer Information
            </h2>

            <div className="space-y-3 md:space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Customer Name</p>
                <p className="font-semibold text-gray-900">
                  {payment.customerName}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="font-semibold text-gray-900">{payment.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Payment Method</p>
                <p className="font-semibold text-gray-900">
                  {payment.paymentMethod}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Related Order</p>
                <p className="font-semibold text-blue-600 cursor-pointer hover:underline">
                  {payment.orderId}
                </p>
              </div>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200">
            <h2 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">
              Payment Summary
            </h2>

            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <p className="text-sm text-gray-600">Payment ID</p>
                <p className="font-semibold text-gray-900 text-sm">
                  {payment.paymentId}
                </p>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <p className="text-sm text-gray-600">Amount</p>
                <p className="font-semibold text-gray-900">{payment.amount}</p>
              </div>

              <div className="flex items-center justify-between pb-2 border-b border-gray-200">
                <p className="text-sm text-gray-600">Date</p>
                <p className="font-semibold text-gray-900 text-sm">
                  {payment.date}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Status</p>
                <span
                  className={`text-xs font-bold px-2 py-1 rounded ${getStatusColor(
                    payment.status,
                  )}`}
                >
                  {payment.status}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Actions</h2>

            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2">
                <Download size={18} />
                Download Receipt
              </button>

              <button className="w-full px-4 py-2 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors font-medium flex items-center justify-center gap-2">
                <Eye size={18} />
                View Order
              </button>

              {payment.status === 'Succeeded' && (
                <button className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center justify-center gap-2">
                  <RotateCcw size={18} />
                  Refund Payment
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsPage;
