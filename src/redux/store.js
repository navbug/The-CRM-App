import { configureStore } from '@reduxjs/toolkit';
import clientReducer from './reducers/clientReducer';
import userReducer from './reducers/userReducer';
import contentReducer from './reducers/contentReducer';

export const store = configureStore({
  reducer: {
    client: clientReducer,
    user: userReducer,
    content: contentReducer,
  },
});