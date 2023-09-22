import { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx';
import AvailedServiceLists from './AvailedServiceLists'

export default function ServiceCard() {
    const [serviceCards, setServiceCards] = useState([])
    const [servicesObject, setServicesObject] = useState([])
    const [serviceCardIndex, setServiceCardIndex] = useState(1)

    const handleDelete = () => {
        // Create a new array that excludes the last element
        const newServiceCard = serviceCards.slice(0, -1);
        setServiceCards(newServiceCard);
      }

    const ServiceCardSample = () => {
        return (
          <>
            <div className="flex flex-col w-full my-2 bg-red-500 h-[8rem] p-2">
                <div className='flex justify-end w-full'><button type='button' onClick={handleDelete}><RxCross2 size={20} /></button></div>
                <AvailedServiceLists />
            </div>
          </>
        )
      }

    //   const handleAddService = (index) => {
    //     setServiceCard(prev => [
    //       ...prev,
    //       { id: index, card: ServiceCardSample() }
    //     ]);
    //     console.log(serviceCard)
    //   };

    const handleAddService = () => {
        const newServiceCard = { id: serviceCardIndex, card: ServiceCardSample() };
        setServiceCards(prevServiceCards => [...prevServiceCards, newServiceCard]);
        setServiceCardIndex(serviceCardIndex + 1); // Increment the index
      };

    useEffect(() => {
        handleAddService()
        console.log("Service Cards", serviceCards)
    }, [])
      
    return (
        <>
            {serviceCards.map(card => {
                return (
                    <div key={card.id} className=''>
                        {card.card}
                    </div>
                )
            })}
            <div className='flex justify-center mt-2'>
                <button type='button' className='p-2 text-black bg-white rounded-lg' onClick={handleAddService}>Add Availed Service</button>
            </div>
        </>
    )
}