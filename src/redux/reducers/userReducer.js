import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: {
            email: "rohan@singh.com",
            password: "123123123",
        },
    },
    reducers: {
        setUser: (state, action) => {
            state.userInfo = action.payload;
        }
    },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;