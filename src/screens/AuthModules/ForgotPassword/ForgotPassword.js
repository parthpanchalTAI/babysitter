import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
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

const ForgotPassword = () => {

    const navigation = useNavigation();
    const keyboardVerticalOffset = screenHeight * 0.15;

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
                    imgSrc={images.forgotpsw_img}
                    imgStyle={styles.forgotpsw_img}
                />
                <Label labelSize={25} style={styles.forgotpsw_text}>Forgot password ?</Label>

                <Container mpContainer={{ mh: 20 }}>
                    <Label labelSize={16} mpLabel={{ mt: 10 }} style={styles.forgotpsw_desc_text}>Enter your email address below and we will send you a verification code</Label>

                    <InputBox
                        placeholder={'Email'}
                        containerStyle={styles.inputStyle}
                        height={50}
                        mpContainer={{ mt: 15 }}
                        mpInput={{ ph: 10 }}
                        inputStyle={{ color: colors.Black }}
                    />

                    <Btn
                        title='Send'
                        btnStyle={styles.btn_style}
                        btnHeight={50}
                        mpBtn={{ mt: 25 }}
                        textColor={'white'}
                        textSize={16}
                        onPress={() => navigation.navigate('EmailVerify', { fromForgot: true })}
                    />
                </Container>
            </KeyboardAwareScrollView>
        </View>
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