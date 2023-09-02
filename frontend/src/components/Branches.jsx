import { useEffect, useState, useRef } from 'react'
import { getAllBranches } from '../services/BranchServices'
import {
    createdBranch,
    deleteBranch,
    editBranch,
} from '../services/BranchServices'

export default function Branches() {
    const [branches, setBranches] = useState([])
    const [showCreateForm, setShowCreateForm] = useState(false)
    const [showSelectedBranch, setShowSelectedBranch] = useState(false)
    const [selectedBranch, setSelectedBranch] = useState(null)
    const [createBranchForm, setCreateBranchForm] = useState(false)
    const [isCreateBranchFormSubmitted, setIsCreateBranchFormSubmitted] =
        useState(false)
    const [isDeleted, setIsDeleted] = useState(false)
    const [isEdited, setIsEdited] = useState(false)
    const [inputChanges, setInputChanges] = useState(selectedBranch)

    const handleShowButton = () => {
        setShowSelectedBranch(false)
        setShowCreateForm((prev) => !prev)
    }

    const handleOnCancelEdit = () => {
        setShowCreateForm(false)
        setShowSelectedBranch((prev) => !prev)
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        console.log('Created successfully')
        createdBranch(createBranchForm)
            .then((res) => setIsCreateBranchFormSubmitted((prev) => !prev))
            .catch((error) => {
                console.log('Error creating or fetching branches:', error)
                throw error // Rethrow the error to handle it in the main component if needed
            })
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setCreateBranchForm((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleOnChangeEdit = (e) => {
        // setInputChanges(selectedBranch)
        const { name, value } = e.target
        setSelectedBranch((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // const { branchesInputs, handleOnChange, handleOnSubmit } = BranchesAdd()

    const branch_code_ur = useRef(null)
    const branch_name_ur = useRef(null)
    const percent_share_ur = useRef(null)

    useEffect(() => {
        getAllBranches()
            .then((res) => {
                setBranches(res)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [isCreateBranchFormSubmitted, isDeleted, isEdited]) // auto reload when submitted

    // Define the handleSelectBranch function that will be called when a branch is double-clicked:
    const handleSelectBranch = (branch) => {
        console.log(branch)
        setShowCreateForm(false)
        setSelectedBranch(branch)
        setShowSelectedBranch(true)

        branch_code_ur.current.value = branch.branch_code
        branch_name_ur.current.value = branch.branch_name
        percent_share_ur.current.value = branch.percent_share
        // handleShowButton()
        // console.log('Selected Branch Code:', branch.branch_code) // Output the branch code
    }

    const handleDeleteBranch = (branch_code) => {
        deleteBranch(branch_code)
            .then((res) => {
                alert('Deleted successfully')
                setIsDeleted((prev) => !prev)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const handleEditSubmit = (e) => {
        e.preventDefault()
        const mergeObject = { ...selectedBranch, ...inputChanges }
        editBranch(mergeObject)
            .then((res) => {
                alert('Edited successfully')
                console.log(res)
                setIsEdited((prev) => !prev)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <>
            <div className="flex flex-col items-center justify-start h-screen pt-16 bg-gray-10">
                <div className="flex flex-col w-[25rem] p-2 bg-slate-500 ">
                    <div className="flex text-[0.8rem] w-full justify-around text-white ">
                        <div>Branch Code</div>
                        <div>Branch Name</div>
                        <div>Percent Share</div>
                    </div>

                    {branches ? (
                        branches.map((branch, index) => {
                            return (
                                <div
                                    key={index}
                                    onClick={() => handleSelectBranch(branch)}
                                    className="cursor-pointer"
                                >
                                    <div className="cursor-pointer flex text-[0.8rem] w-full justify-around text-black bg-white mt-2">
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

                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-500">
                    <button onClick={handleShowButton}>+</button>
                </div>

                {showCreateForm && (
                    <form
                        className="flex flex-col justify-around w-[25rem] p-6 text-white bg-orange-600 rounded px-15 items-left h-9/12"
                        onSubmit={handleOnSubmit}
                    >
                        <div className="flex items-center justify-center w-full">
                            <h1 className="mb-2  text-[1.2rem] ">
                                Create Branch
                            </h1>
                        </div>

                        <div className="flex justify-between w-full space-y-2">
                            <label className="self-center">Branch Code</label>
                            <div className="flex flex-col ">
                                <input
                                    ref={branch_code_ur}
                                    onChange={handleOnChange}
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
                                    ref={branch_name_ur}
                                    onChange={handleOnChange}
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
                                    ref={percent_share_ur}
                                    onChange={handleOnChange}
                                    className="p-1 text-black rounded"
                                    type="text"
                                    name="percent_share"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between w-full px-6 mt-4 ">
                            <input
                                className="w-1/3 p-1 rounded-full bg-cyan-900 hover:bg-teal-600 "
                                type="submit"
                                value="Create"
                            />
                            <input
                                className="w-1/3 p-1 rounded-full bg-slate-900 hover:bg-teal-600 "
                                type="button"
                                onClick={handleShowButton}
                                value="Cancel"
                            />
                        </div>
                    </form>
                )}
                {showSelectedBranch && (
                    <form
                        className="flex flex-col justify-around w-[25rem] p-6 text-white bg-orange-600 rounded px-15 items-left h-9/12"
                        onSubmit={handleEditSubmit}
                    >
                        <div className="flex items-center justify-center w-full">
                            <h1 className="mb-2  text-[1.2rem] ">
                                Edit/Delete Branch
                            </h1>
                        </div>

                        <div className="flex justify-between w-full space-y-2">
                            <label className="self-center">Branch Code</label>
                            <div className="flex flex-col ">
                                <input
                                    ref={branch_code_ur}
                                    onChange={handleOnChangeEdit}
                                    className="p-1 text-black rounded"
                                    type="text"
                                    name="branch_code"
                                    defaultValue={
                                        selectedBranch
                                            ? selectedBranch.branch_code
                                            : ''
                                    }
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="flex justify-between w-full space-y-2">
                            <label className="self-center">Branch Name:</label>
                            <div className="flex flex-col ">
                                <input
                                    ref={branch_name_ur}
                                    onChange={handleOnChangeEdit}
                                    className="p-1 text-black rounded "
                                    type="text"
                                    name="branch_name"
                                    defaultValue={
                                        selectedBranch
                                            ? selectedBranch.branch_name
                                            : ''
                                    }
                                />
                            </div>
                        </div>

                        <div className="flex justify-between w-full space-y-2">
                            <label className="self-center">
                                Percent Share:
                            </label>
                            <div className="flex flex-col ">
                                <input
                                    ref={percent_share_ur}
                                    onChange={handleOnChangeEdit}
                                    className="p-1 text-black rounded"
                                    type="text"
                                    name="percent_share"
                                    defaultValue={
                                        selectedBranch
                                            ? selectedBranch.percent_share
                                            : ''
                                    }
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-around w-full gap-2 px-6 mt-4 ">
                            <input
                                className="w-1/3 p-1 rounded-full bg-cyan-900 hover:bg-teal-600 "
                                type="submit"
                                value="Edit"
                            />
                            <input
                                className="w-1/3 p-1 rounded-full bg-cyan-900 hover:bg-teal-600 "
                                type="button"
                                value="Delete"
                                onClick={() =>
                                    handleDeleteBranch(
                                        selectedBranch.branch_code
                                    )
                                }
                            />
                            <input
                                className="w-1/3 p-1 rounded-full bg-slate-900 hover:bg-teal-600 "
                                type="button"
                                onClick={handleOnCancelEdit}
                                value="Cancel"
                            />
                        </div>
                    </form>
                )}
            </div>
        </>
    )
}
