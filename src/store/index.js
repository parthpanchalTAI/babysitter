import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer } from "redux-persist";
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import whiteLists from "../features/whiteLists";
import authSlice from "../features/authSlice";
import accountSlice from "../features/accountSlice";

const reducers = combineReducers({
    whiteLists,
    auth: authSlice,
    account: accountSlice
});

const rootReducer = (state, action) => {
    if (action.type == 'loginSlice/logOutUser') {
        state = {};
    }
    return reducers(state, action);
}

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['whiteLists'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, immutableCheck: false })
})

setupListeners(store.dispatch);

export const useAppDispatch = () => useDispatch();