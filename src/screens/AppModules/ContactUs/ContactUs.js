import { useNavigation } from "@react-navigation/core";
import React, { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import Img from "../../../components/Img";
import { images } from "../../../assets/Images";
import { fonts } from "../../../assets/Fonts/fonts";
import Label from "../../../components/Label";
import Container from "../../../components/Container";
import { screenHeight, screenWidth } from "../../../utils/styleUtils";
import InputBox from "../../../components/InputBox";
import { colors } from "../../../assets/Colors/colors";
import Btn from "../../../components/Btn";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ContactUs = () => {

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
            <Container containerStyle={{ backgroundColor: 'white' }} onPress={() => navigation.goBack()}>
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
                    <Label labelSize={18} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }} mpLabel={{ mt: 45 }}>Contact us</Label>
                </Container>
            </Container>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <KeyboardAwareScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false} behavior={Platform.OS == 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={keyboardVerticalOffset}>
                <Img
                    imgSrc={images.contact_logo}
                    imgStyle={{
                        width: screenWidth * 0.55,
                        height: screenHeight * 0.30,
                        resizeMode: 'contain',
                        alignSelf: 'center'
                    }}
                />

                <Container mpContainer={{ mh: 20 }}>
                    <Label labelSize={16} style={{ fontFamily: fonts.regular, top: 10 }}>Email address*</Label>
                    <InputBox
                        placeholder={'loremipsum@gmail.com'}
                        containerStyle={styles.inputStyle}
                        height={50}
                        mpContainer={{ mt: 25 }}
                        mpInput={{ ph: 10 }}
                        inputStyle={{ color: colors.Black }}
                    />

                    <Label labelSize={16} style={{ fontFamily: fonts.regular, top: 15 }}>Detail description of issue*</Label>
                    <InputBox
                        placeholder={'loremipsum@gmail.com'}
                        containerStyle={styles.inputStyle}
                        height={50}
                        mpContainer={{ mt: 25 }}
                        mpInput={{ ph: 10 }}
                        inputStyle={{ color: colors.Black }}
                    />

                    <Label labelSize={16} style={{ fontFamily: fonts.regular, top: 20 }}>Attach screnshot</Label>

                    <Container containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <InputBox
                            placeholder={'File name'}
                            containerStyle={styles.fileUpload_inputStyle}
                            height={50}
                            mpContainer={{ mt: 25 }}
                            mpInput={{ ph: 10 }}
                            inputStyle={{ color: colors.Black }}
                        />
                        <Btn
                            title='Upload'
                            btnStyle={styles.upload_btn_style}
                            btnHeight={50}
                            mpBtn={{ mt: 25 }}
                            textColor={'white'}
                            textSize={16}
                            onPress={() => navigation.goBack()}
                        />
                    </Container>

                    <Btn
                        title='Send'
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
    fileUpload_inputStyle: {
        backgroundColor: '#f2f2f2',
        borderColor: '#f2f2f2',
        borderWidth: 1,
        borderRadius: 8,
        width: screenWidth * 0.65
    },
    upload_btn_style: {
        backgroundColor: colors.Input_Gray_text,
        borderRadius: 8,
        justifyContent: 'center',
        alignSelf: 'center',
        width: "25%"
    },
    btn_style: {
        backgroundColor: colors.light_pink,
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        width: "100%"
    }
})

export default ContactUs;