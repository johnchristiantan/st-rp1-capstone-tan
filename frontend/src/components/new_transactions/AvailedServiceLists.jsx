import { useState, useEffect } from 'react'
import { getAllServices } from '../../services/SpaServices'
import { getAllDiscounts } from '../../services/DiscountServices'
import useTransactionFormStore from '../../data/Store'
import { BiSolidSave } from 'react-icons/bi'
import { RxCross2 } from 'react-icons/rx'

export default function AvailedServiceLists({
    serviceCardIndex,
    toDeleteServiceCardIndex,
}) {
    const [services, setServices] = useState([])
    const [selectedServiceType, setSelectedServiceType] = useState('')
    const [filteredServiceNames, setFilteredServiceNames] = useState([])
    const [selectedServiceName, setSelectedServiceName] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [discounts, setDiscounts] = useState([])
    const [selectedDiscount, setSelectedDiscount] = useState('')
    const [showSubCard, setSubShowCard] = useState(true)

    const {
        setAvailedServices,
        availedServices,
        appendToAvailedServicesArray,
        availedServicesArray,
        removeFromAvailedServicesArray,
    } = useTransactionFormStore()

    // Get all service with a specific type
    let uniqueServices = services.filter(
        (service, index, self) =>
            index ===
            self.findIndex((s) => s.service_type === service.service_type)
    )

    useEffect(() => {
        async function fetchServices() {
            try {
                const fetchedServices = await getAllServices()
                // console.log('Fetched services: ', fetchedServices)
                setServices(fetchedServices)
                const fetchedDiscounts = await getAllDiscounts()
                // console.log('Fetched discounts: ', fetchedDiscounts)
                setDiscounts(fetchedDiscounts)
            } catch (error) {
                console.log('Error fetching services: ', error)
            }
        }
        fetchServices()
    }, [])

    // printing current state changes availedServices
    useEffect(() => {
        console.log('Availed Services On Save: ', availedServices)
        if (availedServices) {
            const x = async (availedServices) => {
                await appendToAvailedServicesArray(availedServices)
            }
            x(availedServices)
        }
    }, [availedServices])

    // printing current state changes for availedServicesArray
    useEffect(() => {
        console.log('Availed Services Array On Save: ', availedServicesArray)
    }, [availedServicesArray])

    // Service Type On Change Handler
    const handleServiceTypeChange = (event) => {
        const newServiceType = event.target.value
        setSelectedServiceType(newServiceType)

        // Filter the service names on the selected service type
        const filteredNames = services
            .filter((service) => service.service_type === newServiceType)
            .map((service) => service.service_name)

        // Provides option to the Service Name Dropdown
        setFilteredServiceNames(filteredNames)
        setSelectedServiceName('')
    }

    // Service Name On Change Handler
    const handleServiceNameChange = (event) => {
        const newServiceName = event.target.value
        setSelectedServiceName(newServiceName)
    }

    // Discount On Change Handler
    const handleDiscountOnChange = (event) => {
        const newDiscount = event.target.value
        setSelectedDiscount(newDiscount)
        // alert(newDiscount)
    }

    const handleSave = (e) => {
        // Guard Clause for the select input
        if (!selectedServiceType || !selectedServiceName) {
            return alert('Please provide service type and name!')
        }

        // Get the service ID by finding same type and name
        const serviceID = services.filter((service) => {
            return (
                service.service_type === selectedServiceType,
                service.service_name === selectedServiceName
            )
        })

        // Get the discount ID by finding discount_code
        // const discountID = discounts.filter((discount) => {
        //     return discount.discount_description === selectedDiscount
        // })

        // Set data to pass into the zustand
        const service_id = serviceID.length > 0 ? serviceID[0].service_id : null
        const availedPrice = serviceID.length > 0 ? serviceID[0].price : null
        // const discount_id =
        //     discountID.length > 0 ? discountID[0].discount_id : null

        // Append data in availedServices (zustand state)
        setAvailedServices('card_index', serviceCardIndex)
        setAvailedServices('service_id', service_id)
        setAvailedServices('availed_price', availedPrice)
        setAvailedServices('discount_id', parseInt(selectedDiscount))
        setAvailedServices('quantity', quantity)

        // alert('Save')
    }

    const handleDelete = async () => {
        console.log('Delete Card ID: ', serviceCardIndex)
        setSubShowCard(false)
        removeFromAvailedServicesArray(serviceCardIndex)
        // await toDeleteServiceCardIndex(serviceCardIndex)
    }

    return (
        <>
            {showSubCard && (
                <>
                    {/* {visible && <div  key={serviceCardIndex} className='m-2' > */}
                    {/* <div className="z-10 w-full h-20 bg-blue-900 text">{serviceCardIndex}</div> */}
                    <div className="">
                        <div className="relative flex flex-col w-full my-2 bg-red-500 h-[13rem] p-2 rounded-lg">
                            <div className="flex justify-end w-full">
                                <button type="button" onClick={handleDelete}>
                                    <RxCross2 size={20} />
                                </button>
                            </div>
                            <div className="absolute top-2 right-10">
                                <button type="button" onClick={handleSave}>
                                    <BiSolidSave size={20} alt="save" />
                                </button>
                            </div>
                            <div className="relative flex justify-between space-y-2 text-black">
                                <label className="self-center text-white">
                                    Service Type:
                                </label>
                                <div className="flex flex-col w-[12rem]">
                                    <select
                                        className="w-[12rem] p-1 text-black rounded"
                                        name="service_type"
                                        value={selectedServiceType}
                                        onChange={(e) =>
                                            handleServiceTypeChange(e)
                                        }
                                    >
                                        <option value="">
                                            Select a service type
                                        </option>
                                        {uniqueServices.map((service) => (
                                            <option
                                                key={service.service_type}
                                                value={service.service_type}
                                            >
                                                {service.service_type}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="relative flex justify-between space-y-2 text-black">
                                <label className="self-center text-white">
                                    Service:
                                </label>
                                <div className="flex flex-col w-[12rem]">
                                    <select
                                        className="w-[12rem] p-1 text-black rounded"
                                        name="service_name"
                                        value={selectedServiceName}
                                        onChange={(e) =>
                                            handleServiceNameChange(e)
                                        }
                                    >
                                        <option value="">
                                            Select a service
                                        </option>
                                        {filteredServiceNames.map(
                                            (serviceName) => (
                                                <option
                                                    key={serviceName}
                                                    value={serviceName}
                                                >
                                                    {serviceName}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>

                            <div className="relative flex justify-between space-y-2 text-black">
                                <label className="self-center text-white">
                                    Quantity:
                                </label>
                                <div className="flex flex-col w-[12rem]">
                                    <input
                                        onChange={(e) =>
                                            setQuantity(
                                                parseInt(e.target.value)
                                            )
                                        }
                                        className="w-[12rem] p-1 text-black rounded"
                                        type="number"
                                    />
                                </div>
                            </div>

                            <div className="relative flex justify-between space-y-2 text-black">
                                <label className="self-center text-white">
                                    Discounts:
                                </label>
                                <div className="flex flex-col w-[12rem]">
                                    <select
                                        className="w-[12rem] p-1 text-black rounded"
                                        name="service_type"
                                        value={selectedDiscount}
                                        onChange={(e) =>
                                            handleDiscountOnChange(e)
                                        }
                                    >
                                        <option value="">
                                            Select a discount
                                        </option>
                                        {discounts.map((discount) => (
                                            <option
                                                key={discount.discount_id}
                                                value={discount.discount_id}
                                            >
                                                {discount.discount_description}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* </div>} */}
                </>
            )}
        </>
    )
}

// NOTES
// THIS IS USED TO POPULATE THE DROPDOWN LIST WITH NAME OF BRANCHES
