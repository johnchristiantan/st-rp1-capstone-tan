import React, { useState } from 'react'
import { createUser } from '../services/Users'

export const CreateUser = ({
    handleCreatedAlertClose,
    handleFormVisibility,
}) => {
    const [isCreateUserVisible, setIsCreateUserVisible] = useState(false)

    const [userDetails, setUserDetails] = useState({
        user_name: '',
        password: '',
        first_name: '',
        last_name: '',
        user_type: '',
    })

    const [formErrors, setFormErrors] = useState({})

    const handleUserChange = (e) => {
        const { name, value } = e.target
        setUserDetails((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const validate = (formInputs) => {
        const errors = {}
        if (!formInputs.user_name) {
            errors.user_name = 'Username is required!'
        } else if (formInputs.user_name.length < 8) {
            errors.user_name = 'Username must be more than 8 characters.'
        }

        if (!formInputs.password) {
            errors.password = 'Password is required!'
        }

        if (!formInputs.user_type) {
            errors.user_type = 'User type is required!'
        }

        return errors
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errors = validate(userDetails)
        setFormErrors(errors)

        if (Object.keys(errors).length === 0) {
            createUser(userDetails)
                .then(() => {
                    setUserDetails({
                        user_name: '',
                        password: '',
                        first_name: '',
                        last_name: '',
                        user_type: '',
                    })
                    handleCreatedAlertClose()
                    handleFormVisibility(false)
                    setIsCreateUserVisible(false) // Close the form
                })
                .catch((error) => {
                    console.error('User not Created', error)
                })
        }
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center">
                <button
                    onClick={() => setIsCreateUserVisible(true)}
                    className="w-[30rem] p-1 rounded-lg hover:text-orange-600 text-orange-500 hover:font-bold"
                >
                    Create New User
                </button>

                {isCreateUserVisible && (
                    <div className="fixed inset-0 z-20 flex items-center justify-center backdrop-blur-sm backdrop-brightness-50 backdrop-contrast-50">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col bg-white justify-around w-[22rem] p-6 text-white border-2 border-gray-500 rounded-lg px-15 items-left h-9/12"
                        >
                            <div className="flex items-center w-full">
                                <h1 className="mb-2 text-lg font-bold text-left text-orange-600">
                                    Create User
                                </h1>
                            </div>

                            <div className="flex justify-between w-full text-black">
                                <label>Username:</label>
                                <div className="flex flex-col ">
                                    <input
                                        className="w-[12rem] p-1 text-black border border-gray-600 rounded-lg"
                                        type="text"
                                        name="user_name"
                                        value={userDetails.user_name}
                                        onChange={handleUserChange}
                                    />
                                    <div className="text-red-400 x-[0.65rem] font-semibold my-1 ">
                                        {formErrors.user_name}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between w-full text-black">
                                <label>Password:</label>
                                <div className="flex flex-col ">
                                    <input
                                        className="w-[12rem] p-1 text-black border border-gray-600 rounded-lg"
                                        type="password"
                                        name="password"
                                        value={userDetails.password}
                                        onChange={handleUserChange}
                                    />
                                    <div className="text-red-400 text-[0.65rem] font-semibold my-1 ">
                                        {formErrors.password}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between w-full text-black">
                                <label>First Name:</label>
                                <div className="flex flex-col ">
                                    <input
                                        className="w-[12rem] p-1 text-black border border-gray-600 rounded-lg"
                                        type="text"
                                        name="first_name"
                                        value={userDetails.first_name}
                                        onChange={handleUserChange}
                                    />
                                    <div className="text-red-400 x-[0.65rem] font-semibold my-1 "></div>
                                </div>
                            </div>
                            <div className="flex justify-between w-full text-black">
                                <label>Last Name:</label>
                                <div className="flex flex-col ">
                                    <input
                                        className="w-[12rem] p-1 text-black border border-gray-600 rounded-lg"
                                        type="text"
                                        name="last_name"
                                        value={userDetails.last_name}
                                        onChange={handleUserChange}
                                    />
                                    <div className="text-red-400 x-[0.65rem] font-semibold my-1 "></div>
                                </div>
                            </div>
                            <div className="flex justify-between w-full text-black">
                                <label className="">Usertype:</label>
                                <div className="flex flex-col ">
                                    <input
                                        className="w-[12rem]  p-1 text-black border border-gray-600 rounded-lg"
                                        type="text"
                                        name="user_type"
                                        value={userDetails.user_type}
                                        onChange={handleUserChange}
                                    />
                                    <div className="text-red-400 text-[0.65rem] font-semibold my-1 ">
                                        {formErrors.user_type}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-center w-full">
                                <input
                                    className="w-[30rem] p-1 border hover:font-bold bg-orange-400 rounded-lg hover:bg-orange-500 border-orange-400 hover:border-orange-500"
                                    type="submit"
                                    value="Submit"
                                />
                            </div>
                            <div className="flex items-center justify-between w-full mt-4 ">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsCreateUserVisible(false)
                                    }
                                    className="w-[30rem] p-1 hover:font-bold bg-white rounded-lg hover:bg-orange-500 text-black border-2 border-orange-500 hover:text-white"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    )
}
