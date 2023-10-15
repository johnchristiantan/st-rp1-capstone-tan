import React, { useState, useEffect } from 'react'
import Chart1 from './Chart1'
import Chart2 from './Chart2'
import Chart3 from './Chart3'
import { getAllChartData } from '../services/ChartDataServices'

export const Dashboard = () => {
    const [chartData, setChartData] = useState(null)
    const [activeTab, setActiveTab] = useState('Chart1') // Initialize with 'Chart1'

    // Calculate the sum of Massage, Spa, and Package
    const calculateTotal = (data) => {
        // return data.Massage + data.Spa + data.Package
        return data.Massage
    }

    useEffect(() => {
        getAllChartData()
            .then((res) => {
                if (res) {
                    console.log('API Response:', res)

                    // Filter out data points where any of the values (Massage, Spa, Package) are null
                    const filteredData = res.filter(
                        (data) =>
                            data.Massage !== null &&
                            data.Spa !== null &&
                            data.Package !== null
                    )

                    const updatedChartData = {
                        labels: filteredData.map((data) => data.month),
                        datasets: [
                            {
                                label: 'Massage',
                                data: filteredData.map((data) => data.Massage),
                                backgroundColor: 'rgba(231, 111, 91, 1)',
                            },
                            {
                                label: 'Spa',
                                data: filteredData.map((data) => data.Spa),
                                backgroundColor: 'rgba(244, 162, 97, 1)',
                            },
                            {
                                label: 'Package',
                                data: filteredData.map((data) => data.Package),
                                backgroundColor: 'rgba(233, 196, 106, 1)',
                            },
                        ],
                    }
                    setChartData(updatedChartData)
                } else {
                    console.log('No data received from the API')
                }
            })
            .catch((error) => {
                console.log('Error fetching chart data:', error)
            })
    }, [])

    const handleTabChange = (tabName) => {
        setActiveTab(tabName)
    }

    const columnWidth = 'calc(22rem / 3)'

    return (
        <div className="flex flex-col items-center justify-between pt-2 mt-14">
            <div className="bg-white w-[22rem] shadow-md rounded-md m-4 p-2 h-[4rem]">
                <div className="text-center text-orange-400">Current Sales</div>
                <div className="text-xl font-bold text-center text-orange-400">
                    500,597
                </div>
            </div>
            <div className="flex">
                <button
                    className={`tab-button ${
                        activeTab === 'Chart1' ? 'active' : ''
                    } bg-white mt-1 mb-4 rounded-l-md text-black text-sm shadow-md hover:font-bold hover:bg-orange-400 hover:text-white focus:bg-orange-400 focus:text-white focus:font-bold`}
                    style={{ width: columnWidth }}
                    onClick={() => handleTabChange('Chart1')}
                >
                    Daily Sales
                </button>

                <button
                    className={`tab-button ${
                        activeTab === 'Chart2' ? 'active' : ''
                    } bg-white mt-1 mb-4 text-black shadow-md text-sm hover:font-bold hover:bg-orange-400 hover:text-white focus:bg-orange-400 focus:text-white focus:font-bold`}
                    style={{ width: columnWidth }}
                    onClick={() => handleTabChange('Chart2')}
                >
                    Monthly Sales
                </button>
                <button
                    className={`tab-button ${
                        activeTab === 'Chart3' ? 'active' : ''
                    } bg-white mt-1 mb-4 rounded-r-md h-10 text-black text-sm shadow-md hover:font-bold hover:bg-orange-400 hover:text-white focus:bg-orange-400 focus:text-white focus:font-bold`}
                    style={{ width: columnWidth }}
                    onClick={() => handleTabChange('Chart3')}
                >
                    Comparison
                </button>
            </div>

            {chartData ? (
                <div className="rounded-lg w-[22rem] h-[25rem] p-2 font-bold bg-white shadow-md">
                    {activeTab === 'Chart1' && (
                        <Chart1 chartData={chartData} height={380} />
                    )}
                    {activeTab === 'Chart2' && (
                        <Chart2 chartData={chartData} height={380} />
                    )}
                    {activeTab === 'Chart3' && (
                        <Chart3 chartData={chartData} height={380} />
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}

            <div className="bg-white w-[22rem] shadow-md rounded-md m-4 p-2 h-[4rem]"></div>
        </div>
    )
}
