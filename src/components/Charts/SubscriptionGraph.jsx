'use client';

import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement, Filler } from 'chart.js';
import { Shimmer } from '../ui/shimmer';

// Register chart components
ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement, Filler);

const SubscriptionGraph = () => {
    const [data, setData] = useState([]); // Default to an empty array
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const currentDate = new Date();
    const currentMonth = currentDate.toISOString().slice(0, 7);
    const [selectedMonth, setSelectedMonth] = useState(currentMonth);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/download-data/subscription-data?month=${selectedMonth}`);
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await res.json();
                console.log(jsonData);
                setData(jsonData?.data || []); // Set empty array if data is undefined
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedMonth]);

    // If there's an error, show an error message
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Ensure `data` is always an array before using map()
    const chartData = {
        labels: data?.length > 0 ? data.map((entry) => entry.date) : [], // Safe check for empty data
        datasets: [
            {
                label: 'Subscription Count',
                data: data?.length > 0 ? data.map((entry) => entry.count) : [], // Safe check for empty data
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // Soft background color
                borderColor: 'rgba(255, 99, 132, 1)', // Line color
                borderWidth: 3,
                fill: true, // Fill the area under the line
                tension: 0.4, // Smooth the line
                pointRadius: 5, // Increase point size
                pointBackgroundColor: 'rgba(255, 99, 132, 1)', // Point color
                pointBorderWidth: 2, // Border width for points
                hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)', // Hover point background color
                hoverBorderColor: 'rgba(255, 99, 132, 1)', // Hover point border color
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
                    text: 'Subscription Count',
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
            {/* Shimmer loading effect */}
            {loading ? (
                <Shimmer className="w-full h-full rounded-lg" />
            ) : (
                <>
                    <div className="flex justify-center mb-4">
                        <input
                            type="month"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="p-2 border rounded-lg shadow-md"
                        />
                    </div>
                    <div className="w-full h-full">
                        {data?.length > 0 ? (
                            <Line data={chartData} options={chartOptions} />
                        ) : (
                            <div className='my-auto text-center'>No data available for the selected month.</div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default SubscriptionGraph;
