import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
    FaBars,
    FaUsers,
    FaBuilding,
    FaTools,
    FaMoneyBillWave,
} from 'react-icons/fa'

import logoImage from '../common/PATH.png'
import BottomNav from './BottomNav'

const Nav = () => {
    const pages = [
        {
            name: 'Users',
            link: '/users',
            icon: <FaUsers className="mr-2 " />,
        },
        {
            name: 'Branches',
            link: '/branches',
            icon: <FaBuilding className="mr-2" />,
        },
        {
            name: 'Services',
            link: '/services',
            icon: <FaTools className="mr-2" />,
        },
        {
            name: 'Discounts',
            link: '/discounts',
            icon: <FaMoneyBillWave className="mr-2 " />,
        },
    ]
    const [open, setOpen] = useState(true)

    return (
        <>
            <nav className="fixed top-0 left-0 w-full pb-8 pl-4 text-white shadow-lg bg-amber-400 md:p-0 md-flex md:h-16">
                <span className="absolute top-4 left-4">
                    <Link to="/">
                        <img src={logoImage} alt="Logo" className="mr-2" />
                    </Link>
                </span>
                <ul
                    className={`mt-14 md:mt-0 justify-around md:mx-24 md:h-16 ${
                        open ? 'hidden' : 'flex justify-center items-center'
                    } md:flex`}
                >
                    {pages.map((page) => (
                        <div
                            className="transition-transform transition-bg hover:scale-110"
                            key={page.name}
                        >
                            <li className="py-1 text-white md:mt-2">
                                <Link
                                    to={page.link}
                                    onClick={() => setOpen(!open)}
                                >
                                    <div className="flex flex-col items-center">
                                        {' '}
                                        {/* Use flexbox to stack elements */}
                                        {page.icon}
                                        <span className="mt-1">
                                            {page.name}
                                        </span>{' '}
                                        {/* Add margin-top for spacing */}
                                    </div>
                                </Link>
                            </li>
                        </div>
                    ))}
                </ul>

                <button onClick={() => setOpen(!open)}>
                    <span className="absolute flex items-center text-2xl md:hidden right-4 top-4 ">
                        {open ? (
                            <FaBars style={{ color: 'white' }} />
                        ) : (
                            <FaBars style={{ color: 'red' }} />
                        )}
                    </span>
                </button>
            </nav>

            <nav>
                <BottomNav />
            </nav>
        </>
    )
}

export default Nav
