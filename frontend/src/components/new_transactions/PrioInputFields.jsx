import { NewTransFormTextInputData } from '../../data/FormData'
import useTransactionFormStore from '../../data/Store'

const PrioInputFields = ({ selectedTransaction, isEditMode }) => {
    const { createTransactionInputField, setCreateTransactionInputField } =
        useTransactionFormStore()
    // console.log('xxx', selectedTransaction)
    // console.log('mode', isEditMode)

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setCreateTransactionInputField(name, value)

        // console.log(name, value)
        // console.log(createTransactionInputField)
    }

    // console.log('yyy', selectedTransaction.transaction_date)
    // console.log('PRIO', selectedTransaction.branch_id)
    if (selectedTransaction !== null) {
        const date = new Date(selectedTransaction['transaction_date'])
        const formattedDate = date.toISOString().slice(0, 10)
        // console.log('date', formattedDate)
        selectedTransaction['transaction_date'] = formattedDate
    }

    return (
        <div>
            {NewTransFormTextInputData.map((data) => {
                return (
                    <div key={data.id}>
                        <div className="flex justify-between w-full space-y-2 text-black">
                            <label className="self-center">{data.label}</label>
                            <div className={data.divClassName}>
                                <input
                                    className={data.inputClassName}
                                    type={data.inputType}
                                    name={data.inputName}
                                    onChange={handleOnChange}
                                    defaultValue={
                                        selectedTransaction[data.inputName]
                                    }
                                />
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default PrioInputFields
