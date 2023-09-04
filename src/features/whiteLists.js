import { createSlice } from "@reduxjs/toolkit";

const whiteLists = createSlice({
    name: "whiteLists",
    initialState: {
        user: null,
        fbUid: '',
        token: '',
        flag: true,
        cityAddress: null,
        defaultAddress: null,
        chatAction: false
    },
    reducers: {
        saveUser: (state, action) => {
            state.user = action.payload;
            state.token = action.payload?.custom_token;
        },
        setFBUid: (state, action) => {
            state.fbUid = action.payload;
        },
        logOutUser: (state) => {
            state.user = null;
            state.token = '';
        },
        getCityAddress: (state, action) => {
            state.cityAddress = action.payload;
        },
        setDefaultAddress: (state, { payload }) => {
            state.defaultAddress = payload;
            if (state.token) {
                state.user.deafult_address = payload;
            }
        },
        deleteAccount: (state) => {
            state.user = null;
            state.token = '';
        },
        getValues: (state, action) => {
            state.flag = action.payload;
        },
        chatActionHandler: (state, action) => {
            state.chatAction = action.payload;
        }
    }
});

export const { logOutUser, saveUser, getValues, setFBUid, deleteAccount, setDefaultAddress, getCityAddress, chatActionHandler } = whiteLists.actions;
export default whiteLists.reducer;