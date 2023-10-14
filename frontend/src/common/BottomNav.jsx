import React from 'react'
import { Link } from 'react-router-dom'
import { FaHome, FaMoon, FaUserCircle, FaBookOpen } from 'react-icons/fa'
import { GiSecretBook } from 'react-icons/gi'
import { SiBookmeter } from 'react-icons/si'

const BottomNav = () => {
    const bottomPages = [
        {
            name: 'Home',
            link: '/booking',
            icon: <FaHome className="mb-1 text-lg text-orange-400 " />,
        },
        {
            name: 'Dashboard',
            link: '/dashboard',
            icon: <SiBookmeter className="mb-1 text-lg text-orange-400 " />,
        },
        {
            name: 'Booking',
            link: '/booking',
            icon: <FaBookOpen className="mb-1 text-lg text-orange-400 " />,
        },
        // {
        //     name: 'Dark Mode',
        //     link: '/dark-mode',
        //     icon: <FaMoon className="mb-1 text-lg text-orange-400 " />,
        // },
        {
            name: 'Profile',
            link: '/profile',
            icon: <FaUserCircle className="mb-1 text-lg text-orange-400" />,
        },
    ]

    // State to manage the visibility of NewTransaction component
    // const [isTransactionVisible, setIsTransactionVisible] = useState(false)

    // Function to toggle the visibility of NewTransaction component
    const toggleTransactionVisibility = () => {
        // setIsTransactionVisible(!isTransactionVisible)
    }

    return (
        <nav className="fixed bottom-0 left-0 z-50 w-full text-orange-400 bg-gray-100 shadow-lg md:h-16">
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
            {/* <div className="absolute transform -translate-x-1/2 bottom-10 left-1/2">
                <Link
                    to="/new-transaction"
                    className="flex items-center justify-center text-xl font-bold text-white bg-orange-400 border border-white rounded-full w-[3rem] h-[3rem]  hover:bg-orange-600 transition-transform transition-bg hover:scale-110 hover:shadow-md hover:text-white hover:border-orange-600"
                    // className="flex items-center justify-center text-xl font-bold text-white bg-orange-400 border border-white rounded-full w-[3rem] h-[3rem] hover:bg-orange-600 hover:scale-110 hover:shadow-md hover:text-white hover:border-orange-600 transition-transform transition-bg transition-shadow transition-colors"
                >
                    +
                </Link>
            </div> */}

            {/* <div className="absolute z-50 transform -translate-x-1/2 bottom-10 left-1/2">
                <Link
                    to="/new-transaction"
                    className="relative flex items-center justify-center text-xl font-bold text-white bg-orange-400 border border-white rounded-full w-[3rem] h-[3rem] overflow-hidden group"
                >
                    <span className="z-10">+</span>
                    <span className="absolute top-0 left-0 w-1/2 h-full transition-transform duration-500 ease-in-out transform translate-x-0 bg-orange-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-full"></span>
                    <span className="absolute top-0 right-0 w-1/2 h-full transition-transform duration-500 ease-in-out transform translate-x-0 bg-orange-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-full"></span>
                </Link>
            </div> */}
        </nav>
    )
}

export default BottomNav
