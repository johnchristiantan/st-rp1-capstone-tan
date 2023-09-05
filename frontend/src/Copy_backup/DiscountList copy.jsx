import React from 'react'

function DiscountList({ discounts }) {
    return (
        //DiscountList
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
    )
}

export default DiscountList
