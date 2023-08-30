import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { FaUserCircle } from 'react-icons/fa'
import { AiOutlineHome } from 'react-icons/ai'
import logoImage from '../common/PATH.png'

// import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';

const Nav = () => {
    const pages = [
        {
            name: 'Home',
            link: '/home',
        },
        {
            name: 'Dashboard',
            link: '/dashboard',
        },
        {
            name: 'New Transaction',
            link: '/new-transaction',
        },
        {
            name: 'Users',
            link: '/users',
        },
        {
            name: 'Branches',
            link: '/branches',
        },
        {
            name: 'Services',
            link: '/services',
        },
        {
            name: 'Discounts',
            link: '/discounts',
        },
        {
            name: 'Settings',
            link: '/settings',
        },
        {
            name: 'Logout',
            link: '/logout',
        },
        {
            name: 'Light Mode',
            link: '/light-mode',
        },
    ]
    const [open, setOpen] = useState(true)
    return (
        <>
            <nav className="fixed top-0 left-0 w-full pb-8 pl-4 text-white shadow-lg bg-amber-400 md:p-0 md-flex md:h-16">
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
                                {/* <a
                                    href={page.link}
                                    onClick={() => setOpen(!open)}
                                >
                                    {' '}
                                    {page.name}
                                </a> */}
                            </li>
                        )
                    })}
                    {/* <button className="p-1 mt-2 bg-red-600 rounded-md md:h-10 md:mt-3"> */}
                    {/* Contact Me */}
                    {/* </button> */}
                </ul>

                <button onClick={() => setOpen(!open)}>
                    <span className="absolute flex items-center text-2xl md:hidden right-4 top-4">
                        <FaUserCircle className="mr-2 text-white" />
                        <AiOutlineHome className="mr-2 text-white" />

                        {open ? (
                            <FaBars style={{ color: 'white' }} />
                        ) : (
                            <FaBars style={{ color: 'red' }} />
                        )}
                    </span>
                </button>
            </nav>
        </>
    )
}

export default Nav
