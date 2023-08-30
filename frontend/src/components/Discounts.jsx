import { useEffect, useState } from 'react'
import { getAllDiscounts } from '../services/DiscountServices'
import DiscountList from './DiscountList'
import { DiscountsAdd } from './DiscountsAdd'

export default function Discounts() {
    const [showButton, setShowButton] = useState(false)
    const [discounts, setDiscounts] = useState([])

    useEffect(() => {
        getAllDiscounts()
            .then((res) => {
                setDiscounts(res)
            })
            .catch((error) => {
                console.log('Error fetching discounts:', error)
            })
    }, [])

    const handleShowButton = () => {
        setShowButton((prev) => !prev)
    }

    const { discountsInputs, handleOnChange, handleOnSubmit } = DiscountsAdd()
    const handleDiscountSubmit = () => {
        handleOnSubmit()
            .then((res) => {
                setDiscounts(res)
                setShowButton(false) // Hide the form after submission
            })
            .catch((error) => {
                // Handle error if needed
            })
    }

    return (
        <>
            <div className="flex flex-col items-center justify-start h-screen pt-16 bg-gray-10">
                <DiscountList discounts={discounts} />

                <div className="Frame164 px-2 py-1.5 opacity-80 justify-center items-start gap-2.5 inline-flex">
                    <div className="flex items-center justify-center w-10 h-10 border border-white rounded-full bg-amber-500">
                        <button onClick={handleShowButton}>+</button>
                    </div>
                </div>

                {showButton && (
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
            </div>
        </>
    )
}
