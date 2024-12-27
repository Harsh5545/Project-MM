"use client" 
import React, { useState, useMemo } from 'react';
import { useTable, usePagination, useGlobalFilter } from 'react-table';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddServices from '../Add-Service/AddServices';

const ServicesTable = () => {
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const handleFormSubmit = (formData) => {
    setServices([...services, formData]);
    setShowForm(false);
  };

  const handleDelete = (index) => {
    const newServices = services.filter((_, i) => i !== index);
    setServices(newServices);
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Image',
        accessor: 'image', // Assuming you have an image field in formData
        Cell: ({ value }) => <img src={value} alt="Service" className="w-16 h-16 object-cover" />,
      },
      {
        Header: 'Title',
        accessor: 'mainTitle',
      },
      {
        Header: 'Category',
        accessor: 'category',
      },
      {
        Header: 'Actions',
        Cell: ({ row: { index } }) => (
          <div className="flex space-x-2">
            <Button
              type="button"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              onClick={() => console.log('Edit', index)}
            >
              Edit
            </Button>
            <Button
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
              onClick={() => handleDelete(index)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [services]
  );

  const data = useMemo(() => services, [services]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    setGlobalFilter,
    state: { globalFilter, pageIndex, pageSize },
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useGlobalFilter,
    usePagination
  );

  return (
    <div className="bg-gradient-to-r from-gray-200 to-gray-100 ">
      <div className="w-full mx-auto bg-white dark:bg-gray-800  p-8 space-y-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center">
          Services Table
        </h1>

        <Button
          type="button"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Close Form' : 'Add Service'}
        </Button>

        {showForm && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-6xl max-h-[80vh] overflow-y-auto">
              <AddServices onSubmit={handleFormSubmit} />
            </div>
          </div>
        )}

        <div className="mt-8">
          <Input
            type="text"
            value={globalFilter || ''}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white mb-4"
          />
          <table {...getTableProps()} className="min-w-full bg-white dark:bg-gray-800">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps()}
                      className="px-4 py-2 border-b-2 border-gray-300 dark:border-gray-600 text-left text-sm font-semibold text-gray-700 dark:text-gray-300"
                    >
                      {column.render('Header')}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map(row => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td
                        {...cell.getCellProps()}
                        className="px-4 py-2 border-b border-gray-300 dark:border-gray-600 text-sm text-gray-700 dark:text-gray-300"
                      >
                        {cell.render('Cell')}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <div>
              <Button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
              >
                Previous
              </Button>
              <Button
                onClick={() => nextPage()}
                disabled={!canNextPage}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg ml-2"
              >
                Next
              </Button>
            </div>
            <div>
              Page {pageIndex + 1} of {pageOptions.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesTable;