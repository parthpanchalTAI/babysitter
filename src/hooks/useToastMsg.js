import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'
import Toast from 'react-native-simple-toast';
import { removeMessageHandler } from "../features/toastSlice"
import { useAppDispatch } from '../store';

export const useToastMsg = (loading) => {
    
    const { successMessage, errorMessage } = useSelector((state) => state.toast);
    const dispatch = useAppDispatch();
    
    const [toastShown, setToastShown] = useState(false);

    useEffect(() => {
        if (successMessage !== '' && !toastShown) {
            Toast.show(successMessage, Toast.SHORT); // Corrected the syntax here
            setToastShown(true);
            dispatch(removeMessageHandler());
        }
    }, [successMessage, toastShown]);

    useEffect(() => {
        if (errorMessage !== '' && !toastShown) {
            Toast.show(errorMessage, Toast.SHORT); // Corrected the syntax here
            setToastShown(true);
            dispatch(removeMessageHandler());
        }
    }, [errorMessage, toastShown]);

    useEffect(() => {
        return () => {
            setToastShown(false); // Reset the toastShown state when the component unmounts
        };
    }, []);
}