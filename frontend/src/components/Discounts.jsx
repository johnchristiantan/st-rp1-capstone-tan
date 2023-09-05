import { useEffect, useState, useRef } from 'react'
import {
    getAllDiscounts,
    createdDiscount,
    deleteDiscount,
    editDiscount,
} from '../services/DiscountServices'

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

    // Confirmation dialog state
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const [discountToDelete, setDiscountToDelete] = useState(null)

    //    DiscountAdd (1/3)
    const [discountsInputs, setDiscountsInputs] = useState({
        discount_code: '',
        discount_description: '',
        percentage: null,
    })

    const handleShowButton = () => {
        setShowSelectedDiscount(false)
        setShowDiscountCreateForm((prev) => !prev)
    }

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

    return (
        <>
            <div className="flex flex-col items-center justify-start h-screen pt-16 bg-gray-10">
                {/* DiscountList */}
                <div className="flex flex-col w-[25rem] p-2 bg-slate-500">
                    <div className="flex text-[0.8rem] w-full justify-around text-white bg-slate-500">
                        <div>Discount Code</div>
                        <div>Discount Description</div>
                        <div>Percentage</div>
                    </div>

                    {discounts ? (
                        discounts.map((discount, index) => (
                            <div
                                key={index}
                                onClick={() => handleSelectDiscount(discount)} // This onClick handler triggers the selection of a discount (5/5)
                                className="flex text-[0.8rem] w-full justify-around text-black bg-white mt-2"
                            >
                                <div>{discount.discount_code}</div>
                                <div>{discount.discount_description}</div>
                                <div>{discount.percentage}</div>
                            </div>
                        ))
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
                {/* End of DiscountList */}

                <div className="Frame164 px-2 py-1.5 opacity-80 justify-center items-start gap-2.5 inline-flex">
                    <div className="flex items-center justify-center w-10 h-10 border border-white rounded-full bg-amber-500">
                        <button onClick={handleShowButton}>+</button>
                    </div>
                </div>

                {showDiscountCreateForm && (
                    <form
                        className="flex flex-col justify-around w-[25rem] p-6 text-white bg-orange-600 rounded px-15 items-left h-9/12"
                        onSubmit={handleOnSubmit}
                    >
                        <div className="flex items-center justify-center w-full">
                            <h1 className="mb-2 text-xl ">Discounts</h1>
                        </div>

                        <div className="flex justify-between w-full space-y-2">
                            <label className="self-center">Discount Code</label>
                            <div className="flex flex-col ">
                                <input
                                    onChange={handleOnChange}
                                    className="p-1 text-black rounded"
                                    type="text"
                                    name="discount_code"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between w-full space-y-2">
                            <label className="self-center">Description:</label>
                            <div className="flex flex-col ">
                                <input
                                    onChange={handleOnChange}
                                    className="p-1 text-black rounded "
                                    type="text"
                                    name="discount_description"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between w-full space-y-2">
                            <label className="self-center">Percentage:</label>
                            <div className="flex flex-col ">
                                <input
                                    onChange={handleOnChange}
                                    className="p-1 text-black rounded"
                                    type="text"
                                    name="percentage"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-center w-full px-6 mt-4">
                            <input
                                className="w-1/3 p-1 rounded-full bg-cyan-900 hover:bg-teal-600"
                                type="submit"
                                value="Submit"
                            />
                        </div>
                    </form>
                )}

                {showSelectedDiscount && (
                    <form
                        className="flex flex-col justify-around w-[25rem] p-6 text-white bg-orange-600 rounded px-15 items-left h-9/12"
                        onSubmit={handleEditSubmit}
                    >
                        <div className="flex items-center justify-center w-full">
                            <h1 className="mb-2 text-xl ">Discounts</h1>
                        </div>

                        <div className="flex justify-between w-full space-y-2">
                            <label className="self-center">Discount Code</label>
                            <div className="flex flex-col ">
                                <input
                                    ref={discount_code_ur} // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
                                    onChange={handleOnChangeEdit}
                                    className="p-1 text-black rounded"
                                    type="text"
                                    name="discount_code"
                                    defaultValue={
                                        selectedDiscount
                                            ? selectedDiscount.discount_code_ur
                                            : ''
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex justify-between w-full space-y-2">
                            <label className="self-center">Description:</label>
                            <div className="flex flex-col ">
                                <input
                                    ref={discount_description_ur} // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
                                    onChange={handleOnChangeEdit}
                                    className="p-1 text-black rounded"
                                    type="text"
                                    name="discount_description"
                                    defaultValue={
                                        selectedDiscount
                                            ? selectedDiscount.discount_description_ur
                                            : ''
                                    }
                                />
                            </div>
                        </div>

                        <div className="flex justify-between w-full space-y-2">
                            <label className="self-center">Percentage:</label>
                            <div className="flex flex-col ">
                                <input
                                    ref={percentage_ur} // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
                                    onChange={handleOnChangeEdit}
                                    className="p-1 text-black rounded"
                                    type="text"
                                    name="percentage"
                                    defaultValue={
                                        selectedDiscount
                                            ? selectedDiscount.percentage_ur
                                            : ''
                                    }
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-around w-full gap-2 px-6 mt-4 ">
                            <input
                                className="w-1/3 p-1 rounded-full bg-cyan-900 hover:bg-teal-600 "
                                type="submit"
                                value="Update"
                            />
                            <input
                                className="w-1/3 p-1 rounded-full bg-cyan-900 hover:bg-teal-600 "
                                type="button"
                                value="Delete"
                                // onClick={() =>
                                //     handleDeleteDiscount(
                                //         selectedDiscount.discount_code
                                //     )
                                // }
                                onClick={() =>
                                    toggleDeleteConfirmation(selectedDiscount)
                                }
                            />
                            <input
                                className="w-1/3 p-1 rounded-full bg-slate-900 hover:bg-teal-600 "
                                type="button"
                                onClick={handleOnCancelEdit}
                                value="Cancel"
                            />
                        </div>
                    </form>
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
