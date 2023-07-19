import { createSlice } from "@reduxjs/toolkit";
import { ApiGetRequest, ApiPostRequest } from "../utils/apiService";
import { endPoints } from "../utils/apiEndPoints";

export const editProfileApi = ApiPostRequest({
    endPoints: endPoints.edit_profile
})

export const logoutApi = ApiGetRequest({
    endPoints: endPoints.logout
})

export const changePswApi = ApiPostRequest({
    endPoints: endPoints.change_psw
})

const accountSlice = createSlice({
    name: 'accountSlice',
    initialState: {
        editProfile: {
            loading: false,
            data: {},
            error: null
        },
        logout: {
            loading: false,
            data: {},
            error: null
        },
        changePsw: {
            loading: false,
            data: {},
            error: null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(editProfileApi.pending, (state, action) => {
            state.editProfile.loading = true;
        }).addCase(editProfileApi.fulfilled, (state, action) => {
            state.editProfile.loading = false;
            state.editProfile.data = action.payload?.data;
        }).addCase(editProfileApi.rejected, (state, action) => {
            state.editProfile.loading = false;
            state.editProfile.error = action.payload;
        })

        builder.addCase(logoutApi.pending, (state, action) => {
            state.logout.loading = true;
        }).addCase(logoutApi.fulfilled, (state, action) => {
            state.logout.loading = false;
            state.logout.data = action.payload?.data;
        }).addCase(logoutApi.rejected, (state, action) => {
            state.logout.loading = false;
            state.logout.error = action.payload;
        })

        builder.addCase(changePswApi.pending, (state, action) => {
            state.changePsw.loading = true;
        }).addCase(changePswApi.fulfilled, (state, action) => {
            state.changePsw.loading = false;
            state.changePsw.data = action.payload?.data;
        }).addCase(changePswApi.rejected, (state, action) => {
            state.changePsw.loading = false;
            state.changePsw.error = action.payload;
        })
    }
})

export default accountSlice.reducer;