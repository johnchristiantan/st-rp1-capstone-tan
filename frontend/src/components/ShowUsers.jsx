import React, { useEffect, useState } from 'react'
import { getUsers } from '../services/Users'
import '../App.css'
import EditUser from './EditUser'

export const ShowUsers = () => {
    const [userDetails, setUserDetails] = useState([
        {
            user_name: 'JC',
            password: 'pass1234',
            user_type: 'admin',
        },
    ])

    useEffect(() => {
        getUsers()
            .then((users) => {
                setUserDetails(users)
                console.log(users)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <>
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs text-gray-400 uppercase bg-gray-700">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                User Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Password
                            </th>
                            <th scope="col" className="px-6 py-3">
                                User Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {userDetails.map((user) => {
                            return (
                                <>
                                    <tr className="bg-gray-800 border-gray-700">
                                        <td className="px-6 py-4">
                                            {user.user_name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.password}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.user_type}
                                        </td>
                                        <td className="flex gap-5 px-6 py-4">
                                            <EditUser user={user} />
                                            <button className="hover:text-red-600">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
