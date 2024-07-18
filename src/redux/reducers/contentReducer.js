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
    files: [
      {
        id: 12345,
        title: "Internal Designs for Home",
        url: "",
        type: "application/pdf",
        sharedTimes: 2,
        lastShared: "Jul 15, 2024 - 12:56 AM",
        createdOn: "Jul 12, 2024 - 11:56 AM",
      },
      {
        id: 12346,
        title: "ABC Residences Brochure",
        url: "",
        type: "application/pdf",
        sharedTimes: 0,
        lastShared: "Jul 15, 2024 - 12:56 AM",
        createdOn: "Jul 12, 2024 - 11:56 AM"
      }
    ],
    pages: [
      {
        id: 22346,
        title: "Example: ABC Residences",
        imageUrl: "",
        type: "application/pdf",
        sharedTimes: 1,
        lastShared: "Jul 15, 2024 - 12:56 AM",
        createdOn: "Jul 12, 2024 - 11:56 AM"
      }
    ],
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