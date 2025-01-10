'use client'

import React, { useState, useMemo } from 'react'
import { useTable, usePagination, useGlobalFilter } from 'react-table'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import AddServiceForm from '../Add-Service/AddServices'

const ServicesTable = () => {
  const [services, setServices] = useState([])
  const [showForm, setShowForm] = useState(false)

  const handleFormSubmit = (formData) => {
    setServices([...services, formData])
    setShowForm(false)
  }

  const handleDelete = (index) => {
    const newServices = services.filter((_, i) => i !== index)
    setServices(newServices)
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Image',
        accessor: 'image',
        Cell: ({ value }) => <img src={value} alt="Service" className="w-16 h-16 object-cover rounded-full" />,
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
              variant="outline"
              onClick={() => console.log('Edit', index)}
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              onClick={() => handleDelete(index)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [services]
  )

  const data = useMemo(() => services, [services])

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
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Services Table</h1>
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogTrigger asChild>
            <Button>Add Service</Button>
          </DialogTrigger>
          <DialogContent className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-6xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              {/* <DialogTitle>Add New Service</DialogTitle> */}
            </DialogHeader > 
            <div > 
            <AddServiceForm onSubmit={handleFormSubmit} onClose={() => setShowForm(false)} /></div>
          </DialogContent>
        </Dialog>
      </div>

      <Input
        value={globalFilter || ''}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search services..."
        className="max-w-sm"
      />

      <div className="rounded-md border">
        <Table {...getTableProps()}>
          <TableHeader>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableHead {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row)
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            variant="outline"
          >
            Previous
          </Button>
          <Button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            variant="outline"
          >
            Next
          </Button>
        </div>
        <div>
          Page {pageIndex + 1} of {pageOptions.length}
        </div>
      </div>
    </div>
  )
}

export default ServicesTable

