import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Container from "../../../components/Container";
import { images } from "../../../assets/Images";
import Img from "../../../components/Img";
import Label from "../../../components/Label";
import { fonts } from "../../../assets/Fonts/fonts";
import { useNavigation } from "@react-navigation/core";
import { screenHeight, screenWidth } from "../../../utils/styleUtils";
import InputBox from "../../../components/InputBox";
import { colors } from "../../../assets/Colors/colors";
import Btn from "../../../components/Btn";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Ionicons from 'react-native-vector-icons/Ionicons';

const ChangePassword = () => {

    const navigation = useNavigation();
    const keyboardVerticalOffset = screenHeight * 0.15;

    const [isPassword, setIsPassword] = useState(false);
    const [isNewPassword, setIsNewPassword] = useState(false);
    const [isConfirmPassword, setIsConfirmPassword] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => {
                return renderHeader();
            }
        });
    }, []);

    const renderHeader = () => {
        return (
            <View style={{ backgroundColor: 'white' }}>
                <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Img
                        imgSrc={images.back_img}
                        mpImage={{ mt: 45, mh: 15 }}
                        imgStyle={{
                            width: 20,
                            height: 20,
                            resizeMode: 'contain'
                        }}
                        onPress={() => navigation.goBack()}
                    />
                    <Label labelSize={18} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }} mpLabel={{ mt: 45 }}>Change password</Label>
                </Container>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <KeyboardAwareScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false} behavior={Platform.OS == 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={keyboardVerticalOffset}>
                <Img
                    imgSrc={images.change_psw_logo}
                    imgStyle={{
                        width: screenWidth * 0.35,
                        height: screenHeight * 0.30,
                        resizeMode: 'contain',
                        alignSelf: 'center'
                    }}
                />

                <Container mpContainer={{ mh: 20 }}>
                    <InputBox
                        placeholder={'Old password'}
                        containerStyle={styles.inputStyle}
                        height={50}
                        mpContainer={{ mt: 10 }}
                        mpInput={{ ph: 10 }}
                        inputStyle={{ color: colors.Black }}
                        rightIcon={() => <Ionicons name={!isPassword ? 'ios-eye-off' : 'ios-eye'} size={20} color={colors.Input_Gray_text} style={{ position: 'absolute', top: 15, right: 10 }}
                            onPress={() => {
                                setIsPassword((prev) => !prev);
                            }}
                        />}
                        secureTextEntry={!isPassword}
                    />

                    <InputBox
                        placeholder={'New password'}
                        containerStyle={styles.inputStyle}
                        height={50}
                        mpContainer={{ mt: 15 }}
                        mpInput={{ ph: 10 }}
                        inputStyle={{ color: colors.Black }}
                        rightIcon={() => <Ionicons name={!isNewPassword ? 'ios-eye-off' : 'ios-eye'} size={20} color={colors.Input_Gray_text} style={{ position: 'absolute', top: 15, right: 10 }}
                            onPress={() => {
                                setIsNewPassword((prev) => !prev);
                            }}
                        />}
                        secureTextEntry={!isNewPassword}
                    />

                    <InputBox
                        placeholder={'Confirm password'}
                        containerStyle={styles.inputStyle}
                        height={50}
                        mpContainer={{ mt: 15 }}
                        mpInput={{ ph: 10 }}
                        inputStyle={{ color: colors.Black }}
                        rightIcon={() => <Ionicons name={!isConfirmPassword ? 'ios-eye-off' : 'ios-eye'} size={20} color={colors.Input_Gray_text} style={{ position: 'absolute', top: 15, right: 10 }}
                            onPress={() => {
                                setIsConfirmPassword((prev) => !prev);
                            }}
                        />}
                        secureTextEntry={!isConfirmPassword}
                    />

                    <Btn
                        title='Reset'
                        btnStyle={styles.btn_style}
                        btnHeight={50}
                        mpBtn={{ mt: 25 }}
                        textColor={'white'}
                        textSize={16}
                        onPress={() => navigation.goBack()}
                    />
                </Container>
            </KeyboardAwareScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    inputStyle: {
        backgroundColor: '#f2f2f2',
        borderColor: '#f2f2f2',
        borderWidth: 1,
        borderRadius: 8,
    },
    btn_style: {
        backgroundColor: colors.light_pink,
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        width: "100%"
    }
})

export default ChangePassword;