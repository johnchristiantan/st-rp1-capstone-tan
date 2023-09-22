import { RxCross2 } from 'react-icons/rx';
import PrioInputFields from './PrioInputFields';
import BranchLists from './BranchLists'
import StatusLists from './StatusLists'
import ServiceCard from './ServiceCard'

const NewTransaction = () => {

  const handleClose = () => {
    console.log('Closed')
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    console.log('Here')
  }

  const handleAddService = () => {

  }

  return (
    <div className="flex flex-col items-center justify-center h-screen pt-16">
      <form
          className="flex flex-col justify-around w-[25rem] p-6 m-4  text-white border border-gray-500 rounded form1 px-15 items-left h-9/12"
          onSubmit={handleOnSubmit}
      >
          <div className="flex w-full">
              <h1 className="flex justify-between w-full mb-2 text-base font-bold text-left text-orange-600">
                  <span>New Transaction</span><button type='button' onClick={handleClose}><RxCross2 size={20} /></button>
              </h1>
          </div>
        < PrioInputFields />
        <BranchLists />
        <StatusLists />
        <ServiceCard />

          <div className="flex items-center justify-center w-full mt-4">
              <input
                  className="w-[30rem] p-1 bg-orange-400 rounded-lg hover:bg-orange-500 border-orange-400 border-2 hover:border-orange-500"
                  type="submit"
                  value="Submit"
              />
          </div>
      </form>
    </div>
  )
}

export default NewTransaction