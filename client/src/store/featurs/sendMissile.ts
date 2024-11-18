import { createSlice } from '@reduxjs/toolkit';
import { MissileModel } from '../../types/organizatiomModel';
import { sendMissile } from '../../services/userApi';

interface missileState {
    missiles: MissileModel[] | null;
    status: string;
    error: string | undefined;
}

const initialState: missileState = {
    missiles: [],
    status: 'idle',
    error: undefined,
}

export const missileSlice = createSlice({
    name:'missile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(sendMissile.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(sendMissile.fulfilled, (state, action) => {
            state.status ='succeeded';
            state.missiles =  action.payload;
        });
        builder.addCase(sendMissile.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    }
});

export default missileSlice.reducer;
