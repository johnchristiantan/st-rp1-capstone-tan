import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaUsers, FaBuilding, FaPercent } from 'react-icons/fa'

import { FaHandsBound } from 'react-icons/fa6'

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
            icon: <FaHandsBound className="mr-2 " />,
        },
        {
            name: 'Discounts',
            link: '/discounts',
            icon: <FaPercent className="mr-2 " />,
        },
    ]
    const [open, setOpen] = useState(true)

    return (
        <>
            <nav className="fixed top-0 left-0 z-50 w-full pb-8 pl-4 text-white shadow-lg bg-amber-400 md:p-0 md-flex md:h-16">
                <span className="absolute top-4 left-4">
                    <img src={logoImage} alt="Logo" className="mr-2" />{' '}
                </span>
                <ul
                    className={`mt-14 md:mt-0 justify-around md:mx-24 md:h-16 ${
                        open && 'hidden'
                    } md:flex`}
                >
                    {pages.map((page) => {
                        return (
                            <li className="py-2 md:mt-3" key={page.name}>
                                <Link
                                    to={page.link}
                                    onClick={() => setOpen(!open)}
                                >
                                    {page.name}
                                </Link>
                            </li>
                        )
                    })}
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
