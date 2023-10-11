export const NewTransFormTextInputData = [
    {
        id: 1,
        label: 'Date:',
        divClassName: 'flex flex-col  w-[12rem]',
        inputClassName: 'p-1 text-black border  rounded',
        inputType: 'date',
        inputName: 'transaction_date',
    },
    {
        id: 2,
        label: 'Voucher No.:',
        divClassName: 'flex flex-col border  rounded',
        inputClassName: 'p-1 text-black rounded',
        inputType: 'text',
        inputName: 'voucher_number',
    },
    // {
    //     id: 3,
    //     label: 'First Name:',
    //     divClassName: 'flex flex-col',
    //     inputClassName: 'w-full p-1 text-black bg-white border border-gray-500 rounded',
    //     inputType: 'text',
    //     inputName: "first_name"
    // },
    // {
    //     id: 4,
    //     label: 'Last Name:',
    //     divClassName: 'flex flex-col',
    //     inputClassName: 'w-full p-1 text-black bg-white border border-gray-500 rounded',
    //     inputType: 'text',
    //     inputName: "last_name"
    // },
]

export const NewTransFormSelectInputData = [
    {
        id: 1,
        label: 'Branch:',
        inputName: 'branch',
    },
    {
        id: 2,
        label: 'Status:',
        inputName: 'status',
    },
]

export const statuses = [
    {
        id: 1,
        status: 'booked',
        name: 'Booked',
    },
    {
        id: 2,
        status: 'ongoing',
        name: 'Ongoing',
    },
    {
        id: 3,
        status: 'completed',
        name: 'Completed',
    },
    {
        id: 4,
        status: 'cancelled',
        name: 'Cancelled',
    },
]
