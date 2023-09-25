import React, { useEffect, useState } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { fcmToken } from "../../utils/globals";
import { socialLoginApi } from "../../features/authSlice";
import { getValues, setFBUid, saveUser } from "../../features/whiteLists";
import { AppStack } from "../../navigators/NavActions";

const socialLogin = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    GoogleSignin.configure({
        webClientId: '116420358315-g70im2k1sjikrril2mg4j3449vshd5lm.apps.googleusercontent.com'
    }, []);

    useEffect(() => {
        GoogleSignin.signOut();
    }, []);

    const googleLoginHandler = async () => {
        try {
            const userInfo = await GoogleSignin.signIn();
            console.log('userInfo', userInfo);

            const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);

            let formData = new FormData();
            formData.append('email', userInfo.user.email);
            formData.append('fcm_token', fcmToken);
            formData.append('google_id', userInfo.user.id);
            formData.append('first_name', userInfo.user.givenName);
            formData.append('last_name', userInfo.user.familyName);

            let socialLoginRes = await dispatch(socialLoginApi({ data: formData })).unwrap();

            if (socialLoginRes?.status == 'Success') {
                console.log("socialLoginRes", socialLoginRes);
                const fbResult = await auth().signInWithCredential(googleCredential);
                dispatch(getValues(true));
                dispatch(setFBUid(fbResult.user.uid));
                dispatch(saveUser({ ...socialLoginRes?.data }));

                if(!socialLoginRes?.data?.address){
                    navigation.navigate('SetLocation');
                    return
                }
                navigation.dispatch(AppStack);
            }
        } catch (error) {
            console.log('error from google login', error);
        }
    }

    const facebookLoginHandler = async () => {

    }

    const appleLoginHandler = async () => {
            
    }
    return { googleLoginHandler };
}

export default socialLogin;