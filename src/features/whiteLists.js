import { createSlice } from "@reduxjs/toolkit";

const whiteLists = createSlice({
    name: "whiteLists",
    initialState: {
        isShowAppIntroSlider: true,
        user: null,
        fbUid: '',
        token: '',
        flag: true,
        cityAddress: null,
        defaultAddress: null,
        store_data: null
    },
    reducers: {
        disableAppIntroSlider: (state) => {
            state.isShowAppIntroSlider = false;
        },
        saveUser: (state, action) => {
            state.user = action.payload;
            state.token = action.payload?.custom_token;
        },
        setFBUid: (state, action) => {
            state.user = action.payload;
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
        }
    }
});

export const { disableAppIntroSlider, logOutUser, saveUser, getValues, setFBUid, deleteAccount, setDefaultAddress, getCityAddress } = whiteLists.actions;
export default whiteLists.reducer;