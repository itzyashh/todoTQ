import {createSlice} from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';

type UserState = {
    user: any;
    token: string | null;
    isLogged: boolean;
};

type LoginPayload = {
    user: any;
    token: string;
};

const initialState: UserState = {
  user: null,
  token: null,
  isLogged: false,
};


const User = createSlice({
    name: 'User',
    initialState,
    reducers: {
        onLogin: (state, action: {payload: LoginPayload}) => {
            state.user = action.payload.user;
            state.isLogged = true;
        },
        setToken: (state, action: {payload: string}) => {
            state.token = action.payload;
        },
        onLogout: (state) => {
            state.user = null;
            state.token = null;
            state.isLogged = false;
            SecureStore.deleteItemAsync('token')
        },
    },
});

export const {onLogin, onLogout, setToken} = User.actions;
export default User.reducer;