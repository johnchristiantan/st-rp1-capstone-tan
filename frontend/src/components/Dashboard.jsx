import React from 'react'

export const Dashboard = () => {
    return (
        <div className="flex flex-col items-center justify-between h-screen mt-14 ">
            <div
                className="p-4 m-2 bg-orange-100 rounded-lg"
                style={{ height: '230px', width: '400px' }}
            >
                Massage
            </div>
            <div
                className="p-4 m-2 bg-orange-100 rounded-lg "
                style={{ height: '230px', width: '400px' }}
            >
                Spa
            </div>
            <div
                className="p-4 m-2 bg-orange-100 rounded-lg"
                style={{ height: '230px', width: '400px' }}
            >
                Package
            </div>
        </div>
    )
}
