import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  children: '',
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.children = action.payload.children;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.children = '';
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;