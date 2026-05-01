import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Users, ShoppingCart, TrendingDown } from 'lucide-react';

const Dashboard = () => {
  // Sample chart data
  const chartData = [
    { day: 'Mon', sales: 1200 },
    { day: 'Tue', sales: 1900 },
    { day: 'Wed', sales: 1400 },
    { day: 'Thu', sales: 2100 },
    { day: 'Fri', sales: 1900 },
    { day: 'Sat', sales: 2400 },
    { day: 'Sun', sales: 2300 },
  ];

  // Metric Cards Data
  const metrics = [
    {
      title: 'Total Sales',
      value: '$45,231',
      change: '+20.1%',
      positive: true,
      subtitle: 'from last month',
      icon: ShoppingCart,
      bgColor: 'bg-green-50',
      iconColor: 'text-green-600',
    },
    {
      title: 'Total Customers',
      value: '2,350',
      change: '+180.1%',
      positive: true,
      subtitle: 'from last month',
      icon: Users,
      bgColor: 'bg-blue-50',
      iconColor: 'text-blue-600',
    },
    {
      title: 'Daily Orders',
      value: '12,234',
      change: '+19%',
      positive: true,
      subtitle: 'from last month',
      icon: ShoppingCart,
      bgColor: 'bg-purple-50',
      iconColor: 'text-purple-600',
    },
    {
      title: 'Conversion Rate',
      value: '2.4%',
      change: '+4.75%',
      positive: true,
      subtitle: 'from last month',
      icon: TrendingUp,
      bgColor: 'bg-orange-50',
      iconColor: 'text-orange-600',
    },
  ];

  // Best Selling Products
  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      sold: 245,
      price: '$12,250',
      rating: 4.8,
      icon: '🎧',
    },
    {
      id: 2,
      name: 'Smart Watch',
      sold: 189,
      price: '$18,900',
      rating: 4.6,
      icon: '⌚',
    },
    {
      id: 3,
      name: 'Laptop Stand',
      sold: 156,
      price: '$4,680',
      rating: 4.7,
      icon: '💻',
    },
    {
      id: 4,
      name: 'Bluetooth Speaker',
      sold: 134,
      price: '$5,360',
      rating: 4.5,
      icon: '🔊',
    },
  ];

  // Recent Activity
  const activities = [
    {
      id: 1,
      title: 'New order received',
      user: 'John Doe',
      time: '2 minutes ago',
      icon: '📦',
    },
    {
      id: 2,
      title: 'Payment processed',
      user: 'System',
      time: '5 minutes ago',
      icon: '💳',
    },
    {
      id: 3,
      title: 'Product review added',
      user: 'Jane Smith',
      time: '1 hour ago',
      icon: '⭐',
    },
    {
      id: 4,
      title: 'New customer signed up',
      user: 'System',
      time: '3 hours ago',
      icon: '👤',
    },
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Time Period Selector */}
      <div className="flex justify-end">
        <select className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>Last 90 days</option>
          <option>Last 30 days</option>
          <option>Last 7 days</option>
          <option>Today</option>
        </select>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map(metric => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.title}
              className="bg-white rounded-lg p-6 shadow-sm border border-gray-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-500 text-sm font-medium">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {metric.value}
                  </p>
                  <p
                    className={`text-sm mt-2 ${metric.positive ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {metric.change} {metric.subtitle}
                  </p>
                </div>
                <div className={`${metric.bgColor} p-3 rounded-lg`}>
                  <Icon size={24} className={metric.iconColor} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts and Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Overview Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">Sales Overview</h3>
            <a
              href="#"
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              View all
            </a>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Best Selling Products */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-900">
              Best Selling Products
            </h3>
            <a
              href="#"
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              View all
            </a>
          </div>
          <div className="space-y-4">
            {products.map(product => (
              <div
                key={product.id}
                className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <div className="text-2xl">{product.icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">
                    {product.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {product.sold} sold • {product.price}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">⭐</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {product.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-6">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {activities.map(activity => (
            <div
              key={activity.id}
              className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
            >
              <div className="text-2xl">{activity.icon}</div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">
                  {activity.title}
                </p>
                <p className="text-xs text-gray-500">
                  by {activity.user} • {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
