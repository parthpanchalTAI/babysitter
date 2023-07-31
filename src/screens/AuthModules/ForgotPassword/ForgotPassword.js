import { useNavigation } from "@react-navigation/native";
import React, { Fragment, useLayoutEffect } from "react";
import { StyleSheet, ToastAndroid } from "react-native";
import Img from "../../../components/Img";
import { images } from "../../../assets/Images";
import { screenHeight, screenWidth } from "../../../utils/styleUtils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Label from "../../../components/Label";
import { fonts } from "../../../assets/Fonts/fonts";
import Container from "../../../components/Container";
import { colors } from "../../../assets/Colors/colors";
import InputBox from "../../../components/InputBox";
import Btn from "../../../components/Btn";
import { Formik } from "formik";
import { forgotValidate } from "../../../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { forgotPswApi } from "../../../features/authSlice";
import MainContainer from "../../../components/MainContainer";
import Toast from 'react-native-simple-toast';

const ForgotPassword = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const keyboardVerticalOffset = screenHeight * 0.15;

    const { loading: loading } = useSelector((state) => state.auth.forgotPsw);

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

    const forgotPasswordHandler = async (values) => {
        let formData = new FormData();
        formData.append('email', values.email);

        const response = await dispatch(forgotPswApi({ data: formData })).unwrap();
        console.log('response of forgotpsw', response);

        if (response?.status == 'Success') {
            Toast.show(response?.message, Toast.SHORT);
            navigation.navigate('EmailVerify', { fromForgot: true, email: values.email, forgotOTP: response?.data?.otp })
        } else {
            Toast.show(response?.message, Toast.SHORT);
        }
    }

    return (
        <MainContainer absoluteModalLoading={loading}>
            <Container containerStyle={styles.container}>
                <KeyboardAwareScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false} behavior={Platform.OS == 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={keyboardVerticalOffset}>
                    <Img
                        imgSrc={images.forgotpsw_img}
                        imgStyle={styles.forgotpsw_img}
                    />
                    <Label labelSize={25} style={styles.forgotpsw_text}>Forgot password ?</Label>

                    <Container mpContainer={{ mh: 20 }}>
                        <Label labelSize={16} mpLabel={{ mt: 15 }} style={styles.forgotpsw_desc_text}>Enter your email address below and we will send you a verification code</Label>
                        <Formik
                            initialValues={forgotValidate.initialState}
                            validationSchema={forgotValidate.schema}
                            onSubmit={(values) => forgotPasswordHandler(values)}
                        >
                            {({ values, setFieldTouched, handleChange, handleSubmit, errors, touched }) => (
                                <Fragment>
                                    <InputBox
                                        placeholder={'Email'}
                                        containerStyle={{
                                            backgroundColor: '#f2f2f2',
                                            borderColor: touched.email && errors.email ? 'red' : '#f2f2f2',
                                            borderWidth: 1,
                                            borderRadius: 8,
                                        }}
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                        onBlur={() => setFieldTouched('email')}
                                        touched={touched.email}
                                        height={50}
                                        mpContainer={{ mt: 15 }}
                                        mpInput={{ ph: 10 }}
                                        inputStyle={{ color: colors.Black }}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                    {touched.email && errors.email && <Label style={{ fontFamily: fonts.regular, color: 'red' }} mpLabel={{ mt: 2, ml: 2 }}>{errors.email}</Label>}

                                    <Btn
                                        title='Send'
                                        btnStyle={styles.btn_style}
                                        btnHeight={50}
                                        mpBtn={{ mt: 28 }}
                                        textColor={'white'}
                                        textSize={16}
                                        onPress={handleSubmit}
                                    />
                                </Fragment>
                            )}
                        </Formik>
                    </Container>
                </KeyboardAwareScrollView>
            </Container>
        </MainContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: 'white'
    },
    back_img: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    forgotpsw_img: {
        width: screenWidth * 0.50,
        height: screenHeight * 0.33,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    forgotpsw_text: {
        fontFamily: fonts.regular, fontWeight: 'bold', alignSelf: 'center'
    },
    forgotpsw_desc_text: {
        alignItems: 'center', color: colors.Input_Gray_text, fontFamily: fonts.regular
    },
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

export default ForgotPassword;
