import { useNavigation } from "@react-navigation/native";
import React, { Fragment, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { images } from "../../../assets/Images";
import { screenHeight, screenWidth } from "../../../utils/styleUtils";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Img from "../../../components/Img";
import { fonts } from "../../../assets/Fonts/fonts";
import Label from "../../../components/Label";
import Container from "../../../components/Container";
import InputBox from "../../../components/InputBox";
import { colors } from "../../../assets/Colors/colors";
import Btn from "../../../components/Btn";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Formik } from "formik";
import { resetPasswordValidate } from "../../../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { resetPswApi } from "../../../features/authSlice";
import MainContainer from "../../../components/MainContainer";
import Toast from 'react-native-simple-toast';

const ResetPassword = ({
    route
}) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const keyboardVerticalOffset = screenHeight * 0.15;

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPassword, setIsConfirmPassword] = useState(false);

    const { loading: loading } = useSelector((state) => state.auth.resetPsw);

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

    const resetPasswordHandler = async (values) => {
        let formData = new FormData();
        formData.append('email', route?.params?.email);
        formData.append('password', values.password);

        const response = await dispatch(resetPswApi({ data: formData })).unwrap();
        console.log('res of resetpsw', response);

        if (response?.status == 'Success') {
            Toast.show(response?.message, Toast.SHORT);
            navigation.navigate('SignIn');
        }else{
            Toast.show(response?.message, Toast.SHORT);
        }
    }

    return (
        <MainContainer absoluteModalLoading={loading}>
            <Container containerStyle={{ flex: 1, backgroundColor: 'white' }}>
                <KeyboardAwareScrollView disableScrollViewPanResponder={true} contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false} behavior={Platform.OS == 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={keyboardVerticalOffset}>
                    <Img
                        imgSrc={images.resetpsw_img}
                        imgStyle={styles.resetpsw_img}
                    />

                    <Label labelSize={25} style={styles.resetpsw_text}>Reset your password</Label>

                    <Container mpContainer={{ mh: 20,mt: 15 }}>
                        <Formik
                            initialValues={resetPasswordValidate.initialState}
                            validationSchema={resetPasswordValidate.schema}
                            onSubmit={(values) => resetPasswordHandler(values)}
                        >
                            {({ values, setFieldTouched, handleChange, handleSubmit, errors, touched }) => (
                                <Fragment>
                                    <InputBox
                                        placeholder={'New password'}
                                        containerStyle={{
                                            backgroundColor: '#f2f2f2',
                                            borderColor: touched.password && errors.password ? 'red' : '#f2f2f2',
                                            borderWidth: 1,
                                            borderRadius: 8,
                                        }}
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        onBlur={() => setFieldTouched('password')}
                                        touched={touched.password}
                                        height={50}
                                        mpContainer={{ mt: 15 }}
                                        mpInput={{ ph: 10 }}
                                        inputStyle={{ color: colors.Black }}
                                        rightIcon={() => <Ionicons name={!isPasswordVisible ? 'ios-eye-off' : 'ios-eye'} size={20} color={colors.Input_Gray_text} style={{ position: 'absolute', top: 15, right: 10 }}
                                            onPress={() => {
                                                setIsPasswordVisible((prev) => !prev);
                                            }}
                                        />}
                                        secureTextEntry={!isPasswordVisible}
                                    />
                                    {touched.password && errors.password && <Label style={{ fontFamily: fonts.regular, color: 'red' }} mpLabel={{ mt: 2, ml: 2 }}>{errors.password}</Label>}

                                    <InputBox
                                        placeholder={'Confirm password'}
                                        containerStyle={{
                                            backgroundColor: '#f2f2f2',
                                            borderColor: touched.confirmPassword && errors.confirmPassword ? 'red' : '#f2f2f2',
                                            borderWidth: 1,
                                            borderRadius: 8,
                                        }}
                                        value={values.confirmPassword}
                                        onChangeText={handleChange('confirmPassword')}
                                        onBlur={() => setFieldTouched('confirmPassword')}
                                        touched={touched.confirmPassword}
                                        height={50}
                                        mpContainer={{ mt: 15 }}
                                        mpInput={{ ph: 10 }}
                                        inputStyle={{ color: colors.Black }}
                                        rightIcon={() => <Ionicons name={!isConfirmPassword ? 'ios-eye-off' : 'ios-eye'} size={20} color={colors.Input_Gray_text} style={{ position: "absolute", right: 10, top: 15 }}
                                            onPress={() => {
                                                setIsConfirmPassword((prev) => !prev);
                                            }}
                                        />}
                                        secureTextEntry={!isConfirmPassword}
                                    />
                                    {touched.confirmPassword && errors.confirmPassword && <Label style={{ fontFamily: fonts.regular, color: 'red' }} mpLabel={{ mt: 2, ml: 2 }}>{errors.confirmPassword}</Label>}

                                    <Btn
                                        title='Reset'
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
    back_img: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    resetpsw_img: {
        width: screenWidth * 0.30,
        height: screenHeight * 0.30,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    resetpsw_text: {
        fontFamily: fonts.regular, fontWeight: 'bold', alignSelf: 'center'
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

export default ResetPassword;