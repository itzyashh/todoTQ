import { combineReducers, configureStore } from "@reduxjs/toolkit";
import User from "./reducers/User";

const rootReducer = combineReducers({
    user: User
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export default store;