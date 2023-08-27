import { useEffect, useState } from 'react'
import { getAllBranches } from '../services/BranchServices'

export default function Branches() {
    const [showButton, setShowButton] = useState(false)

    const [branches, setBranches] = useState([
        {
            branch_code: 'MNL-1',
            branch_name: 'xxxx',
            percent_share: '0.25',
        },
    ])

    const handleShowButton = () => {
        setShowButton((prev) => !prev)
    }

    useEffect(() => {
        getAllBranches()
            .then((res) => {
                setBranches(res)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <>
            <div className=" flex flex-col items-center justify-center h-screen bg-gray-10">
                <div className="flex flex-col w-[20rem] p-2 bg-slate-500">
                    <div className="flex text-[0.8rem] w-full justify-around text-white ">
                        <div>Branch Code</div>
                        <div>Branch Name</div>
                        <div>Percent Share</div>
                    </div>

                    {branches ? (
                        branches.map((branch, index) => {
                            return (
                                <div key={index}>
                                    <div className="flex text-[0.8rem] w-full justify-around text-black bg-white mt-2">
                                        <div>{branch.branch_code}</div>
                                        <div>{branch.branch_name}</div>
                                        <div>{branch.percent_share}</div>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <>
                            <div>Loading...</div>
                        </>
                    )}
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center">
                    <button onClick={handleShowButton}>+</button>
                </div>
                {showButton && (
                    <form className="flex flex-col justify-around w-10/12 p-6 text-white bg-orange-600 rounded px-15 items-left h-9/12">
                        <div className="flex items-center justify-center w-full">
                            <h1 className="mb-2  text-[1.2rem] ">
                                Branch Maintenance
                            </h1>
                        </div>

                        <div className="flex justify-between w-full space-y-2">
                            <label className="self-center">Branch Code</label>
                            <div className="flex flex-col ">
                                <input
                                    className="p-1 text-black rounded"
                                    type="text"
                                    name="branch_code"
                                />
                            </div>
                        </div>
                        <div className="flex justify-between w-full space-y-2">
                            <label className="self-center">Branch Name:</label>
                            <div className="flex flex-col ">
                                <input
                                    className="p-1 text-black rounded "
                                    type="text"
                                    name="branch_name"
                                />
                            </div>
                        </div>

                        <div className="flex justify-between w-full space-y-2">
                            <label className="self-center">
                                Percent Share:
                            </label>
                            <div className="flex flex-col ">
                                <input
                                    className="p-1 text-black rounded"
                                    type="text"
                                    name="percent_share"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-center w-full px-6 mt-4 ">
                            <input
                                className="w-1/3 p-1 rounded-full bg-cyan-900 hover:bg-teal-600 "
                                type="submit"
                                value="Submit"
                            />
                        </div>
                    </form>
                )}
            </div>
        </>
    )
}
