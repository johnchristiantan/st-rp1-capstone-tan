import React, { useState, useEffect } from 'react'
import Chart1 from './Chart1'
import Chart2 from './Chart2'
import Chart3 from './Chart3'
import { getAllChartData } from '../services/ChartDataServices'

// import { getTotalDiscountedAmountByServiceType } from '../../../server/model/Transactions'

export const Dashboard = () => {
    const [chartData, setChartData] = useState(null)
    const [activeTab, setActiveTab] = useState('Chart1') // Initialize with 'Chart1'

    useEffect(() => {
        getAllChartData()
            .then((res) => {
                if (res) {
                    const updatedChartData = {
                        labels: res.map((data) => data.month),
                        datasets: [
                            {
                                label: 'Massage',
                                data: res.map((data) => data.massage),
                                backgroundColor: 'rgba(231, 111, 91, 1)',
                                // backgroundColor: ['green'],
                                // borderColor: ['gray'],
                            },
                            {
                                label: 'Spa',
                                data: res.map((data) => data.spa),
                                backgroundColor: 'rgba(244, 162, 97, 1)',
                                // backgroundColor: ['red'],
                                // borderColor: ['gray'],
                            },
                            {
                                label: 'Package',
                                data: res.map((data) => data.package),
                                backgroundColor: 'rgba(233, 196, 106, 1)',
                                // backgroundColor: ['blue'],
                                // borderColor: ['gray'],
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
        // console.log('Active Tab:', tabName) // Log the active tab
        setActiveTab(tabName)
    }

    const [totalDiscountedByServiceType, setTotalDiscountedByServiceType] =
        useState([])

    useEffect(() => {
        // Call the getTotalDiscountedAmountByServiceType function here
        getTotalDiscountedAmountByServiceType('Massage')
            .then((result) => {
                if (result) {
                    setTotalDiscountedByServiceType(result)
                } else {
                    console.log(
                        'Failed to fetch total discounted amount by service type'
                    )
                }
            })
            .catch((error) => {
                console.error(
                    'Error fetching total discounted amount by service type:',
                    error
                )
            })
    }, [])

    const columnWidth = 'calc(22rem / 3)'

    return (
        <div className="flex flex-col items-center justify-between  mt-14 pt-2">
            <div className="bg-white w-[22rem] shadow-md rounded-md m-4 p-2 h-[4rem]">
                <div className=" text-center text-orange-400 ">
                    Current Sales
                </div>
                <div className=" text-center text-orange-400 font-bold text-xl ">
                    500,597
                </div>
            </div>
            <div>
                <div>
                    {totalDiscountedByServiceType.map((item) => (
                        <div key={item.service_type}>
                            <p>Service Type: {item.service_type}</p>
                            <p>
                                Total Discounted Amount:{' '}
                                {item.total_discounted_amount_per_type}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex ">
                <button
                    className={`tab-button ${
                        activeTab === 'Chart1' ? 'active' : ''
                    } bg-white mt-1 mb-4 rounded-l-md text-black text-sm shadow-md  hover:font-bold hover:bg-orange-400 hover:text-white focus:bg-orange-400 focus:text-white focus:font-bold`}
                    style={{ width: columnWidth }}
                    onClick={() => handleTabChange('Chart1')}
                >
                    Daily Sales
                </button>

                <button
                    className={`tab-button ${
                        activeTab === 'Chart2' ? 'active' : ''
                    } bg-white mt-1 mb-4 text-black  shadow-md text-sm hover:font-bold hover:bg-orange-400 hover:text-white  focus:bg-orange-400 focus:text-white focus:font-bold`}
                    style={{ width: columnWidth }}
                    onClick={() => handleTabChange('Chart2')}
                >
                    Monthly Sales
                </button>
                <button
                    className={`tab-button ${
                        activeTab === 'Chart3' ? 'active' : ''
                    }bg-white mt-1 mb-4 rounded-r-md h-10  text-black text-sm shadow-md  hover:font-bold hover:bg-orange-400 hover:text-white  focus:bg-orange-400 focus:text-white focus:font-bold`}
                    style={{ width: columnWidth }}
                    onClick={() => handleTabChange('Chart3')}
                >
                    Comparison
                </button>
            </div>

            {chartData ? (
                <div className=" rounded-lg w-[22rem] h-[25rem] p-2 font-bold bg-white    shadow-md  ">
                    {activeTab === 'Chart1' && (
                        <>
                            <Chart1 chartData={chartData} height={380} />
                        </>
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
