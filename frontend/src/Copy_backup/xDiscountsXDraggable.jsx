import { useEffect, useState } from 'react'
import { getAllDiscounts } from '../services/DiscountServices'
import Draggable from 'react-draggable'

export default function Discounts() {
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const [showButton, setShowButton] = useState(false)
    const [discounts, setDiscounts] = useState([
        {
            discount_code: 'MNL-1',
            discount_description: 'xxxx',
            percentage: 0.25,
        },
    ])

    const handleShowButton = () => {
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

    useEffect(() => {
        getAllDiscounts()
            .then((res) => {
                setDiscounts(res)
            })
            .catch((error) => {
                console.log('Error fetching discounts:', error)
            })
    }, [])

    return (
        <>
            <div className="flex flex-col items-center justify-start h-screen pt-16 bg-gray-10">
                <div className="flex flex-col w-[25rem] p-2 bg-slate-500 ">
                    <div className="flex text-[0.8rem] w-full justify-around text-white  bg-slate-500">
                        <div>Discount Code</div>
                        <div>Discount Description</div>
                        <div>Percentage</div>
                    </div>

                    {discounts ? (
                        discounts.map((discounts, index) => {
                            return (
                                <div key={index}>
                                    <div className="flex text-[0.8rem] w-full justify-around text-black bg-white mt-2">
                                        <div>{discounts.discount_code}</div>
                                        <div>
                                            {discounts.discount_description}
                                        </div>
                                        <div>{discounts.percentage}</div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <>
                            <div>Loading...</div>
                        </>
                    )}
                </div>

                <Draggable onStart={handleDragStart} onStop={handleDragStop}>
                    <div
                        className="Frame164 px-2 py-1.5 opacity-80 justify-center items-start gap-2.5 inline-flex"
                        style={{
                            cursor: 'move',
                        }}
                    >
                        <button
                            onDoubleClick={handleShowButton}
                            className="flex items-center justify-center w-10 h-10 border border-white rounded-full bg-amber-500"
                        >
                            +
                        </button>
                    </div>
                </Draggable>

                {showButton && (
                    <form className="flex flex-col justify-around w-[25rem] p-6 text-white bg-orange-600 rounded px-15 items-left h-9/12">
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
