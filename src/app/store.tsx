import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/Users/UsersSlice';

export const store = configureStore({
    reducer:{
        users:userReducer,
        
        // login:loginReducer

    }
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;