import React from 'react'
import { MdDeleteForever } from 'react-icons/md'

function TransactionList({
    transaction,
    handleSelectTransaction,
    handleDeleteConfirmation,
}) {
    return (
        <div className="flex flex-row w-[25rem] border border-gray-500 p-2 mt-4 rounded">
            {/* Transaction */}
            <div
                onClick={() => handleSelectTransaction(transaction)}
                className="flex flex-col p-2 text-black rounded"
            >
                <div className="w-[21rem]">
                    <div className="flex">
                        <div className="text-lg font-bold text-left">
                            {transaction.customer_name}
                        </div>
                    </div>
                    <div className="text-sm text-left text-gray-500">
                        {transaction.voucher_number}
                    </div>
                    <div className="text-sm text-left">
                        <span
                            className={`${
                                transaction.status === 'Booked'
                                    ? 'text-gray-500'
                                    : transaction.status === 'Ongoing'
                                    ? 'text-green-500'
                                    : ''
                            }`}
                        >
                            {transaction.status}
                        </span>
                    </div>
                    <div className="font-bold text-right">
                        {transaction.total_amount}
                    </div>
                </div>
            </div>
            {/* End of Transaction */}

            <div className="flex items-center justify-center w-1/12">
                <MdDeleteForever
                    className="text-xl text-center text-orange-500"
                    onClick={() =>
                        handleDeleteConfirmation(transaction.transaction_id_ur)
                    }
                />
            </div>
        </div>
    )
}

export default TransactionList
