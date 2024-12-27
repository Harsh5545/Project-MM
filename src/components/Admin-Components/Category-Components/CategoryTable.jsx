'use client'
import React, { useState, useEffect } from 'react';

const CategoryTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc'); // Sorting order (asc or desc)
  const [sortColumn, setSortColumn] = useState('category_name'); // Default column to sort
  const [pageIndex, setPageIndex] = useState(0); // Current page index
  const [pageSize, setPageSize] = useState(10); // Number of items per page

  // Fetch data (example: fetching from an API)
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/api/category/list');
      const result = await response.json();
      setData(result.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Sorting function
  const handleSort = (column) => {
    const newSortOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  // Sorting the data based on the selected column and order
  const sortedData = data.sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortOrder === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination: Slice data based on current page and page size
  const paginatedData = sortedData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  // Handle pagination controls
  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  // Handle page size change
  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setPageIndex(0); // Reset to first page when page size changes
  };

  // Handle delete action
  const handleDelete = (id) => {
    const newData = data.filter(item => item.id !== id);
    setData(newData);
  };

  // Handle edit action
  const handleEdit = (id) => {
    // Implement edit functionality here, e.g., open a modal or navigate to an edit page
    console.log(`Edit category with id: ${id}`);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full table-auto border-collapse bg-white shadow-md rounded-lg">
        <thead className='text-left'>
          <tr className="bg-gray-200">
            <th
              className="px-4 py-2 border-b cursor-pointer"
              onClick={() => handleSort('category_name')}
            >
              Category Name
              {sortColumn === 'category_name' && (
                <span>{sortOrder === 'asc' ? ' 🔼' : ' 🔽'}</span>
              )}
            </th>
            <th
              className="px-4 py-2 border-b cursor-pointer"
              onClick={() => handleSort('status')}
            >
              Status
              {sortColumn === 'status' && (
                <span>{sortOrder === 'asc' ? ' 🔼' : ' 🔽'}</span>
              )}
            </th>
            <th className="px-4 py-2 border-b">Created At</th>
            <th className="px-4 py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="px-4 py-2 border-b">{row.category_name}</td>
              <td className="px-4 py-2 border-b">{row.status}</td>
              <td className="px-4 py-2 border-b">{new Date(row.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-2 border-b flex space-x-2">
                <button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                  onClick={() => handleEdit(row.id)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                  onClick={() => handleDelete(row.id)}
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
            onClick={() => handlePageChange(0)}
            disabled={pageIndex === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            {'<<'}
          </button>
          <button
            onClick={() => handlePageChange(pageIndex - 1)}
            disabled={pageIndex === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            {'<'}
          </button>
          <span>
            Page {pageIndex + 1} of {Math.ceil(data.length / pageSize)}
          </span>
          <button
            onClick={() => handlePageChange(pageIndex + 1)}
            disabled={pageIndex >= Math.ceil(data.length / pageSize) - 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            {'>'}
          </button>
          <button
            onClick={() => handlePageChange(Math.ceil(data.length / pageSize) - 1)}
            disabled={pageIndex >= Math.ceil(data.length / pageSize) - 1}
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

export default CategoryTable;