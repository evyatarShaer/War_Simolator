import { createSlice } from '@reduxjs/toolkit';
import { UserModel } from '../../types/userModel';
import { fetchUser } from '../../services/userApi';

interface userState {
    user: UserModel | undefined;
    status: string;
    error: string | undefined;
}

const initialState: userState = {
    user: undefined,
    status: 'idle',
    error: undefined,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.status ='succeeded';
            state.user = action.payload;
        });
        builder.addCase(fetchUser.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    }
});

export default userSlice.reducer;