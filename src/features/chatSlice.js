import { createSlice } from "@reduxjs/toolkit";
import { endPoints } from "../utils/apiEndPoints";
import { ApiPostRequest } from "../utils/apiService";

export const block_unBlock_OppUserApi = ApiPostRequest({
    endPoints: endPoints.block_unblock
})

const chatSlice = createSlice({
    name: 'chatSlice',
    initialState: {
        block_unBlock_OppUser: {
            loading: false,
            data: {},
            error: null
        },
    },
    extraReducers: (builder) => {
        builder.addCase(block_unBlock_OppUserApi.pending, (state) => {
            state.block_unBlock_OppUser.loading = true;
        }).addCase(block_unBlock_OppUserApi.fulfilled, (state, action) => {
            state.block_unBlock_OppUser.loading = false;
            state.block_unBlock_OppUser.data = action.payload?.data;
        }).addCase(block_unBlock_OppUserApi.rejected, (state, action) => {
            state.block_unBlock_OppUser.loading = false;
            state.block_unBlock_OppUser.error = action.payload;
        })
    }
})

export default chatSlice.reducer;