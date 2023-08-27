import React from 'react'

export default function Services() {
    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <form className="flex flex-col justify-around w-10/12 p-6 text-white bg-orange-600 rounded px-15 items-left h-9/12">
                    <div className="flex items-center justify-center w-full">
                        <h1 className="mb-2 text-xl">Services</h1>
                    </div>

                    <div className="flex justify-between w-full space-y-2">
                        <label className="self-center">Service ID</label>
                        <div className="flex flex-col ">
                            <input
                                className="p-1 text-black rounded"
                                type="text"
                                name="service_id"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between w-full space-y-2">
                        <label className="self-center">Service Name:</label>
                        <div className="flex flex-col ">
                            <input
                                className="p-1 text-black rounded "
                                type="text"
                                name="service_name"
                            />
                        </div>
                    </div>

                    <div className="relative flex justify-between w-full space-y-2">
                        <label className="self-center">Service Type:</label>
                        <div className="flex flex-col w-1/2">
                            <select
                                className="w-full p-1 text-black rounded"
                                name="service_type"
                            >
                                <option value="optMassage">Massage</option>
                                <option value="optSpa">Spa</option>
                                <option value="optPackage">Package</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-between w-full space-y-2">
                        <label className="self-center">Price:</label>
                        <div className="flex flex-col ">
                            <input
                                className="p-1 text-black rounded"
                                type="text"
                                name="price"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between w-full space-y-2">
                        <label className="self-center">Minutes:</label>
                        <div className="flex flex-col ">
                            <input
                                className="p-1 text-black rounded"
                                type="text"
                                name="minutes"
                            />
                        </div>
                    </div>

                    <div className="flex justify-between w-full space-y-2">
                        <label className="self-center">Commission:</label>
                        <div className="flex flex-col ">
                            <input
                                className="p-1 text-black rounded"
                                type="text"
                                name="commission"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-center w-full px-6 mt-4">
                        <input
                            className="w-1/3 p-1 rounded-full bg-cyan-900 hover:bg-teal-600"
                            type="submit"
                            value="Submit"
                        />
                    </div>
                </form>
            </div>
        </>
    )
}
