'use client'

import React, { useState, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle } from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown } from 'lucide-react'
import { Shimmer } from '@/components/ui/shimmer'
import Link from 'next/link'
import { useRouter } from 'next/navigation'


const ServicesTable = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState('asc')
  const [sortColumn, setSortColumn] = useState('mainTitle')
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')
  const [totalCount, setTotalCount] = useState(0) // To store the total count of records
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [selectedServiceId, setSelectedServiceId] = useState(null)

  const fetchServices = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/services/list?page=${pageIndex + 1}&pageSize=${pageSize}&searchTerm=${searchTerm}&sortBy=${sortColumn}&sortOrder=${sortOrder}`)
      const result = await response.json()

      if (result.Success) {
        setServices(result.data)
        setTotalCount(result.totalCount) // Assuming the API returns a `totalCount` field
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to fetch services. Please try again.",
          variant: "destructive",
        })
      }
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
  }, [pageIndex, pageSize, searchTerm, sortColumn, sortOrder])

  const handleSort = (column) => {
    const newSortOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc'
    setSortColumn(column)
    setSortOrder(newSortOrder)
  }

  const handleDeleteConfirmation = (id) => {
    setSelectedServiceId(id)
    setShowDeleteDialog(true)
  }

  const handleDelete = async () => {
    try {
      const response = await fetch('/api/services/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: selectedServiceId }),
      })
      const result = await response.json()
      if (result.Success) {
        toast({
          title: "Success",
          description: result?.Message,
        })
        fetchServices()
      } else {
        throw new Error(result?.Message || 'Failed to delete service')
      }
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete service. Please try again.",
        variant: "destructive",
      })
    } finally {
      setShowDeleteDialog(false)
    }
  }

  function handleServiceEdit(service) {
    router.push(`/admin/services/edit-service/${service.slug}`);
  }

  const totalPages = Math.ceil(totalCount / pageSize)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Manage Services </h1>
        <Button asChild>
          <Link href={'/admin/services/add-service'}>Add Service</Link>
        </Button>
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
                  <Shimmer className="w-full h-16" />
                </TableCell>
              </TableRow>
            ) : (
              services.map((service, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <img
                      src={service.image || 'https://ik.imagekit.io/giol62jyf/mypic_VLj2nrRSs.jpg'}
                      width={16}
                      height={16}
                      alt="Service"
                      className="w-16 h-16 object-cover rounded-full"
                    />
                  </TableCell>
                  <TableCell>{service.heading}</TableCell>
                  <TableCell>{service?.category?.category_name}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" onClick={() => handleServiceEdit(service)}>
                        Edit
                      </Button>
                      <Button variant="destructive" onClick={() => handleDeleteConfirmation(service.id)}>
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
          <Button variant="outline" size="sm" onClick={() => setPageIndex(0)} disabled={pageIndex === 0}>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setPageIndex(pageIndex - 1)} disabled={pageIndex === 0}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium">
            Page {pageIndex + 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={pageIndex >= totalPages - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex(totalPages - 1)}
            disabled={pageIndex >= totalPages - 1}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          {[10, 20, 30, 40, 50].map((size) => (
            <Button key={size} variant={pageSize === size ? 'default' : 'outline'} size="sm" onClick={() => setPageSize(size)}>
              {size}
            </Button>
          ))}
        </div>
      </div>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>Are you sure you want to delete this service? This action cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ServicesTable
