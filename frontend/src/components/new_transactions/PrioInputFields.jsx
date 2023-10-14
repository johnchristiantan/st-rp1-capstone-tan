import { NewTransFormTextInputData } from '../../data/FormData'
import useTransactionFormStore from '../../data/Store'

const PrioInputFields = ({ selectedTransaction=null, isEditMode }) => {
    const { createTransactionInputField, setCreateTransactionInputField } =
        useTransactionFormStore()

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setCreateTransactionInputField(name, value)
    }

    if (selectedTransaction !== null) {
        console.log("selectedTransaction: ", selectedTransaction)
        const date = new Date(selectedTransaction['transaction_date'])
        const formattedDate = date.toISOString().slice(0, 10)
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
                                        selectedTransaction
                                            ? selectedTransaction[
                                                  data.inputName
                                              ]
                                            : ''
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
