import React from 'react'
import UserSelect from './UserSelect' // Make sure to import any necessary components and hooks

function AddServicesForm({
    showAddServices,
    selectedServiceType,
    selectedServiceName,
    selectedServicePrice,
    selectedUserName,
    handleServiceTypeChange,
    handleServiceNameChange,
    handleOnCancelEdit,
}) {
    if (!showAddServices) {
        return null // Render nothing if showAddServices is false
    }

    return (
        <div className="fixed inset-0 z-20 flex items-center justify-center backdrop-blur-sm backdrop-brightness-50 backdrop-contrast-50 ">
            <form className="flex flex-col justify-around w-[25rem] p-6 m-4 bg-white text-white border border-gray-500 rounded form1 px-15 items-left h-9/12">
                <div className="flex w-full">
                    <h1 className="mb-2 text-base font-bold text-left text-orange-600">
                        Spa Services
                    </h1>
                </div>

                <div className="relative flex justify-between space-y-2 text-black">
                    <label className="self-center">Service Type:</label>
                    <div className="flex flex-col w-[12rem]">
                        <select
                            className="flex flex-col w-[12rem] border-2 border-gray-500 rounded-lg"
                            name="service_type"
                            value={selectedServiceType}
                            onChange={(event) => handleServiceTypeChange(event)}
                        >
                            {/* Mapping options for service types */}
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
                    <label className="self-center">Service:</label>
                    <div className="flex flex-col w-[12rem]">
                        <select
                            className="flex flex-col w-[12rem] border-2 border-gray-500 rounded-lg"
                            name="service_name"
                            value={selectedServiceName}
                            onChange={(event) => handleServiceNameChange(event)}
                        >
                            <option value="">Select a service</option>
                            {/* Mapping options for service names */}
                            {filteredServiceNames.map((serviceName) => (
                                <option key={serviceName} value={serviceName}>
                                    {serviceName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex justify-between space-y-2 text-black">
                    <label className="self-center">Price:</label>
                    <div className="flex flex-col">
                        <input
                            className="flex flex-col w-[12rem] border-2 border-gray-500 rounded-lg"
                            type="text"
                            name="price"
                            value={selectedServicePrice}
                            disabled
                        />
                    </div>
                </div>

                <div className="flex justify-between space-y-2 text-black">
                    <label className="self-center">Therapist:</label>
                    <div className="flex flex-col">
                        <div className="flex flex-col w-[12rem] border-2 border-gray-500 rounded-lg">
                            <UserSelect
                                userDetails={userDetails}
                                selectedUserName={selectedUserName}
                                setSelectedUserName={setSelectedUserName}
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-center w-full mt-4">
                    <input
                        className="w-[30rem] p-1 text-white bg-orange-400 rounded-lg hover:bg-orange-500 border-orange-400 border-2 hover:border-orange-500 hover:font-bold"
                        type="button"
                        value="Add"
                    />
                </div>

                <div className="flex items-center justify-center w-full mt-4">
                    <input
                        className="w-[30rem] p-1 bg-white rounded-lg hover:bg-orange-500 text-black border-2 border-orange-500 hover:text-white hover:font-bold"
                        type="button"
                        onClick={handleOnCancelEdit}
                        value="Cancel"
                    />
                </div>
            </form>
        </div>
    )
}

export default AddServicesForm
