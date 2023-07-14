import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Img from "../../../components/Img";
import { images } from "../../../assets/Images";
import { useNavigation } from "@react-navigation/native";
import Container from "../../../components/Container";
import Label from "../../../components/Label";
import { fonts } from "../../../assets/Fonts/fonts";
import { screenHeight, screenWidth } from "../../../utils/styleUtils";
import { colors } from "../../../assets/Colors/colors";
import InputBox from "../../../components/InputBox";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Btn from "../../../components/Btn";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FooterComponents from "../../../components/FooterComponents";

const SignUp = () => {

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
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <KeyboardAwareScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false} behavior={Platform.OS == 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={keyboardVerticalOffset}>
                <Label labelSize={25} mpLabel={{ mt: 25 }} style={styles.heading_text}>Sign up to join</Label>
                <Img
                    imgSrc={images.profile_placeholder}
                    imgStyle={styles.profile_img}
                    mpImage={{ mt: 15 }}
                />

                <Container mpContainer={{ mh: 20 }}>
                    <Container containerStyle={styles.name_container}>
                        <Container containerStyle={{ width: '49%' }}>
                            <InputBox
                                placeholder={'First name'}
                                containerStyle={styles.inputStyle}
                                height={50}
                                mpContainer={{ mt: 5 }}
                                mpInput={{ ph: 10 }}
                                inputStyle={{ color: colors.Black }}
                            />
                        </Container>

                        <Container containerStyle={{ width: '49%' }}>
                            <InputBox
                                placeholder={'Last name'}
                                containerStyle={styles.inputStyle}
                                height={50}
                                mpContainer={{ mt: 5 }}
                                mpInput={{ ph: 10 }}
                                inputStyle={{ color: colors.Black }}
                            />
                        </Container>
                    </Container>

                    <InputBox
                        placeholder={'Email'}
                        containerStyle={styles.inputStyle}
                        height={50}
                        mpContainer={{ mt: 15 }}
                        mpInput={{ ph: 10 }}
                        inputStyle={{ color: colors.Black }}
                    />

                    <Container containerStyle={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Container containerStyle={{ width: '25%' }} pointerEvents="box-only">
                            <InputBox
                                placeholder={'+27'}
                                containerStyle={styles.inputStyle}
                                inputStyle={{ color: colors.Black, alignItems: 'center', justifyContent: 'center' }}
                                inputHeight={50}
                                mpInputContainer={{ ph: 10, mt: 15 }}
                                textSize={14}
                                editable={false}
                                pointerEvents="box-only"
                                rightIcon={() => (
                                    <Img
                                        imgSrc={images.down_img}
                                        imgStyle={{
                                            width: 12,
                                            height: 12,
                                            resizeMode: 'contain'
                                        }}
                                    />
                                )}
                            />
                        </Container>

                        <Container containerStyle={{ width: '73%' }}>
                            <InputBox
                                placeholder={'Phone'}
                                containerStyle={styles.inputStyle}
                                height={50}
                                mpContainer={{ mt: 15 }}
                                mpInput={{ ph: 10 }}
                                inputStyle={{ color: colors.Black }}
                                textSize={14}
                            />
                        </Container>
                    </Container>

                    <InputBox
                        placeholder={'Password'}
                        containerStyle={styles.psw_input}
                        height={50}
                        mpContainer={{ mt: 15 }}
                        mpInput={{ ph: 10 }}
                        inputStyle={{ color: colors.Black }}
                        textSize={14}
                        rightIcon={() => <Ionicons name={!isPasswordVisible ? 'ios-eye-off' : 'ios-eye'} size={20} color={colors.Input_Gray_text} style={{ position: 'absolute', top: 15, right: 10 }}
                            onPress={() => {
                                setIsPasswordVisible((prev) => !prev);
                            }}
                        />}
                        secureTextEntry={!isPasswordVisible}
                    />

                    <Btn
                        title='Sign up'
                        btnStyle={styles.btn_style}
                        btnHeight={50}
                        mpBtn={{ mt: 25 }}
                        textColor={'white'}
                        textSize={16}
                        onPress={() => navigation.navigate('EmailVerify')}
                    />
                </Container>
            </KeyboardAwareScrollView>

            <FooterComponents>
                <Container containerStyle={{ alignItems: 'center' }} mpContainer={{ mb: 25 }} onPress={() => navigation.navigate('SignIn')}>
                    <Label labelSize={16} style={{ fontFamily: fonts.regular }}>Already have an account ? <Label labelSize={16} style={{ fontFamily: fonts.regular, color: colors.light_pink }}>Sign in</Label></Label>
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
    bg_img: {
        height: "100%",
        width: "100%",
    },
    profile_img: {
        width: screenWidth * 0.20,
        height: screenHeight * 0.20,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    heading_text: {
        fontWeight: 'bold', fontFamily: fonts.regular, alignSelf: 'center'
    },
    name_container: {
        flexDirection: 'row', flex: 1, justifyContent: 'space-between'
    },
    inputStyle: {
        backgroundColor: '#f2f2f2',
        borderColor: '#f2f2f2',
        borderWidth: 1,
        borderRadius: 8,
    },
    psw_input: {
        width: '100%',
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

export default SignUp;


{/* <ImageBackground source={images.bgImg} style={styles.bg_img}>

</ImageBackground> */}