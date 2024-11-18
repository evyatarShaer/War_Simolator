import { configureStore } from "@reduxjs/toolkit";
import userReducer from './featurs/userSlice';
import missileReducer from './featurs/sendMissile';

export const store = configureStore({
    reducer: {
        user: userReducer,
        missile: missileReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
