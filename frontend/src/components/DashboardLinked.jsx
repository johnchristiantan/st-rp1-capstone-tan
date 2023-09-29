import React, { useState, useEffect } from 'react'
import Chart1 from './Chart1'
import Chart2 from './Chart2'
import Chart3 from './Chart3'
import { getAllChartData } from '../services/ChartDataServices'

export const Dashboard = () => {
    const [chartData, setChartData] = useState(null) // Initialize with null

    useEffect(() => {
        // Fetch and update chart data as before
        getAllChartData()
            .then((res) => {
                if (res) {
                    const chartData = {
                        labels: res.map((data) => data.month),
                        datasets: [
                            {
                                label: 'Massage',
                                data: res.map((data) => data.massage),
                                backgroundColor: ['green'],
                                borderColor: ['gray'],
                            },
                            {
                                label: 'Spa',
                                data: res.map((data) => data.spa),
                                backgroundColor: ['red'],
                                borderColor: ['gray'],
                            },
                            {
                                label: 'Package',
                                data: res.map((data) => data.package),
                                backgroundColor: ['blue'],
                                borderColor: ['gray'],
                            },
                        ],
                    }
                    setChartData(chartData) // Update the state to trigger a re-render
                } else {
                    console.log('No data received from the API')
                }
            })
            .catch((error) => {
                console.log('Error fetching chart data:', error)
            })
    }, [])

    return (
        <div className="flex flex-col items-center justify-between h-screen mt-14 ">
            {/* Conditional rendering based on chartData */}
            {chartData ? (
                <>
                    <div className="p-4 m-2 bg-orange-100 rounded-lg w-[22rem]">
                        Daily Sales
                        <Chart1 chartData={chartData} />
                    </div>
                    <div className="p-4 m-2 bg-orange-100 rounded-lg w-[22rem]">
                        Monthly Sales
                        <Chart2 chartData={chartData} />
                    </div>
                    <div className="p-4 m-2 bg-orange-100 rounded-lg w-[22rem]">
                        Branch Sales Comparison
                        <Chart3 chartData={chartData} />
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    )
}
