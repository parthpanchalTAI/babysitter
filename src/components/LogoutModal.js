import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import Modal from 'react-native-modal';
import { useDispatch } from "react-redux";
import { logoutApi } from "../features/accountSlice";
import Toast from "react-native-simple-toast";
import { getValues, logOutUser } from "../features/whiteLists";
import { useNavigation } from "@react-navigation/native";
import { AuthStack } from "../navigators/NavActions";
import Container from "./Container";
import Label from "./Label";
import { colors } from "../assets/Colors/colors";
import { fonts } from "../assets/Fonts/fonts";
import { fs, hs, vs } from "../utils/styleUtils";

const LogoutModal = ({ isVisible, closeModal }) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const logoutHandler = async () => {
        const response = await dispatch(logoutApi({})).unwrap();

        if (response?.status == 'Success') {
            Toast.show(response?.message, Toast.SHORT);
            dispatch(logOutUser());
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
            <Container containerStyle={styles.modalContainer}>
                <Container containerStyle={styles.modalContent}>
                    <Label style={styles.modalText}>Are you sure want to logout ?</Label>

                    <Container containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                        <Pressable style={styles.cancelButton} onPress={closeModal}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </Pressable>

                        <Pressable style={styles.logoutButton} onPress={() => logoutHandler()}>
                            <Text style={styles.logoutButtonText}>Logout</Text>
                        </Pressable>
                    </Container>

                </Container>
            </Container>
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
        padding: 30,
        width: "90%"
    },
    modalText: {
        fontSize: fs(18),
        marginBottom: vs(25),
        textAlign: 'center',
        fontFamily: fonts.regular
    },
    logoutButton: {
        backgroundColor: colors.light_pink,
        paddingVertical: vs(12),
        paddingHorizontal: hs(25),
        borderRadius: 5,
        marginBottom: 0,
    },
    logoutButtonText: {
        color: 'white',
        fontSize: fs(16),
        fontWeight: 'bold',
        fontFamily: fonts.regular
    },
    cancelButton: {
        backgroundColor: colors.Input_Gray_text,
        paddingVertical: vs(12),
        paddingHorizontal: hs(25),
        borderRadius: 5,
        marginBottom: 0,
    },
    cancelButtonText: {
        color: 'white',
        fontSize: vs(16),
        fontWeight: 'bold',
        fontFamily: fonts.regular
    },
});

export default LogoutModal;