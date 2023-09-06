import React, { Fragment, useLayoutEffect, useState } from "react";
import { StyleSheet } from "react-native";
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
import { useDispatch, useSelector } from "react-redux";
import { changePswApi } from "../../../features/accountSlice";
import { Formik } from "formik";
import { changePasswordValidate } from "../../../utils/validation";
import MainContainer from "../../../components/MainContainer";
import Toast from 'react-native-simple-toast';

const ChangePassword = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const keyboardVerticalOffset = screenHeight * 0.15;

    const [isPassword, setIsPassword] = useState(false);
    const [isNewPassword, setIsNewPassword] = useState(false);
    const [isConfirmPassword, setIsConfirmPassword] = useState(false);

    const { loading: loading } = useSelector((state) => state.account.changePsw);

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => {
                return renderHeader();
            }
        });
    }, []);

    const renderHeader = () => {
        return (
            <Container onPress={() => navigation.goBack()} containerStyle={{ backgroundColor: 'white' }}>
                <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Img
                        imgSrc={images.back_img}
                        mpImage={{ mt: 45, mh: 15 }}
                        imgStyle={{
                            width: 20,
                            height: 20,
                            resizeMode: 'contain'
                        }}
                    />
                    <Label labelSize={18} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }} mpLabel={{ mt: 45 }}>Change password</Label>
                </Container>
            </Container>
        )
    }

    const changePasswordHandler = async (values) => {
        let formData = new FormData();
        formData.append('current_password', values.current_password);
        formData.append('new_password', values.new_password);

        const response = await dispatch(changePswApi({ data: formData })).unwrap();
        console.log('res of change psw', response);

        if (response?.status == 'Success') {
            Toast.show(response?.message, Toast.SHORT);
            navigation.goBack();
        } else {
            Toast.show(response?.message, Toast.SHORT);
        }
    }

    return (
        <MainContainer absoluteLoading={loading}>
            <Container containerStyle={{ flex: 1, backgroundColor: 'white' }}>
                <KeyboardAwareScrollView disableScrollViewPanResponder={true} contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false} behavior={Platform.OS == 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={keyboardVerticalOffset}>
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
                        <Formik
                            initialValues={changePasswordValidate.initialState}
                            validationSchema={changePasswordValidate.schema}
                            onSubmit={(values) => changePasswordHandler(values)}
                        >
                            {({ values, setFieldTouched, handleChange, handleSubmit, errors, touched }) => (
                                <Fragment>
                                    <InputBox
                                        placeholder={'Old password'}
                                        containerStyle={{
                                            backgroundColor: '#f2f2f2',
                                            borderColor: touched.current_password && errors.current_password ? 'red' : '#f2f2f2',
                                            borderWidth: 1,
                                            borderRadius: 8,
                                        }}
                                        value={values.current_password}
                                        onChangeText={handleChange("current_password")}
                                        onBlur={() => setFieldTouched('current_password')}
                                        touched={touched.current_password}
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
                                    {touched.current_password && errors.current_password && <Label style={{ fontFamily: fonts.regular, color: 'red' }} mpLabel={{ mt: 2, ml: 2 }}>{errors.current_password}</Label>}

                                    <InputBox
                                        placeholder={'New password'}
                                        containerStyle={{
                                            backgroundColor: '#f2f2f2',
                                            borderColor: touched.new_password && errors.new_password ? 'red' : '#f2f2f2',
                                            borderWidth: 1,
                                            borderRadius: 8,
                                        }}
                                        value={values.new_password}
                                        onChangeText={handleChange("new_password")}
                                        onBlur={() => setFieldTouched('new_password')}
                                        touched={touched.new_password}
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
                                    {touched.new_password && errors.new_password && <Label style={{ fontFamily: fonts.regular, color: 'red' }} mpLabel={{ mt: 2, ml: 2 }}>{errors.new_password}</Label>}

                                    <InputBox
                                        placeholder={'Confirm password'}
                                        containerStyle={{
                                            backgroundColor: '#f2f2f2',
                                            borderColor: touched.confirmPassword && errors.confirmPassword ? 'red' : '#f2f2f2',
                                            borderWidth: 1,
                                            borderRadius: 8,
                                        }}
                                        value={values.confirmPassword}
                                        onChangeText={handleChange("confirmPassword")}
                                        onBlur={() => setFieldTouched('confirmPassword')}
                                        touched={touched.confirmPassword}
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
                                    {touched.confirmPassword && errors.confirmPassword && <Label style={{ fontFamily: fonts.regular, color: 'red' }} mpLabel={{ mt: 2, ml: 2 }}>{errors.confirmPassword}</Label>}

                                    <Btn
                                        title='RESET'
                                        btnStyle={styles.btn_style}
                                        btnHeight={50}
                                        mpBtn={{ mt: 25 }}
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