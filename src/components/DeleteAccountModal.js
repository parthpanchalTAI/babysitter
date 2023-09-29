import React from "react";
import { Text, StyleSheet, Pressable, View } from "react-native";
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from "react-redux";
import { deleteAccountApi } from "../features/accountSlice";
import Toast from "react-native-simple-toast";
import { deleteAccount, getValues } from "../features/whiteLists";
import { useNavigation } from "@react-navigation/native";
import { AuthStack } from "../navigators/NavActions";
import Label from "./Label";
import { colors } from "../assets/Colors/colors";
import { fonts } from "../assets/Fonts/fonts";
import { fs, hs, vs } from "../utils/styleUtils";
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";

const DeleteAccountModal = ({ isVisible, closeModal }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { fbUid } = useSelector((state) => state.whiteLists);

    const removeBabySitterUser = async () => {
        try {
            await database().ref('User/' + fbUid).remove();
            await auth().currentUser.delete();
            console.log('remove user from db');
            return true;
        } catch (error) {
            console.log('error of remove user from db', error);
            return false;
        }
    }

    const deleteAccountHandler = async () => {
        const response = await dispatch(deleteAccountApi({})).unwrap();
        console.log("res of del", response);

        if (response?.status === 'Success') {
            Toast.show(response?.message, Toast.SHORT);
            removeBabySitterUser();
            dispatch(deleteAccount());
            dispatch(getValues(false));
            navigation.dispatch(AuthStack);
        } else {
            Toast.show(response?.message, Toast.SHORT);
        }
    }

    return (
        <Modal
            isVisible={isVisible}
            statusBarTranslucent={true}
            backdropOpacity={0.5}
            useNativeDriverForBackdrop={true}
            useNativeDriver={true}
            animationIn="fadeIn"
            animationOut="fadeOut"
            deviceHeight={999999999}
            onBackdropPress={closeModal}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Label style={styles.modalText}>Are you sure you want to delete this account?</Label>

                    <View style={styles.buttonContainer}>
                        <Pressable style={styles.cancelButton} onPress={closeModal}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </Pressable>

                        <Pressable style={styles.deleteButton} onPress={deleteAccountHandler}>
                            <Text style={styles.buttonText}>Delete</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: "85%"
    },
    modalText: {
        fontSize: fs(16),
        marginBottom: vs(25),
        textAlign: 'center',
        fontFamily: fonts.regular
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    cancelButton: {
        backgroundColor: colors.Input_Gray_text,
        paddingVertical: vs(12),
        paddingHorizontal: hs(25),
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: colors.light_pink,
        paddingVertical: vs(12),
        paddingHorizontal: hs(25),
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: fs(14),
        fontWeight: 'bold',
        fontFamily: fonts.regular,
        textAlign: 'center'
    },
});

export default DeleteAccountModal;
