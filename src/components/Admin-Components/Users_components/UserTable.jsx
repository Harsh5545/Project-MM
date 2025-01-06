'use client'
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

const UserTable = () => {
  const { toast } = useToast();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc'); // Sorting order (asc or desc)
  const [sortColumn, setSortColumn] = useState('email'); // Default column to sort
  const [pageIndex, setPageIndex] = useState(1); // Current page index
  const [pageSize, setPageSize] = useState(10); // Number of items per page
  const [search, setSearch] = useState(''); // Search term
  const [totalUsers, setTotalUsers] = useState(0); // Total number of users

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/users/list', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page: pageIndex,
          pageSize,
          sortBy: sortColumn,
          sortOrder,
          search,
        }),
      });

      const result = await response.json();

      if (result.total) {
        setData(result.data);
        setTotalUsers(result.total); // Correctly set the total users
      } else {
        toast({ title: 'Error', description: 'Failed to fetch users' });
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  // Sorting function
  const handleSort = (column) => {
    const newSortOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  // Handle pagination controls
  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  // Handle page size change
  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPageIndex(1); // Reset to first page when page size changes
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPageIndex(1); // Reset to first page on search change
  };

  useEffect(() => {
    fetchData();
  }, [pageIndex, pageSize, sortColumn, sortOrder, search]);

  if (loading) return <div>Loading...</div>;

  // Calculate total pages
  const totalPages = Math.ceil(totalUsers / pageSize);

  return (
    <div className="overflow-x-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={handleSearchChange}
          className="px-4 py-2 border rounded"
        />
      </div>
      <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg">
        <thead className="text-left">
          <tr className="bg-gray-200">
            <th
              className="px-4 py-2 border-b cursor-pointer"
              onClick={() => handleSort('email')}
            >
              Email
              {sortColumn === 'email' && (
                <span>{sortOrder === 'asc' ? ' 🔼' : ' 🔽'}</span>
              )}
            </th>
            <th
              className="px-4 py-2 border-b cursor-pointer"
              onClick={() => handleSort('first_name')}
            >
              First Name
              {sortColumn === 'first_name' && (
                <span>{sortOrder === 'asc' ? ' 🔼' : ' 🔽'}</span>
              )}
            </th>
            <th
              className="px-4 py-2 border-b cursor-pointer"
              onClick={() => handleSort('last_name')}
            >
              Last Name
              {sortColumn === 'last_name' && (
                <span>{sortOrder === 'asc' ? ' 🔼' : ' 🔽'}</span>
              )}
            </th>
            <th
              className="px-4 py-2 border-b cursor-pointer"
              onClick={() => handleSort('role')}
            >
              Role
              {sortColumn === 'role' && (
                <span>{sortOrder === 'asc' ? ' 🔼' : ' 🔽'}</span>
              )}
            </th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b">{row.email}</td>
              <td className="px-4 py-2 border-b">{row.first_name}</td>
              <td className="px-4 py-2 border-b">{row.last_name}</td>
              <td className="px-4 py-2 border-b">{row.role?.name}</td>
              <td className="px-4 py-2 border-b flex space-x-2">
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                  onClick={() => console.log(`Edit user with id: ${row.id}`)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  onClick={() => console.log(`Delete user with id: ${row.id}`)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(1)}
            disabled={pageIndex === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            {'<<'}
          </button>
          <button
            onClick={() => handlePageChange(pageIndex - 1)}
            disabled={pageIndex === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            {'<'}
          </button>
          <span>
            Page {pageIndex} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(pageIndex + 1)}
            disabled={pageIndex >= totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            {'>'}
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={pageIndex >= totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            {'>>'}
          </button>
        </div>

        {/* Page Size Control */}
        <div className="flex items-center space-x-2">
          <label htmlFor="pageSize" className="text-gray-700">Show</label>
          <select
            id="pageSize"
            value={pageSize}
            onChange={handlePageSizeChange}
            className="px-4 py-2 border rounded"
          >
            {[10, 25, 50, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
