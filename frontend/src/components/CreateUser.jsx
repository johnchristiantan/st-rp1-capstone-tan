import React, { useEffect, useState, useRef } from 'react'
import { createUser } from '../services/Users'
import Draggable from 'react-draggable'

export const CreateUser = ({ handleCreatedAlertClose }) => {
    const user_name_value = useRef(null)
    const password_value = useRef(null)
    const first_name_value = useRef(null)
    const last_name_value = useRef(null)
    const user_type_value = useRef(null)
    const [isDragging, setIsDragging] = useState(false)

    const [showButton, setShowButton] = useState(false)

    // const [isDragging, setIsDragging] = useState(false)

    const handleShowButton = () => {
        setShowButton((prev) => !prev)

        // Allow the button click only if not currently dragging
        if (!isDragging) {
            setShowButton((prev) => !prev)
        }
    }

    const handleDragStart = () => {
        setIsDragging(true)
    }

    const handleDragStop = () => {
        setIsDragging(false)
    }

    const [userDetails, setUserDetails] = useState({
        user_name: '',
        password: '',
        first_name: '', // Corrected field name
        last_name: '',
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
                    first_name_value.current.value = ''
                    last_name_value.current.value = ''
                    user_type_value.current.value = ''
                    handleCreatedAlertClose()
                    setUserDetails({
                        user_name: '',
                        password: '',
                        first_name: '',
                        last_name: '',
                        user_type: '',
                    })
                })
                .catch((error) => {
                    console.log('User not Created', error)
                    setisSubmit(false)
                    setUserDetails({
                        user_name: '',
                        password: '',
                        first_name: '',
                        last_name: '',
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
            <div className="flex flex-col items-center justify-center ">
                <Draggable onStart={handleDragStart} onStop={handleDragStop}>
                    <div
                        className="Frame164 px-2 py-1.5 opacity-80 justify-center items-start gap-2.5 inline-flex"
                        style={{
                            cursor: 'move',
                        }}
                    >
                        <button
                            onDoubleClick={handleShowButton}
                            className="flex items-center justify-center w-10 h-10 text-xl font-bold text-white bg-orange-400 border border-white rounded-full hover:bg-orange-600"
                        >
                            +
                        </button>
                    </div>
                </Draggable>

                {showButton && (
                    <div className="fixed inset-0 z-20 flex items-center justify-center backdrop-blur-sm backdrop-brightness-50 backdrop-contrast-50 ">
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col bg-white justify-around w-[25rem] p-6 text-white border-2 border-gray-500  rounded-lg px-15 items-left h-9/12"
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
                                        // defaultValue={userDetails.user_name}
                                        ref={user_name_value}
                                        onChange={handleUserChange}
                                    />
                                    <div className="text-red-400 x-[0.65rem] font-semibold my-1 ">
                                        {formErrors.user_name}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between w-full text-black ">
                                <label>Password:</label>
                                <div className="flex flex-col ">
                                    <input
                                        className="w-[12rem] p-1 text-black border border-gray-600 rounded-lg "
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
                            <div className="flex justify-between w-full text-black">
                                <label>First Name:</label>
                                <div className="flex flex-col ">
                                    <input
                                        className="w-[12rem] p-1 text-black border border-gray-600 rounded-lg"
                                        type="text"
                                        name="first_name"
                                        ref={first_name_value}
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
                                        ref={last_name_value}
                                        onChange={handleUserChange}
                                    />
                                    <div className="text-red-400 x-[0.65rem] font-semibold my-1 "></div>
                                </div>
                            </div>
                            <div className="flex justify-between w-full text-black">
                                <label className="">Usertype:</label>
                                <div className="flex flex-col ">
                                    <input
                                        className="w-[12rem]  p-1 text-black border border-gray-600 rounded-lg "
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
                                    className="w-[30rem] p-1 border hover:font-bold bg-orange-400 rounded-lg hover:bg-orange-500 border-orange-400 hover:border-orange-500"
                                    type="submit"
                                    value="Submit"
                                />
                            </div>
                            <div className="flex items-center justify-between w-full mt-4 ">
                                <input
                                    className="w-[30rem] p-1 hover:font-bold bg-white rounded-lg hover:bg-orange-500 text-black border-2 border-orange-500 hover:text-white"
                                    type="button"
                                    onClick={handleShowButton}
                                    value="Cancel"
                                />
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    )
}
