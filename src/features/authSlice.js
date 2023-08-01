import { createSlice } from "@reduxjs/toolkit";
import { endPoints } from "../utils/apiEndPoints";
import { ApiPostRequest } from "../utils/apiService";

export const registerApi = ApiPostRequest({
    endPoints: endPoints.register
})

export const loginApi = ApiPostRequest({
    endPoints: endPoints.login
})

export const forgotPswApi = ApiPostRequest({
    endPoints: endPoints.forgot_psw
})

export const resetPswApi = ApiPostRequest({
    endPoints: endPoints.reset_psw
})

export const emailVerifyApi = ApiPostRequest({
    endPoints: endPoints.verify_otp
})

export const resendOTPApi = ApiPostRequest({
    endPoints: endPoints.resend_otp
})

export const completeprofileApi = ApiPostRequest({
    endPoints: endPoints.set_user_profile
})

export const socialLoginApi = ApiPostRequest({
    endPoints: endPoints.social_login
})

export const addLocationApi = ApiPostRequest({
    endPoints: endPoints.set_location
})

export const hourly_rateApi = ApiPostRequest({
    endPoints: endPoints.hourly_rate
})

const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        country_code: '',
        register: {
            loading: false,
            data: {},
            error: null
        },
        login: {
            loading: false,
            data: {},
            error: null
        },
        forgotPsw: {
            loading: false,
            data: {},
            error: null
        },
        resetPsw: {
            loading: false,
            data: {},
            error: null
        },
        emailVerify: {
            loading: false,
            data: {},
            error: null
        },
        resendOTP: {
            loading: false,
            data: {},
            error: null
        },
        completeProfile: {
            loading: false,
            data: {},
            error: null
        },
        social_login: {
            loading: false,
            data: {},
            error: null
        },
        addLocation: {
            loading: false,
            data: {},
            error: null
        },
        hourly_rate: {
            loading: false,
            data: {},
            error: null
        }
    },
    reducers: {
        setCountryCode: (state, { payload }) => {
            state.country_code = payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerApi.pending, (state) => {
            state.register.loading = true
        }).addCase(registerApi.fulfilled, (state, action) => {
            state.register.loading = false;
            state.register.data = action.payload?.data;
        }).addCase(registerApi.rejected, (state, action) => {
            state.register.loading = false
        })

        builder.addCase(loginApi.pending, (state) => {
            state.login.loading = true
        }).addCase(loginApi.fulfilled, (state, action) => {
            state.login.loading = false;
            state.login.data = action.payload?.data;
        }).addCase(loginApi.rejected, (state, action) => {
            state.login.loading = false
        })

        builder.addCase(forgotPswApi.pending, (state) => {
            state.forgotPsw.loading = true;
        }).addCase(forgotPswApi.fulfilled, (state, action) => {
            state.forgotPsw.loading = false;
            state.forgotPsw.data = action.payload?.data;
        }).addCase(forgotPswApi.rejected, (state, action) => {
            state.forgotPsw.loading = false;
            state.forgotPsw.error = action.payload;
        })

        builder.addCase(resetPswApi.pending, (state) => {
            state.resetPsw.loading = true;
        }).addCase(resetPswApi.fulfilled, (state, action) => {
            state.resetPsw.loading = false;
            state.resetPsw.data = action.payload?.data;
        }).addCase(resetPswApi.rejected, (state, action) => {
            state.resetPsw.loading = false;
            state.resetPsw.error = action.payload;
        })

        builder.addCase(emailVerifyApi.pending, (state) => {
            state.emailVerify.loading = true;
        }).addCase(emailVerifyApi.fulfilled, (state, action) => {
            state.emailVerify.loading = false;
            state.emailVerify.data = action.payload?.data;
        }).addCase(emailVerifyApi.rejected, (state, action) => {
            state.emailVerify.loading = false;
            state.emailVerify.error = action.payload;
        })

        builder.addCase(resendOTPApi.pending, (state) => {
            state.resendOTP.loading = true;
        }).addCase(resendOTPApi.fulfilled, (state, action) => {
            state.resendOTP.loading = false;
            state.resendOTP.data = action.payload?.data;
        }).addCase(resendOTPApi.rejected, (state, action) => {
            state.resendOTP.loading = false;
            state.resendOTP.error = action.payload;
        })

        builder.addCase(completeprofileApi.pending, (state) => {
            state.completeProfile.loading = true;
        }).addCase(completeprofileApi.fulfilled, (state, action) => {
            state.completeProfile.loading = false;
            state.completeProfile.data = action.payload?.data;
        }).addCase(completeprofileApi.rejected, (state, action) => {
            state.completeProfile.loading = false;
            state.completeProfile.error = action.payload;
        })

        builder.addCase(socialLoginApi.pending, (state) => {
            state.social_login.loading = true;
        }).addCase(socialLoginApi.fulfilled, (state, action) => {
            state.social_login.loading = false;
            state.social_login.data = action.payload?.data;
        }).addCase(socialLoginApi.rejected, (state, action) => {
            state.social_login.loading = false;
            state.social_login.error = action.payload;
        })

        builder.addCase(addLocationApi.pending, (state) => {
            state.addLocation.loading = true;
        }).addCase(addLocationApi.fulfilled, (state, action) => {
            state.addLocation.loading = false;
            state.addLocation.data = action.payload?.data;
        }).addCase(addLocationApi.rejected, (state, action) => {
            state.addLocation.loading = false;
            state.addLocation.error = action.payload;
        })

        builder.addCase(hourly_rateApi.pending, (state) => {
            state.hourly_rate.loading = true;
        }).addCase(hourly_rateApi.fulfilled, (state, action) => {
            state.hourly_rate.loading = false;
            state.hourly_rate.data = action.payload?.data;
        }).addCase(hourly_rateApi.rejected, (state, action) => {
            state.hourly_rate.loading = false;
            state.hourly_rate.error = action.payload;
        })
    }
})

export const { setCountryCode } = authSlice.actions;
export default authSlice.reducer;