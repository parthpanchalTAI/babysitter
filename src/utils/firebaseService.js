import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import { Alert } from "react-native";

const createUser = async ({ email }) => {
    try {
        let res = await auth().createUserWithEmailAndPassword(email, '786786');
        return res
    } catch (error) {
        console.log("error from create user", error);
        if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already use');
        }
        if (error.code === 'auth/invalid-email') {
            console.log("That email address is invalid!");
        }
        return null;
    }
};

const login = async ({ email }) => {
    try {
        let res = await auth().signInWithEmailAndPassword(email, '786786');
        return res;
    } catch (error) {
        console.log('error from login', error);
        if (error.code === 'auth/wrong-password') {
            console.log('The password is invalid or the user does not have a password.')
        }
        if (error.code === 'auth/user-not-found') {
            console.log('Sorry! User not found.')
        }
        return null;
    }
}

const saveUserTodb = async ({ uid, user_id, first_name, last_name, name, email, profile_image, device_token }) => {
    try {
        await database().ref('BabySitters/' + uid).set({
            uid,
            user_id,
            // first_name,
            // last_name,
            name,
            email,
            profile_image,
            device_token
        })
        console.log('saveUserTodb success');
        return true;
    }
    catch (error) {
        Alert.alert('SaveUserTodb', JSON.stringify(error));
        console.log('saveUserTodb', error);
        return false;
    }
};

const updateUser = async ({ uid, device_token, user_id }) => {
    try {
        await database().ref('BabySitters/' + uid).update({
            device_token: device_token,
            user_id: user_id
        });
        console.log('firebase update user res');
        return true;
    } catch (error) {
        console.log('firebase update user error', error);
        return false;
    }
}

const updateProfile = async ({ uid, name, profile_image }) => {
    try {
        await database().ref('BabySitters/' + uid).update({
            name: name,
            // first_name: first_name,
            // last_name: last_name,
            profile_image: profile_image ?? '',
            // gender: gender,
            // dob: dob,
            // education: education,
            // experience: experience,
            // about: about
        });
        console.log('firebase update user res');
        return true;
    } catch (error) {
        console.log('firebase update user error', error);
        return false;
    }
}

export default { createUser, saveUserTodb, login, updateUser, updateProfile };