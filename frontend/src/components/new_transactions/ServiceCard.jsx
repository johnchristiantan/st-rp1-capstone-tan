import { useEffect, useState } from 'react'
import { IoMdAddCircle } from 'react-icons/io'
import AvailedServiceLists from './AvailedServiceLists'

export default function ServiceCard() {
    const [serviceCards, setServiceCards] = useState([{ id: 0, card: null }])
    const [serviceCardIndex, setServiceCardIndex] = useState(0)

    const toDeleteServiceCardIndex = (CardIndex) => {
        console.log("Card to be deleted: ", CardIndex)
        const newServiceCard = serviceCards.filter((card) => card.id !== CardIndex)
        setServiceCards(newServiceCard)
    }

    const ServiceCardSample = (serviceCardIndex) => {
        return (
          <>
            <div className="relative flex flex-col w-full my-2 bg-red-500 h-[13rem] p-2 rounded-lg">
                <AvailedServiceLists serviceCardIndex={serviceCardIndex} toDeleteServiceCardIndex={toDeleteServiceCardIndex} />
            </div>
          </>
        )
      }
    
    const handleAddService = () => {
        // Get the last Service card in the array
        const lastServiceCardID = serviceCards[serviceCards.length - 1].id
        console.log("checking the last serviceCard: ", lastServiceCardID)

        // Check if it is the first card
        if (lastServiceCardID === 0 && serviceCardIndex === 0) {
            setServiceCards([{id: serviceCardIndex, card: ServiceCardSample(serviceCardIndex)}])
            console.log("serviceCard inside 0", serviceCards)
            setServiceCardIndex(serviceCardIndex + 1)
            console.log("inside if")
            return
        }

        console.log("outside if")
        const newServiceCard = { id: serviceCardIndex, card: ServiceCardSample(serviceCardIndex) }
        setServiceCards(prevServiceCards => [...prevServiceCards, newServiceCard])
        setServiceCardIndex(serviceCardIndex + 1) // Increment the index
    }

    // Add a default first service card on mount
    useEffect(() => {
        handleAddService()
    }, [])

    // print if the serviceCard changed state
    useEffect(() => {
        console.log("New Service Cards", serviceCards)
    }, [serviceCards])
    
    // print if the serviceCard changed state
    useEffect(() => {
        console.log("New Service Cards Index", serviceCardIndex)
    }, [serviceCardIndex])
      
    return (
        <>
            {serviceCards.map(card => {
                return (
                    <div  key={card.id} >
                    {/* <div className="z-10 h-20 bg-blue-900 textw-full">{card.id}</div> */}
                        <div className=''>
                            {card.card}
                        </div>
                    </div>
                )
            })}
            
            <div className='flex justify-center mt-2'>
                <button type='button' className='p-2 text-white bg-orange-400 rounded-lg' onClick={handleAddService}><IoMdAddCircle /></button>
            </div>
        </>
    )
}