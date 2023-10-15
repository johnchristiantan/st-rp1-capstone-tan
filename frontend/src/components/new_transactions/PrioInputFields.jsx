import { NewTransFormTextInputData } from '../../data/FormData'
import useTransactionFormStore from '../../data/Store'
import { removeTimeStamp } from '../../utils/DateFormatter'

const PrioInputFields = ({ selectedTransaction = null, isEditMode }) => {
    const { createTransactionInputField, setCreateTransactionInputField } =
        useTransactionFormStore()

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setCreateTransactionInputField(name, value)
    }

    if (selectedTransaction !== null) {
        console.log('selectedTransaction: ', selectedTransaction)
        selectedTransaction['transaction_date'] = removeTimeStamp(
            selectedTransaction['transaction_date']
        )
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
