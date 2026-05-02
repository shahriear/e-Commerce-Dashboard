import { useState } from 'react';

const ProfileSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    department: 'Management',
    location: 'New York, NY',
    bio: 'Experienced e-commerce administrator with 5+ years of experience managing online stores and customer relationships.',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    orderUpdates: true,
    customerMessages: true,
    systemAlerts: false,
    pushNotifications: true,
    smsNotifications: false,
  });

  const handleFormChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = e => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = e => {
    const { name, checked } = e.target;
    setNotifications(prev => ({ ...prev, [name]: checked }));
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
        <p className="text-gray-500 mt-1">
          Manage your account information and preferences
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-6xl mx-auto mb-4">
              👨
            </div>
            <h3 className="text-xl font-bold text-gray-900">John Doe</h3>
            <p className="text-gray-600">Admin</p>
            <p className="text-gray-500">Management</p>
            <p className="text-sm text-gray-600 mt-2">john.doe@company.com</p>
            <p className="text-sm text-gray-600">New York, NY</p>
            <p className="text-xs text-gray-400 mt-2">
              Joined January 15, 2023
            </p>
          </div>

          {/* Account Information */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Account Information
            </h2>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Last Login</p>
                <p className="font-semibold text-gray-900">
                  Jan 15, 2024, 10:30 AM
                </p>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Timezone</p>
                <p className="font-semibold text-gray-900">America/New_York</p>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Language</p>
                <p className="font-semibold text-gray-900">English</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <div className="flex items-center gap-8">
              <button
                onClick={() => setActiveTab('personal')}
                className={`pb-4 font-medium transition-colors ${
                  activeTab === 'personal'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                👤 Personal Info
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`pb-4 font-medium transition-colors ${
                  activeTab === 'security'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🔒 Security
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`pb-4 font-medium transition-colors ${
                  activeTab === 'notifications'
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🔔 Notifications
              </button>
            </div>
          </div>

          {/* Personal Info Tab */}
          {activeTab === 'personal' && (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Department
                    </label>
                    <input
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleFormChange}
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  ></textarea>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
                    💾 Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-2">
                    🔐 Password Requirements
                  </h3>
                  <ul className="space-y-1 text-sm text-blue-700">
                    <li>✓ At least 8 characters long</li>
                    <li>✓ Include uppercase and lowercase letters</li>
                    <li>✓ Include at least one number</li>
                    <li>✓ Include at least one special character</li>
                  </ul>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
                    🔒 Change Password
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="space-y-6">
                {/* Email Notifications */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      Email Notifications
                    </p>
                    <p className="text-sm text-gray-600">
                      Receive notifications via email
                    </p>
                  </div>
                  <div
                    className={`w-12 h-6 rounded-full flex items-center transition-colors cursor-pointer ${
                      notifications.emailNotifications
                        ? 'bg-blue-600 justify-end'
                        : 'bg-gray-300 justify-start'
                    }`}
                    onClick={() =>
                      setNotifications(prev => ({
                        ...prev,
                        emailNotifications: !prev.emailNotifications,
                      }))
                    }
                  >
                    <div className="w-5 h-5 bg-white rounded-full mx-0.5"></div>
                  </div>
                </div>

                {/* Order Updates */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Order Updates</p>
                    <p className="text-sm text-gray-600">
                      Get notified about order status changes
                    </p>
                  </div>
                  <div
                    className={`w-12 h-6 rounded-full flex items-center transition-colors cursor-pointer ${
                      notifications.orderUpdates
                        ? 'bg-blue-600 justify-end'
                        : 'bg-gray-300 justify-start'
                    }`}
                    onClick={() =>
                      setNotifications(prev => ({
                        ...prev,
                        orderUpdates: !prev.orderUpdates,
                      }))
                    }
                  >
                    <div className="w-5 h-5 bg-white rounded-full mx-0.5"></div>
                  </div>
                </div>

                {/* Customer Messages */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      Customer Messages
                    </p>
                    <p className="text-sm text-gray-600">
                      Receive notifications for new customer messages
                    </p>
                  </div>
                  <div
                    className={`w-12 h-6 rounded-full flex items-center transition-colors cursor-pointer ${
                      notifications.customerMessages
                        ? 'bg-blue-600 justify-end'
                        : 'bg-gray-300 justify-start'
                    }`}
                    onClick={() =>
                      setNotifications(prev => ({
                        ...prev,
                        customerMessages: !prev.customerMessages,
                      }))
                    }
                  >
                    <div className="w-5 h-5 bg-white rounded-full mx-0.5"></div>
                  </div>
                </div>

                {/* System Alerts */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">System Alerts</p>
                    <p className="text-sm text-gray-600">
                      Get important system notifications
                    </p>
                  </div>
                  <div
                    className={`w-12 h-6 rounded-full flex items-center transition-colors cursor-pointer ${
                      notifications.systemAlerts
                        ? 'bg-blue-600 justify-end'
                        : 'bg-gray-300 justify-start'
                    }`}
                    onClick={() =>
                      setNotifications(prev => ({
                        ...prev,
                        systemAlerts: !prev.systemAlerts,
                      }))
                    }
                  >
                    <div className="w-5 h-5 bg-white rounded-full mx-0.5"></div>
                  </div>
                </div>

                {/* Push Notifications */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      Push Notifications
                    </p>
                    <p className="text-sm text-gray-600">
                      Receive notifications in your browser
                    </p>
                  </div>
                  <div
                    className={`w-12 h-6 rounded-full flex items-center transition-colors cursor-pointer ${
                      notifications.pushNotifications
                        ? 'bg-blue-600 justify-end'
                        : 'bg-gray-300 justify-start'
                    }`}
                    onClick={() =>
                      setNotifications(prev => ({
                        ...prev,
                        pushNotifications: !prev.pushNotifications,
                      }))
                    }
                  >
                    <div className="w-5 h-5 bg-white rounded-full mx-0.5"></div>
                  </div>
                </div>

                {/* SMS Notifications */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">
                      SMS Notifications
                    </p>
                    <p className="text-sm text-gray-600">
                      Receive notifications via SMS
                    </p>
                  </div>
                  <div
                    className={`w-12 h-6 rounded-full flex items-center transition-colors cursor-pointer ${
                      notifications.smsNotifications
                        ? 'bg-blue-600 justify-end'
                        : 'bg-gray-300 justify-start'
                    }`}
                    onClick={() =>
                      setNotifications(prev => ({
                        ...prev,
                        smsNotifications: !prev.smsNotifications,
                      }))
                    }
                  >
                    <div className="w-5 h-5 bg-white rounded-full mx-0.5"></div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
                    💾 Save Settings
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
