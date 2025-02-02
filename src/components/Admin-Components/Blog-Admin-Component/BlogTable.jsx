"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown } from "lucide-react";

export default function BlogTable() {
  const [blogs, setBlogs] = useState([]); // To store blogs from API
  const [searchTerm, setSearchTerm] = useState(""); // For search input
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortColumn, setSortColumn] = useState("title"); // Default sort by title
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [published, setPublished] = useState(""); // To handle filtering by published status
  const [blogToDelete, setBlogToDelete] = useState(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    fetchBlogs();
  }, [pageIndex, pageSize, searchTerm, sortColumn, sortOrder, published]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(
        `/api/blog/list-blog?page=${pageIndex + 1}&pageSize=${pageSize}&searchTerm=${searchTerm}&sortBy=${sortColumn}&sortOrder=${sortOrder}&published=${published}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch blogs");
      }
      const data = await response.json();
      setBlogs(data?.data || []); // Ensure `data?.data` is used if your API response is wrapped under `data`
    } catch (error) {
      console.error("Error fetching blogs:", error);
      toast({
        title: "Error",
        description: "Failed to fetch blogs. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSort = (column) => {
    const newSortOrder = sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newSortOrder);
  };

  const handleDelete = (blog) => {
    setBlogToDelete(blog);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!blogToDelete) return;

    try {
      const response = await fetch(`/api/blogs/${blogToDelete.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }

      setBlogs(blogs.filter((blog) => blog.id !== blogToDelete.id));
      toast({
        title: "Success",
        description: "Blog deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast({
        title: "Error",
        description: "Failed to delete blog. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setBlogToDelete(null);
    }
  };

  const handleEdit = (blog) => {
    router.push(`/blog/edit/${blog.id}`);
  };

  const paginatedBlogs = useMemo(() => {
    const startIndex = pageIndex * pageSize;
    return blogs.slice(startIndex, startIndex + pageSize); // Paginate data here
  }, [blogs, pageIndex, pageSize]);

  const totalPages = Math.ceil(blogs.length / pageSize);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl mb-5 font-bold">Manage Blog</h1>

      <div className="flex justify-between items-center mb-6">
        <Input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={() => router.push("blog/create")}>Add New Blog</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("image")}>
                Image
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("title")}>
                Title
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("category")}>
                Category
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedBlogs.map((blog) => (
            <TableRow key={blog.id}>
              <TableCell>
                <Image
                  src={blog.image || "/default-image.jpg"}
                  alt={blog.title}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </TableCell>
              <TableCell>{blog.title}</TableCell>
              <TableCell>{blog.category ? blog.category.category_name : "No category"}</TableCell>
              <TableCell>
                <Button variant="outline" className="mr-2" onClick={() => handleEdit(blog)}>
                  Edit
                </Button>
                <Button variant="destructive" onClick={() => handleDelete(blog)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-center items-center border-t pt-4 space-x-2 mt-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex(0)}
            disabled={pageIndex === 0}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex(pageIndex - 1)}
            disabled={pageIndex === 0}
          >
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
          {[5, 10, 20, 30, 50].map((size) => (
            <Button
              key={size}
              variant={pageSize === size ? "default" : "outline"}
              size="sm"
              onClick={() => setPageSize(size)}
            >
              {size}
            </Button>
          ))}
        </div>
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete this blog?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the blog and remove the data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
