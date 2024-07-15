import { createSlice } from '@reduxjs/toolkit';

const clientSlice = createSlice({
  name: 'client',
  initialState: {
    clientInfo: [
      {
        "clientName": "Rohan Singh",
        "displayName": "rohan",
        "mobileNumber": "6565656565",
        "whatsappNumber": "6565656565",
        "email": "rohan@singh.com",
        "mobileCountryCode": "+91",
        "whatsappCountryCode": "+91",
        "id": 1720765618222,
        "dateAdded": "Jul 12 - 11:56 AM",
        "lastActivity": "",
        "notes": "",
        "groups": [],
        "activity": [],
        "contacted": false
      },
      {
        "clientName": "Alias",
        "displayName": "alias",
        "mobileNumber": "8278608273",
        "whatsappNumber": "8278608273",
        "email": "alias@abc.com",
        "mobileCountryCode": "+91",
        "whatsappCountryCode": "+91",
        "id": 1720765683829,
        "dateAdded": "Jul 12 - 11:58 AM",
        "lastActivity": "",
        "notes": "",
        "groups": [],
        "activity": [],
        "contacted": false
      }
    ],
  },
  reducers: {
    addClient: (state, action) => {
      // const { mobileNumber } = action.payload;
      // const existingClient = state.clientInfo.find((item) => item.mobileNumber === mobileNumber);

      // if (!existingClient) {
      // }
      state.clientInfo.push(action.payload);
    },
    editClient: (state, action) => {

    }
  },
});

export const { addClient } = clientSlice.actions;
export default clientSlice.reducer;