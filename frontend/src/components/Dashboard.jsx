import React from 'react'
import { useState, useEffect } from 'react'
import Chart1 from './Chart1'
import Chart2 from './Chart2'
import Chart3 from './Chart3'
import { getAllChartData } from '../services/ChartDataServices'

export const Dashboard = () => {
    const [chartData, setChartData] = useState([])

    const UserData = [
        {
            id: 1,
            month: 'Jan',
            Massage: 1010,
            Spa: 823,
            Package: 900,
        },
        {
            id: 2,
            month: 'Feb',
            Massage: 1010,
            Spa: 823,
            Package: 900,
        },
        {
            id: 3,
            month: 'Mar',
            Massage: 1010,
            Spa: 823,
            Package: 900,
        },
        {
            id: 4,
            month: 'Apr',
            Massage: 1010,
            Spa: 823,
            Package: 900,
        },
        {
            id: 5,
            month: 'May',
            Massage: 1010,
            Spa: 823,
            Package: 900,
        },
        {
            id: 6,
            month: 'Jun',
            Massage: 1010,
            Spa: 823,
            Package: 900,
        },
        {
            id: 7,
            month: 'Jul',
            Massage: 1010,
            Spa: 823,
            Package: 900,
        },
        {
            id: 8,
            month: 'Aug',
            Massage: 1010,
            Spa: 823,
            Package: 900,
        },
        {
            id: 9,
            month: 'Sept',
            Massage: 1010,
            Spa: 823,
            Package: 900,
        },

        {
            id: 10,
            month: 'Oct',
            Massage: 1010,
            Spa: 823,
            Package: 900,
        },
        {
            id: 11,
            month: 'Nov',
            Massage: 1010,
            Spa: 823,
            Package: 900,
        },
        {
            id: 12,
            month: 'Dec',
            Massage: 1010,
            Spa: 823,
            Package: 900,
        },
    ]

    useEffect(() => {
        getAllChartData()
            .then((res) => {
                setChartData(res)
            })
            .catch((error) => {
                console.log('Error fetching chart data:', error)
            })
    }, [])

    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.month),
        datasets: [
            {
                label: 'Massage',
                data: UserData.map((data) => data.Massage),
                backgroundColor: ['green'],
                borderColor: ['gray'],
            },
            {
                label: 'Spa',
                data: UserData.map((data) => data.Spa),
                backgroundColor: ['red'],
                borderColor: ['gray'],
            },
            {
                label: 'Package',
                data: UserData.map((data) => data.Package),
                backgroundColor: ['blue'],
                borderColor: ['gray'],
            },
        ],
    })

    return (
        <div className="flex flex-col items-center justify-between h-screen mt-14 ">
            <div
                className="p-4 m-2 bg-orange-100 rounded-lg"
                style={{ height: '230px', width: '400px' }}
            >
                Daily Sales
                <Chart1 chartData={userData} />
            </div>
            <div
                className="p-4 m-2 bg-orange-100 rounded-lg "
                style={{ height: '230px', width: '400px' }}
            >
                Monthly Sales
                <Chart2 chartData={userData} />
            </div>
            <div
                className="p-4 m-2 bg-orange-100 rounded-lg"
                style={{ height: '230px', width: '400px' }}
            >
                Branch Sales Comparison
                <Chart3 chartData={userData} />
            </div>
        </div>
    )
}
