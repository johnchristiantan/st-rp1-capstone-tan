import { useEffect, useState, useRef } from 'react'
import { getAllBranches } from '../services/BranchServices'
import {
    createdBranch,
    deleteBranch,
    editBranch,
} from '../services/BranchServices'
import Nav from '../common/Nav'

export default function Branches({ setJwt }) {
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

    const [formErrors, setFormErrors] = useState({})

    const validate = (formInputs) => {
        const errors = {}

        if (!formInputs.branch_name) {
            errors.branch_name = 'Please enter branch name.'
        }

        if (!formInputs.percent_share) {
            errors.percent_share = 'Please enter percent share.'
        }

        return errors
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()

        const errors = validate(createBranchForm)
        setFormErrors(errors)

        if (Object.keys(errors).length === 0) {
            // If there are no errors, proceed with user creation
            createdBranch(createBranchForm)
                .then((res) => {
                    setIsCreateBranchFormSubmitted((prev) => !prev)
                    setShowCreateForm(false)
                })
                .catch((error) => {
                    console.log('Error creating or fetching branches:', error)
                    throw error
                })
        }
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
    }, [isCreateBranchFormSubmitted, isDeleted, isEdited])

    const branch_id_ur = useRef(null)
    const branch_name_ur = useRef(null)
    const percent_share_ur = useRef(null)

    const handleSelectBranch = (branch) => {
        setShowCreateForm(false)
        setSelectedBranch(branch)
        setShowSelectedBranch(true)

        branch_id_ur.current.value = branch.branch_id
        branch_name_ur.current.value = branch.branch_name
        percent_share_ur.current.value = branch.percent_share
    }

    const handleDeleteBranch = (branch_id) => {
        deleteBranch(branch_id)
            .then((res) => {
                setIsDeleted((prev) => !prev)
                setShowSelectedBranch(false)
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
                // alert('Edited successfully')
                setIsEdited((prev) => !prev)
                setShowSelectedBranch(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    // New state variable for delete confirmation dialog
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
    const [branchToDelete, setBranchToDelete] = useState(null)

    // ... Other functions ...

    // Function to show delete confirmation dialog
    const showDeleteDialog = (branch_id) => {
        setBranchToDelete(branch_id)
        setShowDeleteConfirmation(true)
    }

    // Function to handle delete confirmation
    const handleDeleteConfirmation = () => {
        if (branchToDelete) {
            handleDeleteBranch(branchToDelete)
            // Reset branchToDelete and hide the confirmation dialog
            setBranchToDelete(null)
            setShowDeleteConfirmation(false)
        }
    }

    const columnWidth = 'calc(22rem / 3)'

    return (
        <>
            <Nav setJwt={setJwt} />
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
                                        className="transition-transform transition-bg hover:scale-110 hover:shadow-md bg-white border  shadow-md rounded p-4 cursor-pointer h-[10rem] overflow-y-auto flex flex-col justify-center items-center text-center"
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

                {/* <button
                    onDoubleClick={handleShowButton}
                    className="w-[30rem] p-1  rounded-lg hover:text-orange-600 text-orange-500   hover:font-bold"
                >
                    Create New Branch
                </button> */}

                <div
                    className="absolute transform -translate-x-1/2 +addbutton bottom-10 left-1/2"
                    style={{ zIndex: 9999 }}
                >
                    <button
                        className="flex items-center justify-center text-xl font-bold text-white bg-orange-400 border border-white rounded-full w-[3rem] h-[3rem]  hover:bg-orange-600 transition-transform transition-bg hover:scale-110 hover:shadow-md hover:text-white hover:border-orange-600"
                        onDoubleClick={handleShowButton}
                    >
                        +
                    </button>
                </div>

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
                                    Branch Name:
                                </label>
                                <div className="flex flex-col ">
                                    <input
                                        ref={branch_name_ur}
                                        onChange={handleOnChange}
                                        className="p-1 text-black border rounded "
                                        type="text"
                                        name="branch_name"
                                    />
                                    <div className="text-red-400 text-[0.65rem] font-semibold my-1">
                                        {formErrors.branch_name}
                                    </div>
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
                                        className="p-1 text-black border rounded"
                                        type="number"
                                        name="percent_share"
                                        step="any"
                                    />
                                    <div className="text-red-400 text-[0.65rem] font-semibold my-1">
                                        {formErrors.percent_share}
                                    </div>
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
                                    Branch Name:
                                </label>
                                <div className="flex flex-col ">
                                    <input
                                        ref={branch_name_ur}
                                        onChange={handleOnChangeEdit}
                                        className="w-[12rem] p-1 text-black border  rounded "
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
                                        ref={percent_share_ur}
                                        onChange={handleOnChangeEdit}
                                        className="w-[12rem] p-1 text-black border  rounded"
                                        type="number"
                                        name="percent_share"
                                        step="any"
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
                                        showDeleteDialog(
                                            selectedBranch.branch_id
                                        )
                                    }
                                />
                            </div>
                        </form>
                    </div>
                )}

                {/* Delete Confirmation Dialog */}
                {showDeleteConfirmation && (
                    <div className="fixed inset-0 z-30 flex items-center justify-center backdrop-blur-sm backdrop-brightness-50 backdrop-contrast-50">
                        <div className="p-4 bg-white border-2 border-gray-600 rounded-lg">
                            <p>Are you sure you want to delete this branch?</p>
                            <div className="flex justify-center mt-2">
                                <button
                                    className="px-4 py-2 mr-2 text-white bg-red-500 rounded-lg"
                                    onClick={handleDeleteConfirmation}
                                >
                                    Yes
                                </button>
                                <button
                                    className="px-4 py-2 text-gray-700 bg-gray-300 rounded-lg"
                                    onClick={() =>
                                        setShowDeleteConfirmation(false)
                                    }
                                >
                                    No
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
