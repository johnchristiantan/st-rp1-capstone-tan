{
    transactions.map((transaction, index) => (
        <div key={index} className="container flex flex-row rounded">
            {/* Other transaction elements */}
            <div className=" flex  justify-center w-1/12  bg-gray-200 items-start">
                <button
                    className="font-bold align-text-top"
                    onClick={() =>
                        handleDeleteClick(transaction.transaction_id)
                    }
                >
                    x
                </button>
            </div>
        </div>
    ))
}
