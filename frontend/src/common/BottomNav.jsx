import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaChartBar, FaMoon, FaUserCircle } from 'react-icons/fa'

const BottomNav = () => {
    const bottomPages = [
        {
            name: 'Home',
            link: '/home',
            icon: <FaHome className="mb-1 text-lg text-orange-400 " />,
        },
        {
            name: 'Dashboard',
            link: '/dashboard',
            icon: <FaChartBar className="mb-1 text-lg text-orange-400 " />,
        },
        {
            name: 'Dark Mode',
            link: '/dark-mode',
            icon: <FaMoon className="mb-1 text-lg text-orange-400 " />,
        },
        {
            name: 'Profile',
            link: '/profile',
            icon: <FaUserCircle className="mb-1 text-lg text-orange-400" />,
        },
    ]

    return (
        <nav className="fixed bottom-0 left-0 w-full text-orange-400 bg-gray-100 shadow-lg md:h-16">
            {/* Bottom Navigation Links */}
            <ul className="flex items-center justify-between md:mt-0 md:mx-24 md:h-16">
                {bottomPages.map((page) => (
                    <div
                        className="transition-transform transition-bg hover:scale-110"
                        key={page.name}
                    >
                        <li className="flex flex-col items-center py-2 mx-1 md:mt-3 ">
                            <Link
                                to={page.link}
                                className="flex flex-col items-center "
                            >
                                {page.icon}
                                <span className="mt-1">{page.name}</span>
                            </Link>
                        </li>
                    </div>
                ))}
            </ul>

            {/* Circular "New Transaction" Button */}
            <div className="absolute transform -translate-x-1/2 bottom-10 left-1/2">
                <Link
                    to="/new-transaction"
                    className="flex items-center justify-center text-xl font-bold text-white bg-orange-400 border border-white rounded-full w-[3rem] h-[3rem]  hover:bg-orange-600 transition-transform transition-bg hover:scale-110 hover:shadow-md hover:text-white hover:border-orange-600"
                >
                    +
                </Link>
            </div>
        </nav>
    )
}

export default BottomNav
