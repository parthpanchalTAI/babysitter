import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Img from "../../../components/Img";
import { images } from "../../../assets/Images";
import { screenHeight, screenWidth } from "../../../utils/styleUtils";
import Container from "../../../components/Container";
import Label from "../../../components/Label";
import { fonts } from "../../../assets/Fonts/fonts";
import InputBox from "../../../components/InputBox";
import { colors } from "../../../assets/Colors/colors";
import Btn from "../../../components/Btn";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FooterComponents from "../../../components/FooterComponents";
import { AppStack } from "../../../navigators/NavActions";
import Ionicons from 'react-native-vector-icons/Ionicons';

const SignIn = () => {

    const navigation = useNavigation();
    const keyboardVerticalOffset = screenHeight * 0.15;

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
                <Img
                    imgSrc={images.back_img}
                    mpImage={{ mt: 45, mh: 15 }}
                    imgStyle={styles.back_img}
                    onPress={() => navigation.goBack()}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <KeyboardAwareScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false} behavior={Platform.OS == 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={keyboardVerticalOffset}>
                <Img
                    imgSrc={images.logo}
                    imgStyle={styles.logo_img}
                />

                <Container mpContainer={{ mh: 20 }}>
                    <Label labelSize={25} style={styles.sign_in_text}>Sign in</Label>

                    <InputBox
                        placeholder={'Email'}
                        containerStyle={styles.inputStyle}
                        height={50}
                        mpContainer={{ mt: 15 }}
                        mpInput={{ ph: 10 }}
                        inputStyle={{ color: colors.Black }}
                    />
                    <InputBox
                        placeholder={'Password'}
                        containerStyle={styles.inputStyle}
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
                    <Btn
                        title='Sign in'
                        btnStyle={styles.btn_style}
                        btnHeight={50}
                        mpBtn={{ mt: 25 }}
                        textColor={'white'}
                        textSize={16}
                        onPress={() => navigation.dispatch(AppStack)}
                    />

                    <Label labelSize={16} mpLabel={{ mt: 25 }} style={styles.forgotpsw_text} onPress={() => navigation.navigate('ForgotPassword')}>Forgot Password ?</Label>

                    <Container containerStyle={styles.or_container} mpContainer={{ mt: 30 }}>
                        <Container width={screenWidth * 0.30} height={1} containerStyle={{ backgroundColor: '#b2b2b2' }} />
                        <Label mpLabel={{ mh: 10 }} labelSize={16} textColor={colors.Input_Gray_text}>Or sign in with</Label>
                        <Container width={screenWidth * 0.30} height={1} containerStyle={{ backgroundColor: '#b2b2b2' }} />
                    </Container>

                    <Container containerStyle={styles.social_login_container} mpContainer={{ mh: 15, mt: 5 }}>
                        <Img
                            imgSrc={images.fb_img}
                            imgStyle={styles.social_login_img}
                        />
                        <Img
                            imgSrc={images.google_img}
                            imgStyle={styles.social_login_img}
                        />
                        <Img
                            imgSrc={images.apple_png}
                            imgStyle={styles.social_login_img}
                        />
                    </Container>
                </Container>
            </KeyboardAwareScrollView>

             <FooterComponents>
                <Container mpContainer={{ mb: 25 }} containerStyle={{ alignSelf: 'center' }} onPress={() => navigation.navigate('SignUp')}>
                    <Label labelSize={16} style={{ fontFamily: fonts.regular }}>Don't have an account?  <Label onPress={() => navigation.navigate('SignUp')} labelSize={16} style={{ fontFamily: fonts.regular, color: colors.light_pink }}>Sign Up</Label></Label>
                </Container>
            </FooterComponents>
        </View>
    )
}

const styles = StyleSheet.create({
    back_img: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    container: {
        flex: 1, backgroundColor: 'white'
    },
    logo_img: {
        width: screenWidth * 0.30,
        height: screenHeight * 0.20,
        resizeMode: 'contain',
        alignSelf: 'center',
    },
    sign_in_text: {
        fontFamily: fonts.regular, fontWeight: 'bold'
    },
    forgotpsw_text: {
        fontFamily: fonts.regular, alignSelf: 'center'
    },
    or_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    social_login_container: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'
    },
    social_login_img: {
        resizeMode: 'contain',
        width: screenWidth * 0.15,
        height: screenHeight * 0.15
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

export default SignIn;