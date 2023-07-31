import { createSlice } from "@reduxjs/toolkit";
import { endPoints } from "../utils/apiEndPoints";
import { ApiGetRequest, ApiPostRequest } from "../utils/apiService";

export const jobRequestListsApi = ApiGetRequest({
    endPoints: endPoints.job_req_lists
})

export const jobRequestDetailsApi = ApiPostRequest({
    endPoints: endPoints.job_req_details
})

const dashboardSlice = createSlice({
    name: 'dashboardSlice',
    initialState: {
        job_req_lists: {
            loading: false,
            data: [],
            error: null
        },
        job_req_details: {
            loading: false,
            data: {},
            error: null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(jobRequestListsApi.pending, (state) => {
            state.job_req_lists.loading = true;
        }).addCase(jobRequestListsApi.fulfilled, (state, action) => {
            state.job_req_lists.loading = false;
            state.job_req_lists.data = action.payload?.data;
        }).addCase(jobRequestListsApi.rejected, (state, action) => {
            state.job_req_lists.loading = false;
            state.job_req_lists.error = action.payload;
        })

        builder.addCase(jobRequestDetailsApi.pending, (state) => {
            state.job_req_details.loading = true;
        }).addCase(jobRequestDetailsApi.fulfilled, (state, action) => {
            state.job_req_details.loading = false;
            state.job_req_details.data = action.payload?.data;
        }).addCase(jobRequestDetailsApi.rejected, (state, action) => {
            state.job_req_details.loading = false;
            state.job_req_details.error = action.payload;
        })
    }
})

export default dashboardSlice.reducer;