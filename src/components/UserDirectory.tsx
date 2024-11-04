import React, { useMemo } from 'react';
import { useUserStore } from '../store/userStore';
import { Search, Filter, X } from 'lucide-react';

export default function UserDirectory() {
  const { users, searchTerm, setSearchTerm, filters, setFilter, clearFilters } = useUserStore();

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch = Object.values(user).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );

      const matchesFilters =
        (!filters.department || user.department === filters.department) &&
        (!filters.institution || user.institution === filters.institution) &&
        (!filters.city || user.city === filters.city);

      return matchesSearch && matchesFilters;
    });
  }, [users, searchTerm, filters]);

  const uniqueValues = useMemo(
    () => ({
      departments: [...new Set(users.map((user) => user.department))],
      institutions: [...new Set(users.map((user) => user.institution))],
      cities: [...new Set(users.map((user) => user.city))],
    }),
    [users]
  );

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-7xl mx-auto">
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">User Directory</h2>
          
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <select
            value={filters.department}
            onChange={(e) => setFilter('department', e.target.value)}
            className="border rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Departments</option>
            {uniqueValues.departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          <select
            value={filters.institution}
            onChange={(e) => setFilter('institution', e.target.value)}
            className="border rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Institutions</option>
            {uniqueValues.institutions.map((inst) => (
              <option key={inst} value={inst}>
                {inst}
              </option>
            ))}
          </select>

          <select
            value={filters.city}
            onChange={(e) => setFilter('city', e.target.value)}
            className="border rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Cities</option>
            {uniqueValues.cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          {(filters.department || filters.institution || filters.city || searchTerm) && (
            <button
              onClick={clearFilters}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <X className="h-4 w-4 mr-1" />
              Clear Filters
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Institution
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
                    <div className="text-sm text-gray-500">{user.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.department}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.institution}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.telephone}</div>
                    <div className="text-sm text-gray-500">{user.emails[0]}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.city}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}