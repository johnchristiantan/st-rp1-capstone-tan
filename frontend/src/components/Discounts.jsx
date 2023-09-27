import { useEffect, useState, useRef } from 'react'
import {
    getAllDiscounts,
    createdDiscount,
    deleteDiscount,
    editDiscount,
} from '../services/DiscountServices'
// import Draggable from 'react-draggable'

export default function Discounts() {
    const [showButton, setShowButton] = useState(false)
    const [discounts, setDiscounts] = useState([])

    // This handles the selection of a discount
    const [showDiscountCreateForm, setShowDiscountCreateForm] = useState(false) // This handles the selection of a discount (1/6)
    const [showSelectedDiscount, setShowSelectedDiscount] = useState(false) // This handles the selection of a discount (2/6)
    const [selectedDiscount, setSelectedDiscount] = useState(null) // This handles the selection of a discount (3/6)

    const [isDeleted, setIsDeleted] = useState(false)
    const [inputChanges, setInputChanges] = useState(selectedDiscount)
    const [isEdited, setIsEdited] = useState(false)
    const [createDiscountForm, setCreateDiscountForm] = useState(false)
    const [isCreateDiscountFormSubmitted, setIsCreateDiscountFormSubmitted] =
        useState(false)

    const [discountCode, setDiscountCode] = useState('')
    const [discountDescription, setDiscountDescription] = useState('')
    const [percentage, setPercentage] = useState(null)

    // Confirmation dialog state
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const [discountToDelete, setDiscountToDelete] = useState(null)

    //    DiscountAdd (1/3)
    const [discountsInputs, setDiscountsInputs] = useState({
        discount_code: '',
        discount_description: '',
        percentage: null,
    })

    // const [isDragging, setIsDragging] = useState(false)

    const handleShowButton = () => {
        setShowSelectedDiscount(false)
        setShowDiscountCreateForm((prev) => !prev)

        // Allow the button click only if not currently dragging
        // if (!isDragging) {
        //     setShowButton((prev) => !prev)
        // }
    }

    // const handleDragStart = () => {
    //     setIsDragging(true)
    // }

    // const handleDragStop = () => {
    //     setIsDragging(false)
    // }

    //    DiscountAdd (2/3)
    const handleOnChange = (e) => {
        const { name, value } = e.target
        setDiscountsInputs((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    //    DiscountAdd (3/3)
    const handleOnSubmit = (e) => {
        e.preventDefault()
        createdDiscount(discountsInputs)
            .then(() => getAllDiscounts())
            .then((res) => {
                setDiscounts(res)

                // Hide the form after successful creation
                setShowDiscountCreateForm(false)
            })
            .catch((error) => {
                console.log('Error creating or fetching discounts:', error)
                throw error // Rethrow the error to handle it in the main component if needed
            })
    }

    const handleOnCancelEdit = () => {
        setShowDiscountCreateForm(false)
        setShowSelectedDiscount((prev) => !prev)
    }

    // Data fetching
    useEffect(() => {
        getAllDiscounts()
            .then((res) => {
                setDiscounts(res)
            })
            .catch((error) => {
                console.log('Error fetching discounts:', error)
            })
    }, [isDeleted, isEdited, showDiscountCreateForm]) // [isCreateBranchFormSubmitted, isDeleted, isEdited]) // auto reload when submitted

    // This handles the selection of a discount (5/6)
    const discount_code_ur = useRef(null)
    const discount_description_ur = useRef(null)
    const percentage_ur = useRef(null)

    // This handles the selection of a discount (6/6)
    const handleSelectDiscount = (discount) => {
        console.log(discount)
        setShowDiscountCreateForm(false)
        setSelectedDiscount(discount)
        setShowSelectedDiscount(true)

        // Make sure to check if the refs are defined before setting their values
        if (discount_code_ur.current) {
            discount_code_ur.current.value = discount.discount_code
        }
        if (discount_description_ur.current) {
            discount_description_ur.current.value =
                discount.discount_description
        }
        if (percentage_ur.current) {
            percentage_ur.current.value = discount.percentage
        }
    }

    // Function to toggle the confirmation dialog
    const toggleDeleteConfirmation = (discount) => {
        setDiscountToDelete(discount)
        setShowDeleteConfirmation(!showDeleteConfirmation)
    }

    // Function to handle delete confirmation
    const handleDeleteConfirmation = () => {
        if (discountToDelete) {
            deleteDiscount(discountToDelete.discount_code)
                .then(() => {
                    setIsDeleted((prev) => !prev)
                    setShowSelectedDiscount(false)
                })
                .catch((error) => {
                    console.log(error)
                })
        }
        setShowDeleteConfirmation(false)
    }

    const handleEditSubmit = (e) => {
        e.preventDefault()
        const mergeObject = { ...selectedDiscount, ...inputChanges }
        editDiscount(mergeObject)
            .then((res) => {
                // alert('Edited successfully')
                console.log(res)
                setIsEdited((prev) => !prev)

                // Hide the form after successful edit
                setShowSelectedDiscount(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const handleOnChangeEdit = (e) => {
        const { name, value } = e.target
        setSelectedDiscount((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // Calculate the width for each column
    const columnWidth = 'calc(22rem / 3)' // This divides the available width by 3

    return (
        <>
            <div className="flex flex-col items-center justify-start h-screen pt-16 ">
                <div className="discountlist flex flex-wrap w-[22rem] max-w-md">
                    {/* DiscountList */}
                    {discounts ? (
                        discounts.map((discount, index) => (
                            <div
                                key={index}
                                className={`w-[25rem] md:w-1/2 lg:w-1/3 p-2 md:w-${columnWidth} lg:w-${columnWidth} `}
                            >
                                <div
                                    onClick={() =>
                                        handleSelectDiscount(discount)
                                    }
                                    className="bg-white border border-gray-400 shadow-lg rounded p-4 cursor-pointer h-[10rem] transition-transform transition-bg hover:scale-110 hover:shadow-md overflow-y-auto flex flex-col justify-center items-center text-center"
                                >
                                    <div className="text-sm font-bold">
                                        {discount.discount_description}
                                    </div>
                                    <div className="text-gray-500">
                                        {discount.percentage * 100}%
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                {/* End of DiscountList */}

                {/* <Draggable onStart={handleDragStart} onStop={handleDragStop}>
                    <div
                        className="Frame164 px-2 py-1.5 opacity-80 justify-center items-start gap-2.5 inline-flex"
                        style={{
                            cursor: 'move',
                        }}
                    > */}
                <button
                    onDoubleClick={handleShowButton}
                    // className="flex items-center justify-center w-10 h-10 text-xl font-bold text-white bg-orange-400 border border-white rounded-full hover:bg-orange-600"
                    className="w-[30rem] p-1  rounded-lg hover:text-orange-600 text-orange-500   hover:font-bold"
                >
                    Create New Discount
                </button>
                {/* </div>
                </Draggable> */}

                <div className="relative flex flex-col items-center justify-start h-screen pt-16">
                    {showDiscountCreateForm && (
                        <div className="fixed inset-0 z-20 flex items-center justify-center backdrop-blur-sm backdrop-brightness-50 backdrop-contrast-50 ">
                            <form
                                // className="flex flex-col justify-around w-[25rem] p-6 text-white rounded-lg px-15 items-left h-9/12 border-2 border-gray-500"
                                className="flex flex-col justify-around w-[22rem] p-6 text-white rounded-lg px-15 items-left border-2 border-gray-500 bg-white "
                                onSubmit={handleOnSubmit}
                            >
                                <div className="flex items-center w-full text-lg font-bold text-orange-500 ">
                                    <h1 className="mb-2 text-xl ">Discounts</h1>
                                </div>

                                <div className="flex justify-between w-full space-y-2 text-black">
                                    <label className="self-center">
                                        Discount Code
                                    </label>
                                    <div className="flex flex-col ">
                                        <input
                                            onChange={handleOnChange}
                                            className="w-[12rem] p-1 text-black border border-gray-500 rounded-lg"
                                            type="text"
                                            name="discount_code"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between w-full space-y-2 text-black ">
                                    <label className="self-center">
                                        Description:
                                    </label>
                                    <div className="flex flex-col ">
                                        <input
                                            onChange={handleOnChange}
                                            className="w-[12rem] p-1 text-black border border-gray-500 rounded-lg "
                                            type="text"
                                            name="discount_description"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-between w-full space-y-2 text-black">
                                    <label className="self-center">
                                        Percentage:
                                    </label>
                                    <div className="flex flex-col ">
                                        <input
                                            onChange={handleOnChange}
                                            className="w-[12rem] p-1 text-black border border-gray-500 rounded-lg"
                                            type="text"
                                            name="percentage"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-center w-full mt-4">
                                    <input
                                        className="w-[30rem] p-1 bg-orange-400 rounded-lg hover:bg-orange-500 border-orange-400 border-2 hover:border-orange-500"
                                        type="submit"
                                        value="Submit"
                                    />
                                </div>
                                <div className="flex items-center justify-between w-full mt-4 ">
                                    <input
                                        className="w-[30rem] p-1 bg-white rounded-lg hover:bg-orange-500 text-black border-2 border-orange-500 hover:text-white"
                                        type="button"
                                        onClick={handleShowButton}
                                        value="Cancel"
                                    />
                                </div>
                            </form>
                        </div>
                    )}
                </div>

                {showSelectedDiscount && (
                    <div className="fixed inset-0 z-20 flex items-center justify-center backdrop-blur-sm backdrop-brightness-50 backdrop-contrast-50 ">
                        <form
                            className="flex flex-col bg-white justify-around w-[25rem] p-6 text-white  rounded-lg border-2 border-gray-500 px-15 items-left h-9/12"
                            onSubmit={handleEditSubmit}
                        >
                            <div className="flex items-center w-full text-lg font-bold text-orange-500">
                                <h1 className="mb-2 text-xl ">Discounts</h1>
                            </div>

                            <div className="flex justify-between w-full space-y-2 text-black">
                                <label className="self-center">
                                    Discount Code
                                </label>
                                <div className="flex flex-col ">
                                    <input
                                        ref={discount_code_ur} // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
                                        onChange={handleOnChangeEdit}
                                        className="p-1 text-black w-[12rem] border border-gray-500 rounded-lg"
                                        type="text"
                                        name="discount_code"
                                        defaultValue={
                                            selectedDiscount
                                                ? selectedDiscount.discount_code
                                                : ''
                                        }
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between w-full space-y-2 text-black">
                                <label className="self-center">
                                    Description:
                                </label>
                                <div className="flex flex-col ">
                                    <input
                                        ref={discount_description_ur} // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
                                        onChange={handleOnChangeEdit}
                                        className="p-1 text-black w-[12rem] border border-gray-500 rounded-lg"
                                        type="text"
                                        name="discount_description"
                                        defaultValue={
                                            selectedDiscount
                                                ? selectedDiscount.discount_description
                                                : ''
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between w-full space-y-2 text-black">
                                <label className="self-center">
                                    Percentage:
                                </label>
                                <div className="flex flex-col ">
                                    <input
                                        ref={percentage_ur} // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
                                        onChange={handleOnChangeEdit}
                                        className="p-1 text-black w-[12rem] border border-gray-500 rounded-lg"
                                        type="text"
                                        name="percentage"
                                        defaultValue={
                                            selectedDiscount
                                                ? selectedDiscount.percentage
                                                : ''
                                        }
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-center w-full mt-4">
                                <input
                                    className="w-[30rem] p-1 bg-orange-400 rounded-lg hover:bg-orange-500 border-orange-400 border-2 hover:border-orange-500"
                                    type="submit"
                                    value="Update"
                                />
                            </div>
                            <div className="flex items-center justify-center w-full mt-4">
                                <input
                                    className="w-[30rem] p-1 bg-white rounded-lg hover:bg-orange-500 text-black border-2 border-orange-500 hover:text-white"
                                    type="button"
                                    onClick={handleOnCancelEdit}
                                    value="Cancel"
                                />
                            </div>
                            <div className="flex items-center justify-center w-full mt-4">
                                <input
                                    className="w-[30rem] p-1 rounded-full text-black hover:text-orange-500 "
                                    type="button"
                                    value="Delete"
                                    onClick={() =>
                                        toggleDeleteConfirmation(
                                            selectedDiscount
                                        )
                                    }
                                />
                            </div>
                        </form>
                    </div>
                )}
                {/* Delete confirmation dialog */}
                {showDeleteConfirmation && (
                    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-75">
                        <div className="p-4 bg-white rounded-lg">
                            <p className="text-lg">
                                Are you sure you want to delete this discount?
                            </p>
                            <div className="flex justify-end mt-4">
                                <button
                                    className="px-3 py-1 mr-2 text-white bg-red-500 rounded"
                                    onClick={handleDeleteConfirmation}
                                >
                                    Confirm
                                </button>
                                <button
                                    className="px-3 py-1 text-gray-800 bg-gray-400 rounded"
                                    onClick={() =>
                                        setShowDeleteConfirmation(false)
                                    }
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
