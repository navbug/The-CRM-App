import { createSlice } from '@reduxjs/toolkit';

const contentSlice = createSlice({
  name: 'content',
  initialState: {
    messages: [],
    files: [],
    pages: [],
  },
  reducers: {
    setInitialMessages: (state, action) => {
      state.messages = action.payload;
    },
    setInitialFiles: (state, action) => {
      state.files = action.payload;
    },
    setInitialPages: (state, action) => {
      state.pages = action.payload;
    },
    addMessageDetails: (state, action) => {
      state.messages.push(action.payload);
    },
    addFileDetails: (state, action) => {
      state.files.push(action.payload);
    },
    addPageDetails: (state, action) => {
      state.pages.push(action.payload);
    }
  },
});

export const { setInitialMessages, setInitialFiles, setInitialPages, addMessageDetails, addFileDetails, addPageDetails } = contentSlice.actions;
export default contentSlice.reducer;