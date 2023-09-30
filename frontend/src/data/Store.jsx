import { create } from 'zustand'

const useTransactionFormStore = create((set) => ({
  availedServicesArray: [], // Initialize as an empty array
  // prioTransactionInputField: {customer: 'customer'},
  setCreateTransactionInputField: (name, value) =>
    set((state) => ({
      createTransactionInputField: { ...state.createTransactionInputField, [name]: value },
    })),

    // Add a function to append a value to the array if it doesn't exist
  appendToAvailedServicesArray: (value) =>
    set((state) => {
      // Check if the value already exists in the array
      if (!state.availedServicesArray.some((item) => item.card_index === value.card_index)) {
        return {
          availedServicesArray: [...state.availedServicesArray, value],
        };
      }
      return state; // Item already exists, no need to append it again
    }),
    
    clearAvailedServicesArray: () =>
      set((state) => ({
        availedServicesArray: [],
      })),

    setAvailedServices: (name, value) =>
    set((state) => ({
      availedServices: { ...state.availedServices, [name]: value },
    })),
}));

export default useTransactionFormStore;