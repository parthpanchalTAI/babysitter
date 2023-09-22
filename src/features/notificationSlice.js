import { createSlice } from "@reduxjs/toolkit";
import { endPoints } from "../utils/apiEndPoints";
// import { ApiPostRequest } from "../utils/apiService";
import { ManualApiPostRequest } from "../utils/manualApiService";

// content-type = "formdata"
// export const notificationListsApi = ApiPostRequest({
//     endPoints: endPoints.notification_lists
// })

// content-type = "application/json"
export const notificationListsApi = ManualApiPostRequest({
    endPoints: endPoints.notification_lists
})

const notificationSlice = createSlice({
    name: 'notificationSlice',
    initialState: {
        notification_lists: {
            loading: false,
            data: [],
            error: null
        }
    },
    extraReducers: (builder) => {
        builder.addCase(notificationListsApi.pending, (state) => {
            state.notification_lists.loading = true;
        }).addCase(notificationListsApi.fulfilled, (state, action) => {
            state.notification_lists.loading = false;
            state.notification_lists.data = action.payload?.data;
        }).addCase(notificationListsApi.rejected, (state, action) => {
            state.notification_lists.loading = false;
            state.notification_lists.error = action.payload;
        })
    }
})

export default notificationSlice.reducer;