import { PlaceholderPattern } from '@/components/Admin-Components/placeholder-pattern';
import DownloadGraph from '@/components/Charts/DownloadGraph';
import SubscriptionGraph from '@/components/Charts/SubscriptionGraph';
import React from 'react';

// Metadata for the page
export const metadata = {
  title: "Dashboard",
};

// Main Page Component
const page = () => {
  return (
    <>

      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-2">

          <DownloadGraph />
          <SubscriptionGraph />

        </div>
      </div>


    </>
  );
}

export default page;
