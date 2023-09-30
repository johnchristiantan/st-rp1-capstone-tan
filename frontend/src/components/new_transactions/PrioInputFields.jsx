import { NewTransFormTextInputData } from '../../data/FormData';
import useTransactionFormStore from '../../data/Store';

const PrioInputFields = () => {

  const { createTransactionInputField, setCreateTransactionInputField } = useTransactionFormStore()
    
  const handleOnChange = (e) => {
    const { name, value } = e.target
    setCreateTransactionInputField(name, value)

    console.log(name, value)
    console.log(createTransactionInputField)
  }

  return (
    <div>
        {
            NewTransFormTextInputData.map((data) => {
              return (
                <div key={data.id} >
                  <div className="flex justify-between w-full space-y-2 text-black">
                    <label className="self-center">
                        {data.label}
                    </label>
                    <div className={data.divClassName}>
                        <input
                            className={data.inputClassName}
                            type={data.inputType}
                            name={data.inputName}
                            onChange={handleOnChange}
                        />
                    </div>
                </div>
                </div>
              )
            })
          }
    </div>
  )
}

export default PrioInputFields