import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Edit, Trash2 } from 'lucide-react';
import { employeesData } from '../data/employees';

const EmployeeDetailsPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const employee = useMemo(() => {
    return employeesData.find(e => e.id === parseInt(id)) || employeesData[0];
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

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/employees')}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <ChevronLeft size={20} />
            Back
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Employee Details
            </h1>
            <p className="text-gray-500 mt-1">
              View and manage employee information
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors font-medium flex items-center gap-2">
            <Edit size={18} />
            Edit
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium flex items-center gap-2">
            <Trash2 size={18} />
            Remove
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Employee Card */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 text-center">
            <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-6xl mx-auto mb-4">
              {employee.profileImage}
            </div>
            <h3 className="text-xl font-bold text-gray-900">{employee.name}</h3>
            <div className="flex items-center justify-center gap-2 mt-2">
              <span
                className={`text-xs font-bold px-3 py-1 rounded ${getRoleColor(
                  employee.role,
                )}`}
              >
                {employee.role}
              </span>
              <span
                className={`text-xs font-bold px-3 py-1 rounded ${getStatusColor(
                  employee.status,
                )}`}
              >
                {employee.status}
              </span>
            </div>
            <p className="text-gray-600 mt-2">{employee.department}</p>
            <p className="text-sm text-gray-500">{employee.email}</p>
            <p className="text-sm text-gray-500">{employee.phone}</p>
            <p className="text-sm text-gray-500 mt-2">{employee.location}</p>
            <p className="text-xs text-gray-400 mt-2">
              Hired {employee.hiredDate}
            </p>
          </div>

          {/* Performance */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Performance
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Tasks Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {employee.performance.tasksCompleted}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Efficiency</p>
                <p className="text-2xl font-bold text-gray-900">
                  {employee.performance.efficiency}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Customer Satisfaction</p>
                <p className="text-2xl font-bold text-gray-900">
                  {employee.performance.customerSatisfaction}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Last Review: {employee.performance.lastReview}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">
                Personal Information
              </h2>
              <button className="text-blue-600 hover:text-blue-700">✏️</button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Name</p>
                <p className="font-semibold text-gray-900">{employee.name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Email</p>
                <p className="font-semibold text-gray-900">{employee.email}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Phone</p>
                <p className="font-semibold text-gray-900">{employee.phone}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Location</p>
                <p className="font-semibold text-gray-900">
                  {employee.location}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Salary</p>
                <p className="font-semibold text-gray-900">{employee.salary}</p>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-1">Manager</p>
                <p className="font-semibold text-gray-900">
                  {employee.manager}
                </p>
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-gray-900">Permissions</h2>
              <button className="text-blue-600 hover:text-blue-700">❤️</button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {Object.entries(employee.permissions_list).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="text-sm font-medium text-gray-900 capitalize">
                      {key}
                    </p>
                    <p className="text-xs text-gray-500">{key}</p>
                  </div>
                  <div
                    className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                      value
                        ? 'bg-blue-600 justify-end'
                        : 'bg-gray-300 justify-start'
                    }`}
                  >
                    <div className="w-5 h-5 bg-white rounded-full mx-0.5"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailsPage;
