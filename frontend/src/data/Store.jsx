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
        }
      }
      return state; // Item already exists, no need to append it again
    }),

  // You can also add other functions to manipulate the array as needed
  removeFromAvailedServicesArray: (valueToRemove) =>    
    set((state) => ({
      availedServicesArray: state.availedServicesArray.filter(
        // (item) => item.card_index !== valueToRemove.card_index
        (item) => item.card_index !== valueToRemove
      ),
    })),
    
  clearAvailedServicesArray: () =>
    set((state) => ({
      availedServicesArray: [],
    })),

  setAvailedServices: (name, value) =>
    set((state) => ({
      availedServices: { ...state.availedServices, [name]: value },
    })),

  setCards: (value) =>
    set((state) => ({
      cards: value,
    })),
}));

export default useTransactionFormStore