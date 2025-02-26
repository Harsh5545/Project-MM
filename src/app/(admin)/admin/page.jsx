import DownloadGraph from '@/components/Charts/DownloadGraph';
import React from 'react';


export const metadata = {
  title: "Dashboard",
};


const page = () => {
  return (
    <div>
      <DownloadGraph/>
    </div>
  )
}

export default page