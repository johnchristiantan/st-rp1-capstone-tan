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
    const [selectedBranch, setSelectedBranch] = useState(null) //State Variable for Selected Branch
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
            .then((res) => {
                setIsCreateBranchFormSubmitted((prev) => !prev)

                // Hide the form after successful branch creation
                setShowCreateForm(false)
            })
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
        const { name, value } = e.target
        setSelectedBranch((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    useEffect(() => {
        getAllBranches()
            .then((res) => {
                setBranches(res)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [isCreateBranchFormSubmitted, isDeleted, isEdited]) // auto reload when submitted

    // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
    const branch_id_ur = useRef(null)
    const branch_name_ur = useRef(null)
    const percent_share_ur = useRef(null)

    // This handles the selection of a branch (1/2)
    const handleSelectBranch = (branch) => {
        console.log(branch)
        setShowCreateForm(false)
        setSelectedBranch(branch)
        setShowSelectedBranch(true)

        branch_id_ur.current.value = branch.branch_id
        branch_name_ur.current.value = branch.branch_name
        percent_share_ur.current.value = branch.percent_share
    }

    //Handle delete (1/1)
    const handleDeleteBranch = (branch_id) => {
        deleteBranch(branch_id)
            .then((res) => {
                alert('Deleted successfully')
                setIsDeleted((prev) => !prev)
                setShowSelectedBranch(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    //Form Submission for Editing (2/)
    // This function is called when the user submits the edit form.
    // It creates a new object (mergeObject) by merging the changes made in the input fields (inputChanges) with the original selected branch (selectedBranch).
    // Then, it sends a request to edit the branch using the editBranch function from the service. If the edit is successful, it displays an alert and updates the isEdited state variable to trigger a reload of the branch list.
    const handleEditSubmit = (e) => {
        e.preventDefault()
        const mergeObject = { ...selectedBranch, ...inputChanges }
        editBranch(mergeObject)
            .then((res) => {
                alert('Edited successfully')
                console.log(res)
                setIsEdited((prev) => !prev)

                setShowSelectedBranch(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // Calculate the width for each column
    const columnWidth = 'calc(22rem / 3)' // This divides the available width by 3

    return (
        <>
            <div className="flex flex-col items-center justify-start h-screen pt-16 ">
                <div className="flex flex-wrap w-[22rem]">
                    {branches ? (
                        branches.map((branch, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`w-full md:w-1/2 lg:w-1/3 p-2 md:w-${columnWidth} lg:w-${columnWidth}`}
                                >
                                    <div
                                        onClick={() =>
                                            handleSelectBranch(branch)
                                        }
                                        className="transition-transform transition-bg hover:scale-110 hover:shadow-md bg-white border border-gray-400 shadow-lg rounded p-4 cursor-pointer h-[10rem] overflow-y-auto flex flex-col justify-center items-center text-center"
                                    >
                                        <div className="text-sm font-bold">
                                            {branch.branch_name}
                                        </div>
                                        <div className="text-gray-500">
                                            {branch.percent_share}%
                                        </div>
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

                <button
                    onDoubleClick={handleShowButton}
                    className="w-[30rem] p-1  rounded-lg hover:text-orange-600 text-orange-500   hover:font-bold"
                >
                    Create New Branch
                </button>

                {showCreateForm && (
                    <div className="fixed inset-0 z-20 flex items-center justify-center backdrop-blur-sm backdrop-brightness-50 backdrop-contrast-50 ">
                        <form
                            className="flex flex-col justify-around bg-white w-[22rem] p-6 text-white border-2 border-gray-500 rounded px-15 items-left h-9/12"
                            onSubmit={handleOnSubmit}
                        >
                            <div className="flex items-center w-full">
                                <h1 className="mb-2 text-lg font-bold text-left text-orange-600">
                                    Create Branch
                                </h1>
                            </div>

                            <div className="flex justify-between w-full space-y-2 text-black">
                                <label className="self-center">
                                    Branch Code
                                </label>
                                <div className="flex flex-col ">
                                    <input
                                        ref={branch_id_ur}
                                        onChange={handleOnChange}
                                        className="p-1 text-black border border-gray-500 rounded-lg"
                                        type="text"
                                        name="branch_id"
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between w-full space-y-2 text-black">
                                <label className="self-center">
                                    Branch Name:
                                </label>
                                <div className="flex flex-col ">
                                    <input
                                        ref={branch_name_ur}
                                        onChange={handleOnChange}
                                        className="p-1 text-black border border-gray-500 rounded-lg "
                                        type="text"
                                        name="branch_name"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between w-full space-y-2 text-black">
                                <label className="self-center">
                                    Percent Share:
                                </label>
                                <div className="flex flex-col ">
                                    <input
                                        ref={percent_share_ur}
                                        onChange={handleOnChange}
                                        className="p-1 text-black border border-gray-500 rounded-lg"
                                        type="text"
                                        name="percent_share"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between w-full mt-4 ">
                                <input
                                    className="w-[30rem] p-1 bg-orange-400 rounded-lg hover:bg-orange-500 border-orange-400 border-2 hover:border-orange-500"
                                    type="submit"
                                    value="Submit"
                                />
                            </div>
                            <div className="flex items-center justify-between w-full mt-4 ">
                                <input
                                    className="w-[30rem] p-1 bg-white rounded-lg hover:bg-orange-500 text-black border-2 border-orange-500 hover:text-white"
                                    type="button"
                                    onClick={handleShowButton}
                                    value="Cancel"
                                />
                            </div>
                        </form>
                    </div>
                )}
                {showSelectedBranch && (
                    <div className="fixed inset-0 z-20 flex items-center justify-center backdrop-blur-sm backdrop-brightness-50 backdrop-contrast-50 ">
                        <form
                            className="flex flex-col justify-around w-[25rem] p-6 bg-white text-white  rounded-lg border-2 border-gray-600 px-15 items-left h-9/12"
                            onSubmit={handleEditSubmit}
                        >
                            <div className="flex items-center w-full">
                                <h1 className="mb-2  text-[1.2rem] text-lg font-bold text-left text-orange-500">
                                    Edit/Delete Branch
                                </h1>
                            </div>

                            <div className="flex justify-between w-full space-y-2 text-black">
                                <label className="self-center">
                                    Branch Code
                                </label>
                                <div className="flex flex-col ">
                                    <input
                                        ref={branch_id_ur} // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
                                        onChange={handleOnChangeEdit}
                                        className="w-[12rem] p-1 text-black border border-gray-500 rounded-lg"
                                        type="text"
                                        name="branch_id"
                                        defaultValue={
                                            selectedBranch
                                                ? selectedBranch.branch_id
                                                : ''
                                        }
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="flex justify-between w-full space-y-2 text-black">
                                <label className="self-center">
                                    Branch Name:
                                </label>
                                <div className="flex flex-col ">
                                    <input
                                        ref={branch_name_ur} // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
                                        onChange={handleOnChangeEdit}
                                        className="w-[12rem] p-1 text-black border border-gray-500 rounded-lg "
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

                            <div className="flex justify-between w-full space-y-2 text-black ">
                                <label className="self-center">
                                    Percent Share:
                                </label>
                                <div className="flex flex-col ">
                                    <input
                                        ref={percent_share_ur} // THIS WILL DISPLAY THE SELECTED ITEM BACK TO INPUT BOX
                                        onChange={handleOnChangeEdit}
                                        className="w-[12rem] p-1 text-black border border-gray-500 rounded-lg"
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

                            <div className="flex items-center justify-center w-full mt-4">
                                <input
                                    className="w-[30rem] p-1 bg-orange-400 rounded-lg hover:bg-orange-500 border-orange-400 border-2 hover:border-orange-500"
                                    type="submit"
                                    value="Update"
                                />
                            </div>

                            <div className="flex items-center justify-center w-full mt-4">
                                <input
                                    className="w-[30rem] p-1 bg-white rounded-lg hover:bg-orange-500 text-black border-2 border-orange-500 hover:text-white"
                                    type="button"
                                    onClick={handleOnCancelEdit}
                                    value="Cancel"
                                />
                            </div>

                            <div className="flex items-center justify-center w-full mt-4">
                                <input
                                    className="w-[30rem] p-1 rounded-full text-black hover:text-orange-500 "
                                    type="button"
                                    value="Delete"
                                    onClick={() =>
                                        handleDeleteBranch(
                                            selectedBranch.branch_id
                                        )
                                    }
                                />
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </>
    )
}
