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
        }
    },
    reducers: {
        setCountryCode: (state, { payload }) => {
            state.country_code = payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerApi.pending, (state, action) => {
            state.register.loading = true
        }).addCase(registerApi.fulfilled, (state, action) => {
            state.register.loading = false;
            state.register.data = action.payload?.data;
        }).addCase(registerApi.rejected, (state, action) => {
            state.register.loading = false
        })

        builder.addCase(loginApi.pending, (state, action) => {
            state.login.loading = true
        }).addCase(loginApi.fulfilled, (state, action) => {
            state.login.loading = false;
            state.login.data = action.payload?.data;
        }).addCase(loginApi.rejected, (state, action) => {
            state.login.loading = false
        })

        builder.addCase(forgotPswApi.pending, (state, action) => {
            state.forgotPsw.loading = true;
        }).addCase(forgotPswApi.fulfilled, (state, action) => {
            state.forgotPsw.loading = false;
            state.forgotPsw.data = action.payload?.data;
        }).addCase(forgotPswApi.rejected, (state, action) => {
            state.forgotPsw.loading = false;
            state.forgotPsw.error = action.payload;
        })

        builder.addCase(resetPswApi.pending, (state, action) => {
            state.resetPsw.loading = true;
        }).addCase(resetPswApi.fulfilled, (state, action) => {
            state.resetPsw.loading = false;
            state.resetPsw.data = action.payload?.data;
        }).addCase(resetPswApi.rejected, (state, action) => {
            state.resetPsw.loading = false;
            state.resetPsw.error = action.payload;
        })

        builder.addCase(emailVerifyApi.pending, (state, action) => {
            state.emailVerify.loading = true;
        }).addCase(emailVerifyApi.fulfilled, (state, action) => {
            state.emailVerify.loading = false;
            state.emailVerify.data = action.payload?.data;
        }).addCase(emailVerifyApi.rejected, (state, action) => {
            state.emailVerify.loading = false;
            state.emailVerify.error = action.payload;
        })

        builder.addCase(resendOTPApi.pending, (state, action) => {
            state.resendOTP.loading = true;
        }).addCase(resendOTPApi.fulfilled, (state, action) => {
            state.resendOTP.loading = false;
            state.resendOTP.data = action.payload?.data;
        }).addCase(resendOTPApi.rejected, (state, action) => {
            state.resendOTP.loading = false;
            state.resendOTP.error = action.payload;
        })

        builder.addCase(completeprofileApi.pending, (state, action) => {
            state.completeProfile.loading = true;
        }).addCase(completeprofileApi.fulfilled, (state, action) => {
            state.completeProfile.loading = false;
            state.completeProfile.data = action.payload?.data;
        }).addCase(completeprofileApi.rejected, (state, action) => {
            state.completeProfile.loading = false;
            state.completeProfile.error = action.payload;
        })
    }
})

export const { setCountryCode } = authSlice.actions;
export default authSlice.reducer;