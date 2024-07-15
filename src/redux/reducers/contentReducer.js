import { createSlice } from '@reduxjs/toolkit';

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    messages: [
      {
        id: 76576,
        title: "Message Template 1",
        preview: "Hi @clientName this is a sample message for testing purposes",
        sentTimes: 1,
        timeline: [],
        createdOn: "Jul 12, 2024 - 11:56 AM",
        lastSent: "Jul 14, 2024 - 12:56 AM",
      },
      {
        id: 65465,
        title: "Message Template 2",
        preview: "Hi @clientName this is a sample message for testing purposes",
        sentTimes: 2,
        timeline: [],
        createdOn: "Jul 12, 2024 - 11:56 AM",
        lastSent: "Jul 14, 2024 - 12:56 AM",
      }
    ],
    files: [],
    pages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      const { title } = action.payload;
      const existingMessage = state.messages.find((item) => item.title === title);

      if (!existingMessage) {
        state.messages.push(action.payload);
      }
    }
  },
});

export const { addMessage } = contentSlice.actions;
export default contentSlice.reducer;