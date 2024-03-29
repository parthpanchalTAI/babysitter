import { createSlice } from "@reduxjs/toolkit";
import { endPoints } from "../utils/apiEndPoints";
import { ApiGetRequest } from "../utils/apiService";

export const activeListApi = ApiGetRequest({
    endPoints: endPoints.active_history_lists
})

export const completeListApi = ApiGetRequest({
    endPoints: endPoints.complete_history_lists
})

const hisorySlice = createSlice({
    name: 'hisorySlice',
    initialState: {
        active_lists: {
            loading: false,
            data: [],
            error: null
        },
        complete_lists: {
            loading: false,
            data: [],
            error: null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(activeListApi.pending, (state) => {
            state.active_lists.loading = true;
        }).addCase(activeListApi.fulfilled, (state, action) => {
            state.active_lists.loading = false;
            state.active_lists.data = action.payload?.data;
        }).addCase(activeListApi.rejected, (state, action) => {
            state.active_lists.loading = false;
            state.active_lists.error = action.payload;
        })

        builder.addCase(completeListApi.pending, (state) => {
            state.complete_lists.loading = true;
        }).addCase(completeListApi.fulfilled, (state, action) => {
            state.complete_lists.loading = false;
            state.complete_lists.data = action.payload?.data;
        }).addCase(completeListApi.rejected, (state, action) => {
            state.complete_lists.loading = false;
            state.complete_lists.error = action.payload;
        })
    }
})

export default hisorySlice.reducer;