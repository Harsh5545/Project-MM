'use client'

import { useState, useEffect } from 'react'
import { useToast } from '@/hooks/use-toast'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Loader2, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown, Loader } from 'lucide-react'
import { Shimmer } from '@/components/ui/shimmer'



const AddCategoryDialog = ({ onCategoryAdded }) => {
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const categoryName = formData.get('category_name')
    const categoryImage = formData.get('category_image')
    const status = formData.get('status') === 'on'

    try {
      const response = await fetch('/api/category/add-category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryName, categoryImage, status }),
      })

      if (!response.ok) {
        throw new Error('Failed to add category')
      }

      const result = await response.json()
      setOpen(false)
      toast({
        title: "Success",
        description: "Category added successfully",
      })
      onCategoryAdded()
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: "Failed to add category. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add Category</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category_name" className="text-right">
              Name
            </Label>
            <Input
              id="category_name"
              name="category_name"
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category_image" className="text-right">
              Image URL
            </Label>
            <Input
              id="category_image"
              name="category_image"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Switch id="status" name="status" />
          </div>
          <Button type="submit" className="ml-auto" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />  
              </>
            ) : (
              'Add Category'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

const CategoryManagement = () => {
  const { toast } = useToast()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [sortOrder, setSortOrder] = useState('asc')
  const [sortColumn, setSortColumn] = useState('category_name')
  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [searchTerm, setSearchTerm] = useState('')

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/category/list')
      const result = await response.json()
      setData(result.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
      toast({
        title: "Error",
        description: "Failed to fetch categories. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSort = (column) => {
    const newSortOrder = sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc'
    setSortColumn(column)
    setSortOrder(newSortOrder)
  }

  const sortedData = data
    .filter(item => 
      item.category_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) return sortOrder === 'asc' ? -1 : 1
      if (a[sortColumn] > b[sortColumn]) return sortOrder === 'asc' ? 1 : -1
      return 0
    })

  const paginatedData = sortedData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize)

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex)
  }

  const handlePageSizeChange = (newPageSize) => {
    setPageSize(newPageSize)
    setPageIndex(0)
  }

  const handleDelete = async (id) => {
    try {
      const response = await fetch('/api/category/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })
      const result = await response.json()
      if (result.Success) {
        toast({
          title: "Success",
          description: result?.Message,
        })
        fetchData()
      } else {
        throw new Error(result?.Message || 'Failed to delete category')
      }
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete category. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (id) => {

    // Implement edit functionality here
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
    <div className="space-y-4"><h1 className="text-4xl font-bold">Manage category </h1>
      <div className="flex justify-between items-center mb-4">
      
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <AddCategoryDialog onCategoryAdded={fetchData} />
      </div>

      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] text-center">
                  <Button variant="ghost" onClick={() => handleSort('category_name')}>
                    Category Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-center">
                  <Button variant="ghost" onClick={() => handleSort('status')}>
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="text-center">Created At</TableHead>
                <TableHead className="text-center">Actions</TableHead>
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
                paginatedData.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-center">{row.category_name}</TableCell>
                    <TableCell className="font-medium text-center">{row.status}</TableCell>
                    <TableCell className="font-medium text-center">{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-center ">
                      <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEdit(row.id)}>
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(row.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
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

export default CategoryManagement