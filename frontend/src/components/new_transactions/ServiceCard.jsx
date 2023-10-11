import { useEffect, useState } from 'react'
import { IoMdAddCircle } from 'react-icons/io'
import AvailedServiceLists from './AvailedServiceLists'

export default function ServiceCard() {
    const [serviceCards, setServiceCards] = useState([{ id: 0, card: null }])
    const [serviceCardIndex, setServiceCardIndex] = useState(0)
    const [samting, setSampting] = useState(false)

    // const toDeleteServiceCardIndex = (CardIndex) => {

    //     // Filter out the card with the specified id
    //     setServiceCards(
    //         serviceCards.length > 0
    //         ? serviceCards.filter((card) => card.id !== CardIndex)
    //         : [{ id: 0, card: null }]
    //     )

    // }

    // const toDeleteServiceCardIndex = (CardIndex) => {
    //     // Find the index of the card with the specified id
    //     const indexToDelete = serviceCards.findIndex((card) => card.id === CardIndex);
    //     console.log("Find object: ", indexToDelete)

    //     if (indexToDelete !== -1) {
    //         // Remove the card from the array using splice
    //         const updatedServiceCards = [...serviceCards];
    //         updatedServiceCards.splice(indexToDelete, 1);

    //         // Update the state with the new array
    //         setServiceCards(updatedServiceCards);
    //     console.log("service: ", serviceCards)
    //     }
    //   }

    // const ServiceCardSample = (serviceCardIndex, visible=true) => {
    //     return (
    //       <>
    //       {visible && <div  key={serviceCardIndex} className='m-2' >
    //         <div className="z-10 w-full h-20 bg-blue-900 text">{serviceCardIndex}</div>
    //         <div className=''>
    //             <div className="relative flex flex-col w-full my-2 bg-red-500 h-[13rem] p-2 rounded-lg">
    //                 <AvailedServiceLists serviceCardIndex={serviceCardIndex} toDeleteServiceCardIndex={toDeleteServiceCardIndex} />
    //             </div>
    //         </div>
    //         </div>}
    //       </>
    //     )
    //   }

    const handleAddService = () => {
        // Get the last Service card in the array
        const lastServiceCardID =
            serviceCards.length > 0
                ? serviceCards[serviceCards.length - 1].id
                : 0

        // Check if it is the first card
        if (lastServiceCardID === 0 && serviceCardIndex === 0) {
            setServiceCards([
                {
                    id: serviceCardIndex,
                    card: (
                        <AvailedServiceLists
                            serviceCardIndex={serviceCardIndex}
                        />
                    ),
                },
            ])
            return setServiceCardIndex(serviceCardIndex + 1)
        }

        const newServiceCard = {
            id: serviceCardIndex,
            card: <AvailedServiceLists serviceCardIndex={serviceCardIndex} />,
        }
        setServiceCards((prevServiceCards) => [
            ...prevServiceCards,
            newServiceCard,
        ])
        setServiceCardIndex(serviceCardIndex + 1) // Increment the index
    }

    // Add a default first service card on mount
    useEffect(() => {
        // if (!samting) {
        handleAddService()
        // setSampting(true)
        // }
    }, [])

    // print if the serviceCard changed state
    useEffect(() => {
        console.log('New Service Cards', serviceCards)
        setSampting((prev) => !prev)
        console.log('Saamthing')
    }, [serviceCards])

    // print if the serviceCard changed state
    useEffect(() => {
        console.log('New Service Cards Index', serviceCardIndex)
    }, [serviceCardIndex])

    return (
        <>
            {serviceCards.map((card) => {
                return <div key={card.id}>{card.card}</div>
            })}

            <div className="flex justify-center mt-2">
                <button
                    type="button"
                    className="p-2 text-white bg-orange-400 rounded-lg"
                    onClick={handleAddService}
                >
                    <IoMdAddCircle />
                </button>
            </div>
        </>
    )
}
