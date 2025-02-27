'use client';

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement);

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
        setData(jsonData);
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
    return <div>Loading...</div>;
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
        data: data.map((entry) => entry.count), // Y-axis is the download count per day
        backgroundColor: 'rgb(160, 42, 192)',
        borderColor: 'rgb(75, 192, 42)',
        borderWidth: 1,
        fill: true, // Remove the fill under the line
        tension: 0.1, // Smooth the line a bit
      },
    ],
  };
  

  // Chart options for responsiveness and smaller size
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allow chart to take the container size
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Download Count',
        },
        ticks: {
          beginAtZero: true, // Start Y-axis from 0
        },
      },
    },
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '300px' }}>
      <h1>Monthly Download Dashboard</h1>

      {/* Month selector */}
      <input
        type="month"
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
      />

      {/* Line Chart */}
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default DownloadGraph;
