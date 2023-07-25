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

export const terms_conditionsApi = ApiGetRequest({
    endPoints: endPoints.terms_conditions
})

export const hourlyrRateApi = ApiPostRequest({
    endPoints: endPoints.hourly_rate
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
        terms_conditions: {
            loading: false,
            data: {},
            error: null
        },
        hourly_rate: {
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

        builder.addCase(terms_conditionsApi.pending, (state, action) => {
            state.terms_conditions.loading = true;
        }).addCase(terms_conditionsApi.fulfilled, (state, action) => {
            state.terms_conditions.loading = false;
            state.terms_conditions.data = action?.payload?.data;
        }).addCase(terms_conditionsApi.rejected, (state, action) => {
            state.terms_conditions.loading = false;
            state.terms_conditions.error = action.payload;
        })

        builder.addCase(hourlyrRateApi.pending, (state, action) => {
            state.hourly_rate.loading = true;
        }).addCase(hourlyrRateApi.fulfilled, (state, action) => {
            state.hourly_rate.loading = false;
            state.hourly_rate.data = action.payload?.data;
        }).addCase(hourlyrRateApi.rejected, (state, action) => {
            state.hourly_rate.loading = false;
            state.hourly_rate.error = action.payload;
        })
    }
})

export default accountSlice.reducer;