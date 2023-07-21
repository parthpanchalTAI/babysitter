import React, { useEffect, useState } from "react";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from '@react-native-firebase/auth';
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { fcmToken } from "../../utils/globals";
import { socialLoginApi } from "../../features/authSlice";
import { getValues, setFBUid, saveUser } from "../../features/whiteLists";
import { AppStack } from "../../navigators/NavActions";

const SocialLogin = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);

    GoogleSignin.configure({
        webClientId: ''
    }, []);

    useEffect(() => {
        GoogleSignin.signOut();
    }, []);

    const googleLoginHandler = async () => {
        try {
            const userInfo = await GoogleSignin.signIn();
            console.log('userInfo', userInfo);

            const googleCredential = auth.GoogleAuthProvider.credential(userInfo.idToken);

            setLoading(true);

            let formData = new FormData();
            formData.append('email', userInfo.user.email);
            formData.append('fcm_token', fcmToken);
            formData.append('google_id', userInfo.user.id);
            formData.append('first_name', userInfo.user.givenName);
            formData.append('last_name', userInfo.user.familyName);

            let socialLoginRes = await dispatch(socialLoginApi({ data: formData })).unwrap();

            if (socialLoginRes?.status == 'Success') {
                const fbResult = await auth().signInWithCredential(googleCredential);
                dispatch(getValues(true));
                dispatch(setFBUid(fbResult.user.uid));
                dispatch(saveUser({ ...socialLoginRes?.data }));
                setLoading(false);

                navigation.dispatch(AppStack);
                return;
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log('error from google login', error);
        }
    }
    return { googleLoginHandler };
}

export default SocialLogin;