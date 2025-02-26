'use client';

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "../ui/table";
import { Button } from "../ui/button";


const DownloadEntryTable = () => {
  const [downloadEntries, setDownloadEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch download entries from the API
  useEffect(() => {
    const fetchDownloadEntries = async () => {
      try {
        const response = await fetch("/api/download-data?page=1&pageSize=10");
        const data = await response.json();
        setDownloadEntries(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchDownloadEntries();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Downloaded</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {downloadEntries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.name}</TableCell>
              <TableCell>{entry.last_name}</TableCell>
              <TableCell>{entry.email}</TableCell>
              <TableCell>{entry.downloaded ? "Yes" : "No"}</TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    alert(`Download link for ${entry.name} ${entry.last_name}`);
                    // Add any download logic here
                  }}
                >
                  Download
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DownloadEntryTable;
