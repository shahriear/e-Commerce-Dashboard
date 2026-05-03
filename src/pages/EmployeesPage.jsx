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
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Employees
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your team members and access
          </p>
        </div>

        <button className="w-full sm:w-auto px-4 py-2.5 bg-blue-600 text-white rounded-lg flex items-center justify-center gap-2">
          <Plus size={18} />
          Add Employee
        </button>
      </div>

      {/* FILTERS */}
      <div className="mb-6 md:mb-8 space-y-3 md:space-y-4">
        <div className="flex flex-col lg:flex-row gap-3 md:gap-4">
          {/* SEARCH */}
          <div className="flex-1 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* DEPARTMENT */}
          <select
            value={departmentFilter}
            onChange={e => setDepartmentFilter(e.target.value)}
            className="w-full lg:w-auto px-4 py-2.5 border rounded-lg"
          >
            {departments.map(dept => (
              <option key={dept}>{dept}</option>
            ))}
          </select>

          {/* STATUS */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="w-full lg:w-auto px-4 py-2.5 border rounded-lg"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Suspended</option>
          </select>

          <button className="w-full lg:w-auto px-4 py-2.5 border rounded-lg flex items-center justify-center gap-2">
            More <ChevronDown size={18} />
          </button>
        </div>
      </div>

      {/* EMPLOYEE LIST */}
      <div className="space-y-4 mb-10">
        {filteredEmployees.map(employee => (
          <div
            key={employee.id}
            onClick={() => navigate(`/employees/${employee.id}`)}
            className="bg-white p-4 md:p-6 rounded-lg border border-gray-300 hover:shadow-md cursor-pointer"
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* LEFT */}
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 flex-1">
                <div className="relative">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-xl">
                    {employee.profileImage}
                  </div>
                  {employee.onlineNow && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                  )}
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold">{employee.name}</h3>
                    <span
                      className={`text-xs px-2 py-1 rounded ${getRoleColor(employee.role)}`}
                    >
                      {employee.role}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded ${getStatusColor(employee.status)}`}
                    >
                      {employee.status}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600">{employee.email}</p>
                  <p className="text-sm text-gray-600">
                    📁{employee.department} • {employee.location}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Hired: {employee.hiredDate} • Last login:{' '}
                    {employee.lastLogin}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col sm:flex-row gap-4 text-left lg:text-right">
                <div>
                  <p className="text-sm text-gray-500">Manager</p>
                  <p className="font-semibold">{employee.manager}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Permissions</p>
                  <p className="font-semibold">{employee.permissions}</p>
                </div>
              </div>

              <button className="w-full lg:w-auto px-4 py-2 bg-blue-600 text-white rounded-lg">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6 mb-6 md:mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Employees</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">
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
              <p className="text-xl md:text-2xl font-bold text-green-600">
                {activeCount}
              </p>
            </div>
            <div className="text-2xl">✓</div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Departments</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">
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
              <p className="text-xl md:text-2xl font-bold text-gray-900">
                {onlineCount}
              </p>
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
