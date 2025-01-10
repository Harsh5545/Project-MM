'use client'

import React, { useState, useMemo, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Loader2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown } from 'lucide-react'
import { Shimmer } from '@/components/ui/shimmer'
import AddServiceForm from '../Add-Service/AddServices'

const ServicesTable = () => {
  const { toast } = useToast()
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState('asc')
  const [sortColumn, setSortColumn] = useState('mainTitle')
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)

  const fetchServices = async () => {
    setLoading(true)
    try {
      // Replace this with your actual API call
      const response = await fetch('/api/services')
      const result = await response.json()
      setServices(result.data)
    } catch (error) {
      console.error('Error fetching services:', error)
      toast({
        title: "Error",
        description: "Failed to fetch services. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [])

  const handleSort = (column) => {
    const newSortOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc'
    setSortColumn(column)
    setSortOrder(newSortOrder)
  }

  const sortedData = useMemo(() => {
    return services
      .filter(item => 
        item.mainTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (a[sortColumn] < b[sortColumn]) return sortOrder === 'asc' ? -1 : 1
        if (a[sortColumn] > b[sortColumn]) return sortOrder === 'asc' ? 1 : -1
        return 0
      })
  }, [services, searchTerm, sortColumn, sortOrder])

  const paginatedData = sortedData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex)
  }

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize)
    setPageIndex(0)
  }

  const handleDelete = async (index) => {
    try {
      // Replace this with your actual delete API call
      await fetch(`/api/services/${services[index].id}`, { method: 'DELETE' })
      toast({
        title: "Success",
        description: "Service deleted successfully",
      })
      fetchServices()
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: "Failed to delete service. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleFormSubmit = async (formData) => {
    try {
      // Replace this with your actual add service API call
      await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      setShowForm(false)
      toast({
        title: "Success",
        description: "Service added successfully",
      })
      fetchServices()
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: "Failed to add service. Please try again.",
        variant: "destructive",
      })
    }
  }

  const TableShimmer = () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex space-x-4">
          <Shimmer className="h-12 w-1/4" />
          <Shimmer className="h-12 w-1/4" />
          <Shimmer className="h-12 w-1/4" />
          <Shimmer className="h-12 w-1/4" />
        </div>
      ))}
    </div>
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
              <DialogTitle>Add New Service</DialogTitle>
            </DialogHeader>
            <AddServiceForm onSubmit={handleFormSubmit} onClose={() => setShowForm(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex justify-between items-center mb-4">
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search services..."
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('image')}>
                  Image
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('mainTitle')}>
                  Title
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" onClick={() => handleSort('category')}>
                  Category
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4}>
                  <TableShimmer />
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((service, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <img src={service.image} alt="Service" className="w-16 h-16 object-cover rounded-full" />
                  </TableCell>
                  <TableCell>{service.mainTitle}</TableCell>
                  <TableCell>{service.category}</TableCell>
                  <TableCell>
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
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center items-center border-t pt-4 space-x-2">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(0)}
            disabled={pageIndex === 0}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pageIndex - 1)}
            disabled={pageIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            Page {pageIndex + 1} of {Math.ceil(sortedData.length / pageSize)}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(pageIndex + 1)}
            disabled={pageIndex >= Math.ceil(sortedData.length / pageSize) - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(Math.ceil(sortedData.length / pageSize) - 1)}
            disabled={pageIndex >= Math.ceil(sortedData.length / pageSize) - 1}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          {[10, 20, 30, 40, 50].map((size) => (
            <Button
              key={size}
              variant={pageSize === size ? "default" : "outline"}
              size="sm"
              onClick={() => handlePageSizeChange(size)}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServicesTable

