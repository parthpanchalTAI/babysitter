import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import { images } from "../../../assets/Images";
import Img from "../../../components/Img";
import { fs, hs, screenHeight, screenWidth, vs } from "../../../utils/styleUtils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field'
import Label from "../../../components/Label";
import { fonts } from "../../../assets/Fonts/fonts";
import { colors } from "../../../assets/Colors/colors";
import Btn from "../../../components/Btn";
import Container from "../../../components/Container";
import { useDispatch, useSelector } from "react-redux";
import { emailVerifyApi, resendOTPApi } from "../../../features/authSlice";
import MainContainer from "../../../components/MainContainer";
import Toast from 'react-native-simple-toast';

const EmailVerify = ({
    route
}) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const keyboardVerticalOffset = screenHeight * 0.15;
    const CELL_COUNT = 4;

    const [value, setValue] = useState('');
    const [resendOTP, setResendOTP] = useState('');

    const { email, fromSignup, signupOTP, fromForgot, forgotOTP } = route?.params;

    const { loading: loading } = useSelector((state) => state.auth.emailVerify);
    const { loading: resendOTPLoading } = useSelector((state) => state.auth.resendOTP);

    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => {
                return renderHeader();
            }
        });
    }, []);

    const renderHeader = () => {
        return (
            <Container containerStyle={{ backgroundColor: 'white' }}>
                <Img
                    imgSrc={images.back_img}
                    mpImage={{ mt: 45, mh: 15 }}
                    imgStyle={styles.back_img}
                    onPress={() => navigation.goBack()}
                />
            </Container>
        )
    }

    const verifyHandler = async () => {
        if (value == '') {
            Alert.alert('Please Enter OTP');
        }

        let formData = new FormData();
        formData.append('email', email);
        formData.append('otp', value);

        const response = await dispatch(emailVerifyApi({ data: formData })).unwrap();
        console.log('response of emailVerify', response);

        if (response?.status == 'Success' && fromSignup == true) {
            navigation.navigate('SetLocation');
        } else if (response?.status == 'Success' && fromForgot == true) {
            navigation.navigate('ResetPassword', { email: email });
        } else {
            // Toast.show(response?.message, Toast.SHORT);
        }

        // if (response?.status == 'Success' && fromForgot == true) {
        //     navigation.navigate('ResetPassword', { email: route?.params?.email });
        // } else {
        //     // Toast.show(response?.message, Toast.SHORT);
        // }
    }

    const resendHandler = async () => {
        let formData = new FormData();
        formData.append('email', email);

        let result = await dispatch(resendOTPApi({ data: formData })).unwrap();
        setResendOTP(result.data.otp)
    };

    return (
        <MainContainer
            absoluteModalLoading={value == '' ? null : loading}
            absoluteLoading={resendOTPLoading}
        >
            <Container containerStyle={styles.container}>
                <KeyboardAwareScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false} behavior={Platform.OS == 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={keyboardVerticalOffset}>
                    <Img
                        imgSrc={images.verify_img}
                        imgStyle={styles.verify_img}
                    />
                    <Label labelSize={30} style={styles.heading_text}>Verify your email</Label>
                    <Label labelSize={20} style={styles.desc_text}>Check your email for an OTP</Label>
                    <Label labelSize={14} style={styles.desc_text} mpLabel={{ mt: 5 }}>{email}</Label>
                    <Label labelSize={14} style={styles.desc_text} mpLabel={{ mt: 5 }}>SignupOTP:- {signupOTP}</Label>
                    <Label labelSize={14} style={styles.desc_text} mpLabel={{ mt: 5 }}>ResendOTP:- {resendOTP}</Label>
                    <Label labelSize={14} style={styles.desc_text} mpLabel={{ mt: 5 }}>ForgotPassword:- {forgotOTP}</Label>

                    <Container containerStyle={{ alignItems: 'center' }}>
                        <CodeField
                            ref={ref}
                            {...props}
                            value={value}
                            onChangeText={(txt) => setValue(txt)}
                            cellCount={CELL_COUNT}
                            rootStyle={styles.codeFieldRoot}
                            keyboardType="number-pad"
                            textContentType="oneTimeCode"
                            renderCell={({ index, symbol, isFocused }) => (
                                <Text
                                    key={index}
                                    style={[styles.cell, isFocused && styles.focusCell]}
                                    onLayout={getCellOnLayoutHandler(index)}>
                                    {symbol || (isFocused ? <Cursor /> : null)}
                                </Text>
                            )}
                        />
                    </Container>

                    <Btn
                        title='Verify'
                        btnStyle={styles.btn_style}
                        btnHeight={50}
                        mpBtn={{ mt: 55 }}
                        textColor={'white'}
                        textSize={16}
                        onPress={verifyHandler}
                    />

                    <Btn
                        title='Resend OTP'
                        btnStyle={styles.resend_btn_style}
                        btnHeight={50}
                        mpBtn={{ mt: 10 }}
                        textColor={'black'}
                        textSize={16}
                        onPress={resendHandler}
                    />
                </KeyboardAwareScrollView>
            </Container>
        </MainContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'white',
    },
    back_img: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    verify_img: {
        width: screenWidth * 0.30,
        height: screenHeight * 0.30,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    heading_text: {
        fontWeight: 'bold', fontFamily: fonts.regular, alignSelf: 'center', bottom: 30
    },
    desc_text: {
        fontFamily: fonts.regular, alignSelf: 'center', bottom: 20
    },
    root: { padding: 20 },
    codeFieldRoot: { marginTop: 10 },
    cell: {
        width: hs(45),
        height: vs(45),
        marginHorizontal: 15,
        fontSize: fs(24),
        alignSelf: 'center',
        borderRadius: 5,
        borderBottomWidth: 1,
        borderColor: colors.light_pink,
        color: colors.light_pink,
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    focusCell: {
        borderColor: colors.light_pink,
        color: colors.Input_Gray_text,
    },
    btn_style: {
        backgroundColor: colors.light_pink,
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        width: "90%"
    },
    resend_btn_style: {
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        width: "90%"
    }
})

export default EmailVerify;