import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
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

const EmailVerify = ({
    route
}) => {

    const keyboardVerticalOffset = screenHeight * 0.15;
    const CELL_COUNT = 4;

    const navigation = useNavigation();

    const [value, setValue] = useState('');

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
                    imgSrc={images.verify_img}
                    imgStyle={styles.verify_img}
                />
                <Label labelSize={30} style={styles.heading_text}>Verify your email</Label>
                <Label labelSize={20} style={styles.desc_text}>Check your email for an OTP</Label>
                <Label labelSize={14} style={styles.desc_text} mpLabel={{ mt: 5 }}>michaelclark68@gmail.com</Label>

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
                    onPress={() => {
                        if (route?.params?.fromForgot == true) {
                            navigation.navigate('ResetPassword');
                        } else {
                            navigation.navigate('SetLocation')
                        }
                    }
                    }
                />

                <Btn
                    title='Resend OTP'
                    btnStyle={styles.resend_btn_style}
                    btnHeight={50}
                    mpBtn={{ mt: 10 }}
                    textColor={'black'}
                    textSize={16}
                    onPress={() => navigation.goBack()}
                />
            </KeyboardAwareScrollView>
        </View>
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
        width: "92%"
    },
    resend_btn_style: {
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        width: "92%"
    }
})

export default EmailVerify;
