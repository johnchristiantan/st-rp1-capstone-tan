import { useEffect, useState } from 'react'
import { getAllDiscounts } from '../services/DiscountServices'

export default function Discounts() {
    // THIS WILL HIDE AND SHOW THE INPUT BOXES
    // assign to the button onClick={handleShowButton}
    // make sure to put the form inside the parenthesis of {showButton && (FORM HERE)}
    const [showButton, setShowButton] = useState(false)

    const handleShowButton = () => {
        setShowButton((prev) => !prev)
    }
    // ----------------------------------------------------------------

    useEffect(() => {
        getAllDiscounts()
            .then((res) => {
                setDiscounts(res)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])
    return (
        <>
            <div className=" flex flex-col items-center justify-center h-screen bg-gray-10">
                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
                    <button onClick={handleShowButton}>+</button>
                </div>
                {showButton && (
                    <form className="flex flex-col justify-around w-10/12 p-6 text-white bg-orange-600 rounded px-15 items-left h-9/12">
                        <div className="flex items-center justify-center w-full">
                            <h1 className="mb-2 text-xl ">Discounts</h1>
                        </div>

                        <div className="flex justify-between w-full space-y-2">
                            <label className="self-center">Discount Code</label>
                            <div className="flex flex-col ">
                                <input
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
                                    className="p-1 text-black rounded"
                                    type="text"
                                    name="percent_share"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-center w-full px-6 mt-4">
                            <input
                                className="w-1/3 p-1 rounded-full  bg-cyan-900 hover:bg-teal-600"
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
