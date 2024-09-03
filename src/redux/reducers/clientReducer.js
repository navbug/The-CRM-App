import { createSlice } from '@reduxjs/toolkit';

const clientSlice = createSlice({
  name: 'client',
  initialState: {
    clientsInfo: [],
  },
  reducers: {
    setInitialClients: (state, action) => {
      state.clientsInfo = action.payload;
    },
    addNewClient: (state, action) => {
      state.clientsInfo.push(action.payload);
    },
    editClient: (state, action) => {

    }
  },
});

export const { setInitialClients, addNewClient } = clientSlice.actions;
export default clientSlice.reducer;