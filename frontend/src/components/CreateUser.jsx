import React, { useEffect, useState, useRef } from 'react'
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

    const [formErrors, setformErrors] = useState({}) // VALIDATION-2
    const [isSubmit, setisSubmit] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(validate(userDetails))
        setformErrors(validate(userDetails)) // VALIDATION-3
        // console.log(setformErrors(validate(userDetails)))
        setisSubmit(true)
        // alert('Hello')
    }

    useEffect(() => {
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            createUser(userDetails)
                .then((res) => {
                    setisSubmit(false)
                    // alert('Registered Successfully', res)
                    user_name_value.current.value = ''
                    password_value.current.value = ''
                    user_type_value.current.value = ''
                    handleCreatedAlertClose()
                    setUserDetails({
                        user_name: '',
                        password: '',
                        user_type: '',
                    })
                })
                .catch((error) => {
                    console.log('User not Created', error)
                    setisSubmit(false)
                    setUserDetails({
                        user_name: '',
                        password: '',
                        user_type: '',
                    })
                })
        }
    }, [isSubmit])

    const handleUserChange = (e) => {
        // console.log(e.target.value)
        const { name, value } = e.target
        setUserDetails((prev) => {
            console.log(prev)
            return { ...prev, [name]: value }
        })
    }

    // VALIDATION-1
    const validate = (formInputs) => {
        const errors = {}
        if (!formInputs.user_name) {
            errors.user_name = 'Username is required!'
        } else if (formInputs.user_name.length < 8) {
            errors.user_name = 'User must be more than 8 characters.'
        }

        if (!formInputs.password) {
            errors.password = 'Password is required!'
        }

        if (!formInputs.user_type) {
            errors.user_type = 'User type is required!'
        }

        return errors
    }

    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-around w-10/12 p-6 text-white bg-orange-600 rounded px-15 items-left h-9/12"
            >
                <div className="flex items-center justify-center w-full">
                    <h1 className="mb-2 text-xl ">Create User</h1>
                </div>

                <div className="flex justify-between w-full ">
                    <label>Username:</label>
                    <div className="flex flex-col ">
                        <input
                            className="p-1 text-black rounded"
                            type="text"
                            name="user_name"
                            // defaultValue={userDetails.user_name}
                            ref={user_name_value}
                            onChange={handleUserChange}
                        />
                        <div className="text-red-400 x-[0.65rem] font-semibold my-1 ">
                            {formErrors.user_name}
                        </div>
                    </div>
                </div>
                <div className="flex justify-between w-full ">
                    <label>Password:</label>
                    <div className="flex flex-col ">
                        <input
                            className="p-1 text-black rounded "
                            type="password"
                            name="password"
                            // defaultValue={userDetails.password}
                            ref={password_value}
                            onChange={handleUserChange}
                        />
                        <div className="text-red-400 text-[0.65rem] font-semibold my-1 ">
                            {formErrors.password}
                        </div>
                    </div>
                </div>
                <div className="flex justify-between w-full">
                    <label className="">Usertype:</label>
                    <div className="flex flex-col ">
                        <input
                            className="p-1 text-black rounded"
                            type="text"
                            name="user_type"
                            // defaultValue={userDetails.user_type}
                            ref={user_type_value}
                            onChange={handleUserChange}
                        />
                        <div className="text-red-400 text-[0.65rem] font-semibold my-1 ">
                            {formErrors.user_type}
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center w-full">
                    <input
                        className="w-1/3 p-1 rounded-full bg-amber-700 hover:amber-600"
                        type="submit"
                        value="Submit"
                    />
                </div>
            </form>
        </>
    )
}
