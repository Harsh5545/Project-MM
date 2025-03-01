'use client';

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement, Filler } from 'chart.js';
import { Shimmer } from '../ui/shimmer';

// Register chart components
ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement, Filler);

const DownloadGraph = () => {
  // Get current year and month
  const currentDate = new Date();
  const currentMonth = currentDate.toISOString().slice(0, 7); // Format as YYYY-MM

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth); // Default to current month

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/download-data/chart-data?month=${selectedMonth}`);
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await res.json();
        setData(jsonData?.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth]);

  // If loading, show a loading message
  if (loading) {
    return <Shimmer className="w-full h-full rounded-lg" />;
  }

  // If there's an error, show an error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Chart data
  const chartData = {
    // Labels (X-axis) - convert the dates to IST
    labels: data.map((entry) => {
      const utcDate = new Date(entry.date);
      const istDate = new Date(utcDate.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      
      const day = istDate.getDate();
      const month = istDate.getMonth() + 1; // Months are zero-indexed
      const year = istDate.getFullYear();
      
      return `${day < 10 ? '0' + day : day}-${month < 10 ? '0' + month : month}-${year}`;
    }),
    
    datasets: [
      {
        label: 'Download Count',
        data: data?.map((entry) => entry.count), // Y-axis is the download count per day
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Gradient background color
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        borderWidth: 3,
        fill: true, // Fill the area under the line
        tension: 0.4, // Smooth the line a bit
        pointRadius: 5, // Increase the point size for better visibility
        pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Point color
        pointBorderWidth: 2, // Border width for the points
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.4)', // Hover point background color
        hoverBorderColor: 'rgba(75, 192, 192, 1)', // Hover point border color
        hoverBorderWidth: 2, // Hover border width
      },
    ],
  };

  // Chart options for better styling and responsiveness
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to take the container size
    plugins: {
      tooltip: {
        enabled: true,
        mode: 'index', // Tooltip will show the data for the point being hovered over
        intersect: false,
        backgroundColor: 'rgba(0, 0, 0, 0.8)', // Dark background for tooltips
        titleColor: '#fff',
        bodyColor: '#fff',
        bodyFont: { size: 14 },
      },
      legend: {
        position: 'top',
        labels: {
          color: '#333',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
          font: { size: 16, weight: 'bold' },
          color: '#333',
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          font: { size: 12 },
          color: '#333',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Download Count',
          font: { size: 16, weight: 'bold' },
          color: '#333',
        },
        ticks: {
          beginAtZero: true,
          font: { size: 12 },
          color: '#333',
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
      {/* Month selector */}
      <div className="flex justify-center mb-4">
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="p-2 border rounded-lg shadow-md"
        />
      </div>

      {/* Line Chart */}
      <div className="w-full h-full">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default DownloadGraph;
