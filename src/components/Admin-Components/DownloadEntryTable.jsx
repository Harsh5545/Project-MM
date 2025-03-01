"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"
import { Download, FileSpreadsheet, Loader2 } from "lucide-react"
import * as XLSX from "xlsx"
import { useToast } from "@/hooks/use-toast"

const DownloadEntryTable = () => {
  const { toast } = useToast()
  const [downloadEntries, setDownloadEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [totalEntries, setTotalEntries] = useState(0)
  const [isExporting, setIsExporting] = useState(false)

  // Fetch download entries from the API
  useEffect(() => {
    const fetchDownloadEntries = async () => {
      setLoading(true)
      try {
        const response = await fetch(`/api/download-data?page=${currentPage}&pageSize=${pageSize}`)
        const data = await response.json()

        if (data.data) {
          setDownloadEntries(data.data)
          setTotalEntries(data.total || data.data.length)
          setTotalPages(Math.ceil((data.total || data.data.length) / pageSize))
        } else {
          setDownloadEntries([])
          setTotalPages(1)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        toast({
          title: "Error",
          description: "Failed to load download entries",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchDownloadEntries()
  }, [currentPage, pageSize, toast])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleDownload = (entry) => {
    // Implement your download logic here
    toast({
      title: "Download Started",
      description: `Downloading file for ${entry.name} ${entry.last_name}`,
    })
  }

  const exportToExcel = async () => {
    try {
      setIsExporting(true)

      // Fetch all entries for export
      const response = await fetch(`/api/download-data?page=1&pageSize=1000`)
      const result = await response.json()

      if (result.data) {
        // Prepare data for export
        const dataToExport = result.data.map((entry) => ({
          Name: entry.name,
          "Last Name": entry.last_name,
          Email: entry.email,
          Downloaded: entry.downloaded ? "Yes" : "No",
          "Download Date": entry.download_date ? new Date(entry.download_date).toLocaleString() : "N/A",
        }))

        // Create worksheet
        const worksheet = XLSX.utils.json_to_sheet(dataToExport)

        // Create workbook
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Download Entries")

        // Generate Excel file
        XLSX.writeFile(workbook, "download_entries.xlsx")

        toast({
          title: "Export Successful",
          description: `Exported ${dataToExport.length} entries to Excel`,
        })
      } else {
        throw new Error("Failed to fetch data for export")
      }
    } catch (error) {
      console.error("Error exporting data:", error)
      toast({
        title: "Export Failed",
        description: "There was an error exporting the data",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Card className="w-full shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-[#f9f5f0] to-[#eae6e0] dark:from-[#1a1a2e] dark:to-[#00001F] border-b flex flex-row justify-between items-center">
        <CardTitle className="text-2xl font-bold text-gray-800 dark:text-white">Download Entries</CardTitle>
        <Button
          variant="outline"
          className="bg-white dark:bg-[#1a1a2e] border-gray-300 dark:border-gray-700"
          onClick={exportToExcel}
          disabled={isExporting || loading}
        >
          {isExporting ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <FileSpreadsheet className="h-4 w-4 mr-2" />
          )}
          Export to Excel
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50 dark:bg-[#1a1a2e]">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Downloaded</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <TableRow key={index} className="hover:bg-gray-50 dark:hover:bg-[#1a1a2e]/50">
                      <TableCell>
                        <Skeleton className="h-6 w-[120px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-[120px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-[200px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-[80px]" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-[100px] ml-auto" />
                      </TableCell>
                    </TableRow>
                  ))
              ) : downloadEntries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No download entries found
                  </TableCell>
                </TableRow>
              ) : (
                downloadEntries.map((entry) => (
                  <TableRow key={entry.id} className="hover:bg-gray-50 dark:hover:bg-[#1a1a2e]/50 transition-colors">
                    <TableCell className="font-medium">{entry.name}</TableCell>
                    <TableCell>{entry.last_name}</TableCell>
                    <TableCell className="max-w-[250px] truncate">
                      <span className="block truncate" title={entry.email}>
                        {entry.email}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          entry.downloaded
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}
                      >
                        {entry.downloaded ? "Yes" : "No"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-white dark:bg-[#1a1a2e] border-gray-300 dark:border-gray-700"
                        onClick={() => handleDownload(entry)}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center p-4 border-t">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink isActive={page === currentPage} onClick={() => handlePageChange(page)}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default DownloadEntryTable

