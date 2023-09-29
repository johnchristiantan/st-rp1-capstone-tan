import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'

function Chart1({ chartData, height }) {
    const chartOptions = {
        maintainAspectRatio: false, // Prevent the chart from maintaining aspect ratio
        responsive: true, // Make the chart responsive

        scales: {
            x: {
                grid: {
                    display: false, // Hide x-axis gridlines and tick marks
                },
            },
            y: {
                grid: {
                    display: false, // Hide y-axis gridlines and tick marks
                },
            },
        },

        plugins: {
            legend: {
                position: 'bottom', // Position the legend at the bottom
            },
        },
    }

    return (
        <div style={{ height: `${height}px` }}>
            <Bar data={chartData} options={chartOptions} />
        </div>
    )
}

export default Chart1
