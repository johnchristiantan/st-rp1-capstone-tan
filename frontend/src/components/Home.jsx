import React from 'react'
import SpaHome from '../assets/images/Spa2.webp'
import useStore from '../data/Store'

export default function Home() {
    const { prioTransactionInputField, setPrioTransactionInputField } =
        useStore()

    const backgroundStyle = {
        backgroundImage: `url(${SpaHome})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh', // Set the height to cover the whole viewport
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
    }

    return (
        <div style={backgroundStyle}>
            <div>
                <button className="px-4 py-2 mr-4 font-bold text-white bg-orange-600 rounded-3xl hover:bg-blue-700">
                    Book Now
                </button>
                <button className="px-4 py-2 font-bold text-white bg-orange-600 rounded-3xl hover:bg-green-700">
                    Learn More
                </button>
            </div>
        </div>
    )
}
