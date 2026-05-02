import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, Plus } from 'lucide-react';
import { employeesData } from '../data/employees';

const EmployeesPage = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState(employeesData);
  const [departmentFilter, setDepartmentFilter] = useState('All Departments');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [searchTerm, setSearchTerm] = useState('');

  const departments = [
    'All Departments',
    'Management',
    'Sales',
    'Customer Service',
    'Analytics',
    'Engineering',
    'Design',
  ];

  const filteredEmployees = employees.filter(employee => {
    const matchDepartment =
      departmentFilter === 'All Departments' ||
      employee.department === departmentFilter;
    const matchStatus =
      statusFilter === 'All Status' || employee.status === statusFilter;
    const matchSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchDepartment && matchStatus && matchSearch;
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

  const getRoleColor = role => {
    switch (role) {
      case 'Admin':
        return 'bg-purple-100 text-purple-700';
      case 'Manager':
        return 'bg-blue-100 text-blue-700';
      case 'Support':
        return 'bg-green-100 text-green-700';
      case 'Analyst':
        return 'bg-yellow-100 text-yellow-700';
      case 'Developer':
        return 'bg-indigo-100 text-indigo-700';
      case 'Designer':
        return 'bg-pink-100 text-pink-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const activeCount = employees.filter(e => e.status === 'Active').length;
  const departmentCount = new Set(employees.map(e => e.department)).size;
  const onlineCount = employees.filter(e => e.onlineNow).length;

  const recentActivities = employees
    .flatMap(e =>
      e.recentActivity.map(activity => ({
        ...activity,
        employeeName: e.name,
      })),
    )
    .slice(0, 4);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Employees
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your team members and their access
          </p>
        </div>
        <button className="w-full sm:w-auto px-4 py-2.5 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center sm:justify-start gap-2">
          <Plus size={18} />
          Add Employee
        </button>
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
              placeholder="Search employees by name, email..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Department Filter */}
          <div className="relative flex-1 sm:flex-none">
            <select
              value={departmentFilter}
              onChange={e => setDepartmentFilter(e.target.value)}
              className="w-full px-4 py-2.5 md:py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white cursor-pointer"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
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

      {/* Employees List */}
      <div className="space-y-3 md:space-y-4 mb-8 md:mb-12">
        {filteredEmployees.length === 0 ? (
          <div className="bg-white rounded-lg p-6 md:p-12 shadow-sm border border-gray-200 flex flex-col items-center justify-center">
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
              No Employees Found
            </h2>
            <p className="text-gray-500">Try adjusting your filters</p>
          </div>
        ) : (
          filteredEmployees.map(employee => (
            <div
              key={employee.id}
              onClick={() => navigate(`/employees/${employee.id}`)}
              className="bg-white rounded-lg p-4 md:p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  {/* Employee Avatar */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                      {employee.profileImage}
                    </div>
                    {employee.onlineNow && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  {/* Employee Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-gray-900">
                        {employee.name}
                      </h3>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${getRoleColor(
                          employee.role,
                        )}`}
                      >
                        {employee.role}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded ${getStatusColor(
                          employee.status,
                        )}`}
                      >
                        {employee.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        ✉️ {employee.email}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        📁 {employee.department}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        📍 {employee.location}
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 mt-1">
                      Hired: {employee.hiredDate} • Last login:{' '}
                      {employee.lastLogin}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="text-right flex-shrink-0 mr-4">
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-sm text-gray-600">Manager</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {employee.manager}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Permissions</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {employee.permissions}
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
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Employees</p>
              <p className="text-3xl font-bold text-gray-900">
                {employees.length}
              </p>
            </div>
            <div className="text-2xl">👥</div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Employees</p>
              <p className="text-3xl font-bold text-green-600">{activeCount}</p>
            </div>
            <div className="text-2xl">✓</div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Departments</p>
              <p className="text-3xl font-bold text-gray-900">
                {departmentCount}
              </p>
            </div>
            <div className="text-2xl">📁</div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Online Now</p>
              <p className="text-3xl font-bold text-gray-900">{onlineCount}</p>
            </div>
            <div className="text-2xl">🟢</div>
          </div>
        </div>
      </div>

      {/* Recent Employee Activity */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h2 className="text-lg font-bold text-gray-900 mb-6">
          Recent Employee Activity
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
                    {activity.employeeName}
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

export default EmployeesPage;
