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

export const contactUsApi = ApiPostRequest({
    endPoints: endPoints.contact_us
})

export const hourlyrRateApi = ApiPostRequest({
    endPoints: endPoints.hourly_rate
})

export const deleteAccountApi = ApiPostRequest({
    endPoints: endPoints.delete_account
})

export const getBabySitterDetailsApi = ApiPostRequest({
    endPoints: endPoints.get_user_details
})

export const getFeaturePlanListsApi = ApiGetRequest({
    endPoints: endPoints.feature_plan_lists
})

export const getFeaturePlanDetailsApi = ApiPostRequest({
    endPoints: endPoints.feature_plan_details
})

export const purchaseFeaturePlanApi = ApiPostRequest({
    endPoints: endPoints.purchase_feature_plan
})

export const activeFeaturePlanApi = ApiGetRequest({
    endPoints: endPoints.active_feature_plan
})

export const expiredFeaturePlanApi = ApiGetRequest({
    endPoints: endPoints.expire_feature_plan
})

export const featuredBabySitterApi = ApiPostRequest({
    endPoints: endPoints.featured_babysitter
})

export const sitterAvailabilityApi = ApiPostRequest({
    endPoints: endPoints.sitter_availability
})

const availabilityInitialStateData = {
    date: '',
    start_time: '',
    end_time: '',
    day_off: ''
}

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
        contact_us: {
            loading: false,
            data: {},
            error: null
        },
        hourly_rate: {
            loading: false,
            data: {},
            error: null
        },
        delete_account: {
            loading: false,
            data: {},
            error: null
        },
        babySitterDetails: {
            loading: false,
            data: {},
            error: null
        },
        feature_plan_lists: {
            loading: false,
            data: [],
            error: null
        },
        feature_plan_details: {
            loading: false,
            data: {},
            error: null
        },
        purchase_feature_plan: {
            loading: false,
            data: {},
            error: null
        },
        active_feature_plan: {
            loading: false,
            data: [],
            error: null
        },
        expire_feature_plan: {
            loading: false,
            data: [],
            error: null
        },
        feature_babysitter: {
            loading: false,
            data: {},
            error: null
        },
        sitter_availability: {
            loading: false,
            data: {},
            error: null
        },
        availabilityInitialStateData: availabilityInitialStateData
    },
    reducers: {
        saveAvailabilityData: (state, action) => {
            state.availabilityInitialStateData = {
                ...state.availabilityInitialStateData,
                ...action.payload
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(editProfileApi.pending, (state) => {
            state.editProfile.loading = true;
        }).addCase(editProfileApi.fulfilled, (state, action) => {
            state.editProfile.loading = false;
            state.editProfile.data = action.payload?.data;
        }).addCase(editProfileApi.rejected, (state, action) => {
            state.editProfile.loading = false;
            state.editProfile.error = action.payload;
        })

        builder.addCase(logoutApi.pending, (state) => {
            state.logout.loading = true;
        }).addCase(logoutApi.fulfilled, (state, action) => {
            state.logout.loading = false;
            state.logout.data = action.payload?.data;
        }).addCase(logoutApi.rejected, (state, action) => {
            state.logout.loading = false;
            state.logout.error = action.payload;
        })

        builder.addCase(changePswApi.pending, (state) => {
            state.changePsw.loading = true;
        }).addCase(changePswApi.fulfilled, (state, action) => {
            state.changePsw.loading = false;
            state.changePsw.data = action.payload?.data;
        }).addCase(changePswApi.rejected, (state, action) => {
            state.changePsw.loading = false;
            state.changePsw.error = action.payload;
        })

        builder.addCase(terms_conditionsApi.pending, (state) => {
            state.terms_conditions.loading = true;
        }).addCase(terms_conditionsApi.fulfilled, (state, action) => {
            state.terms_conditions.loading = false;
            state.terms_conditions.data = action?.payload?.data;
        }).addCase(terms_conditionsApi.rejected, (state, action) => {
            state.terms_conditions.loading = false;
            state.terms_conditions.error = action.payload;
        })

        builder.addCase(contactUsApi.pending, (state) => {
            state.contact_us.loading = true;
        }).addCase(contactUsApi.fulfilled, (state, action) => {
            state.contact_us.loading = false;
            state.contact_us.data = action.payload?.data;
        }).addCase(contactUsApi.rejected, (state, action) => {
            state.contact_us.loading = false;
            state.contact_us.error = action.payload;
        })

        builder.addCase(hourlyrRateApi.pending, (state) => {
            state.hourly_rate.loading = true;
        }).addCase(hourlyrRateApi.fulfilled, (state, action) => {
            state.hourly_rate.loading = false;
            state.hourly_rate.data = action.payload?.data;
        }).addCase(hourlyrRateApi.rejected, (state, action) => {
            state.hourly_rate.loading = false;
            state.hourly_rate.error = action.payload;
        })

        builder.addCase(deleteAccountApi.pending, (state) => {
            state.delete_account.loading = true;
        }).addCase(deleteAccountApi.fulfilled, (state, action) => {
            state.delete_account.loading = false;
            state.delete_account.data = action.payload?.data;
        }).addCase(deleteAccountApi.rejected, (state, action) => {
            state.delete_account.loading = false;
            state.delete_account.error = action.payload;
        })

        builder.addCase(getBabySitterDetailsApi.pending, (state) => {
            state.babySitterDetails.loading = true;
        }).addCase(getBabySitterDetailsApi.fulfilled, (state, action) => {
            state.babySitterDetails.loading = false;
            state.babySitterDetails.data = action.payload?.data;
        }).addCase(getBabySitterDetailsApi.rejected, (state, action) => {
            state.babySitterDetails.loading = false;
            state.babySitterDetails.error = action.payload;
        })

        builder.addCase(getFeaturePlanListsApi.pending, (state) => {
            state.feature_plan_lists.loading = true;
        }).addCase(getFeaturePlanListsApi.fulfilled, (state, action) => {
            state.feature_plan_lists.loading = false;
            state.feature_plan_lists.data = action.payload?.data;
        }).addCase(getFeaturePlanListsApi.rejected, (state, action) => {
            state.feature_plan_lists.loading = false;
            state.feature_plan_lists.error = action.payload;
        })

        builder.addCase(getFeaturePlanDetailsApi.pending, (state) => {
            state.feature_plan_details.loading = true;
        }).addCase(getFeaturePlanDetailsApi.fulfilled, (state, action) => {
            state.feature_plan_details.loading = false;
            state.feature_plan_details.data = action.payload?.data;
        }).addCase(getFeaturePlanDetailsApi.rejected, (state, action) => {
            state.feature_plan_details.loading = false;
            state.feature_plan_details.error = action.payload;
        })

        builder.addCase(purchaseFeaturePlanApi.pending, (state) => {
            state.purchase_feature_plan.loading = true;
        }).addCase(purchaseFeaturePlanApi.fulfilled, (state, action) => {
            state.purchase_feature_plan.loading = false;
            state.purchase_feature_plan.data = action.payload?.data;
        }).addCase(purchaseFeaturePlanApi.rejected, (state, action) => {
            state.purchase_feature_plan.loading = false;
            state.purchase_feature_plan.error = action.payload;
        })

        builder.addCase(activeFeaturePlanApi.pending, (state) => {
            state.active_feature_plan.loading = true;
        }).addCase(activeFeaturePlanApi.fulfilled, (state, action) => {
            state.active_feature_plan.loading = false;
            state.active_feature_plan.data = action.payload?.data;
        }).addCase(activeFeaturePlanApi.rejected, (state, action) => {
            state.active_feature_plan.loading = false;
            state.active_feature_plan.error = action.payload;
        })

        builder.addCase(expiredFeaturePlanApi.pending, (state) => {
            state.expire_feature_plan.loading = true;
        }).addCase(expiredFeaturePlanApi.fulfilled, (state, action) => {
            state.expire_feature_plan.loading = false;
            state.expire_feature_plan.data = action.payload?.data;
        }).addCase(expiredFeaturePlanApi.rejected, (state, action) => {
            state.expire_feature_plan.loading = false;
            state.expire_feature_plan.error = action.payload;
        })

        builder.addCase(featuredBabySitterApi.pending, (state) => {
            state.feature_babysitter.loading = true;
        }).addCase(featuredBabySitterApi.fulfilled, (state, action) => {
            state.feature_babysitter.loading = false;
            state.feature_babysitter.data = action.payload?.data;
        }).addCase(featuredBabySitterApi.rejected, (state, action) => {
            state.feature_babysitter.loading = false;
            state.feature_babysitter.error = action.payload;
        })

        builder.addCase(sitterAvailabilityApi.pending, (state) => {
            state.sitter_availability.loading = true;
        }).addCase(sitterAvailabilityApi.fulfilled, (state, action) => {
            state.sitter_availability.loading = false;
            state.sitter_availability.data = action.payload?.data;
        }).addCase(sitterAvailabilityApi.rejected, (state, action) => {
            state.sitter_availability.loading = false;
            state.sitter_availability.error = action.payload;
        })
    }
})

export const { saveAvailabilityData } = accountSlice.actions;
export default accountSlice.reducer;