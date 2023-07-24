import React, { useEffect, useState } from 'react'
import { getUsers } from '../services/Users'
import '../App.css'

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
        <div className="w-full flex-col justify-around bg-red-300">
            <div className="bg-blue-900 text-white w-5/6">
                <div className="w-5/6 h-6 flex flex-row font-bold">
                    <div className="th w-1/6">Username</div>
                    <div className="th w-1/6">Password</div>
                    <div className="th w-1/6">User_Type</div>
                </div>

                {userDetails.map((user, index) => {
                    return (
                        <>
                            <div className="w-5/6 h-6 flex flex-row text-left">
                                <div key={index} className="td w-1/6">
                                    {user.user_name}
                                </div>
                                <div className="td w-1/6">{user.password}</div>
                                <div className="td w-1/6">{user.user_type}</div>
                            </div>
                        </>
                    )
                })}
            </div>
        </div>
    )
}
