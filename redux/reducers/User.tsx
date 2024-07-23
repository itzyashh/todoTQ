import {createSlice} from '@reduxjs/toolkit';

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
            state.token = action.payload.token;
            state.isLogged = true;
        },
        onLogout: (state) => {
            state.user = null;
            state.token = null;
            state.isLogged = false;
        },
    },
});

export const {onLogin, onLogout} = User.actions;
export default User.reducer;