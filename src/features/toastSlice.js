import { createSlice } from '@reduxjs/toolkit';

const toastSlice = createSlice( {
    name: 'toastSlice',
    initialState: {
        successMessage: '',
        errorMessage: ''
    },
    reducers: {
        messageHandler: ( state, { payload } ) => {
            console.log( 'success message', payload );
            state.successMessage = payload;
        },
        errorMessageHandler: ( state, { payload } ) => {
            console.log( 'error message', payload );
            state.errorMessage = payload;
        },
        removeMessageHandler: ( state ) => {
            state.successMessage = '';
            state.errorMessage = '';
        }
    }
} );

export const { messageHandler, removeMessageHandler, errorMessageHandler } = toastSlice.actions;
export default toastSlice.reducer;