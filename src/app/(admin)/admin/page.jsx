import DownloadGraph from '@/components/Charts/DownloadGraph';
import React from 'react';

// Metadata for the page
export const metadata = {
  title: "Dashboard",
};

// Main Page Component
const page = () => {
  return (
    <div>
      <div>
        <DownloadGraph />
      </div>

    </div>
  );
}

export default page;
