import React, { useState, useRef } from 'react'
import { createUser } from '../services/Users'

export const CreateUser = ({ handleCreatedAlertClose }) => {
    const user_name_value = useRef(null)
    const password_value = useRef(null)
    const user_type_value = useRef(null)

    const [userDetails, setUserDetails] = useState({
        user_name: '',
        password: '',
        user_type: '',
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        createUser(userDetails)
            .then((res) => {
                // alert('Registered Successfully', res)
                user_name_value.current.value = ''
                password_value.current.value = ''
                user_type_value.current.value = ''
                handleCreatedAlertClose()
            })
            .catch((error) => alert('User not Created', error))
    }

    const handleUserChange = (e) => {
        // console.log(e.target.value)
        const { name, value } = e.target
        setUserDetails((prev) => {
            console.log(prev)
            return { ...prev, [name]: value }
        })
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center justify-around w-2/6 p-4 px-6 text-white rounded h-1/3 bg-slate-900"
            >
                <h1 className="mb-2 text-xl ">Create User</h1>

                <div className="flex justify-between w-full ">
                    <label>Username:</label>
                    <input
                        type="text"
                        name="user_name"
                        // defaultValue={userDetails.user_name}
                        ref={user_name_value}
                        onChange={handleUserChange}
                    />
                </div>
                <div className="flex justify-between w-full ">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        // defaultValue={userDetails.password}
                        ref={password_value}
                        onChange={handleUserChange}
                    />
                </div>
                <div className="flex justify-between w-full">
                    <label>Usertype:</label>
                    <input
                        type="text"
                        name="user_type"
                        // defaultValue={userDetails.user_type}
                        ref={user_type_value}
                        onChange={handleUserChange}
                    />
                </div>
                <input
                    className="w-1/3 bg-blue-800 "
                    type="submit"
                    value="Submit"
                />
            </form>
        </>
    )
}
