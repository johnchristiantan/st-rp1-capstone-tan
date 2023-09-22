import create from 'zustand';

const useTransactionFormStore = create((set) => ({
  prioTransactionInputField: {customer: 'customer'},
  setCreateTransactionInputField: (name, value) =>
    set((state) => ({
      createTransactionInputField: { ...state.createTransactionInputField, [name]: value },
    })),
}));

export default useTransactionFormStore;

// count: 0,
// increment: () => set((state) => ({ count: state.count + 1 })),
// decrement: () => set((state) => ({ count: state.count - 1 })),