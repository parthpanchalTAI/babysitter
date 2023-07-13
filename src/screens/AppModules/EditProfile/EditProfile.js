import React, { useLayoutEffect } from "react";
import Container from "../../../components/Container";
import { View } from "react-native-animatable";
import Img from "../../../components/Img";
import { images } from "../../../assets/Images";
import { useNavigation } from "@react-navigation/core";
import { hs, screenHeight, vs } from "../../../utils/styleUtils";
import InputBox from "../../../components/InputBox";
import { colors } from "../../../assets/Colors/colors";
import { StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Btn from "../../../components/Btn";
import Label from "../../../components/Label";
import { fonts } from "../../../assets/Fonts/fonts";

const EditProfile = () => {

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
                    <Label labelSize={18} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }} mpLabel={{ mt: 45 }}>Edit profile</Label>
                </Container>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <KeyboardAwareScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false} behavior={Platform.OS == 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={keyboardVerticalOffset}>
                <Container mpContainer={{ mt: 20, mh: 20 }}>
                    <Container containerStyle={{ alignSelf: 'center' }}>
                        <Img
                            imgSrc={images.profile_img}
                            imgStyle={{
                                width: hs(90),
                                height: vs(90),
                                resizeMode: 'contain',
                            }}
                        />
                        <Img
                            imgSrc={images.edit_img}
                            imgStyle={{
                                width: hs(25),
                                height: vs(25),
                                resizeMode: 'contain',
                                alignSelf: 'center',
                                position: 'absolute',
                                right: 0,
                                bottom: 0,
                            }}
                        />
                    </Container>

                    <InputBox
                        placeholder={'Name'}
                        containerStyle={styles.inputStyle}
                        height={50}
                        mpContainer={{ mt: 25 }}
                        mpInput={{ ph: 10 }}
                        inputStyle={{ color: colors.Black }}
                    />

                    <InputBox
                        placeholder={'Email'}
                        containerStyle={styles.inputStyle}
                        height={50}
                        mpContainer={{ mt: 15 }}
                        mpInput={{ ph: 10 }}
                        inputStyle={{ color: colors.Black }}
                    />

                    <Container pointerEvents="box-only" onPress={() => navigation.navigate('EditLocation')}>
                        <InputBox
                            placeholder={'Address'}
                            containerStyle={styles.inputStyle}
                            textAlignVertical="top"
                            height={100}
                            mpContainer={{ mt: 15 }}
                            mpInput={{ ph: 10, pt: 15 }}
                            inputStyle={{ color: colors.Black }}
                            multiline={true}
                            textInCenter={10}
                            textOnTop={-10}
                        />
                    </Container>

                    <Container mpContainer={{ mt: 15 }} containerStyle={{ width: '100%' }} pointerEvents="box-only">
                        <InputBox
                            placeholder={'Gender'}
                            containerStyle={styles.inputStyle}
                            inputStyle={{ color: colors.Black, alignItems: 'center', justifyContent: 'center' }}
                            inputHeight={50}
                            mpInputContainer={{ ph: 10 }}
                            textSize={14}
                            editable={false}
                            pointerEvents="box-only"
                            rightIcon={() => (
                                <Img
                                    imgSrc={images.down_img}
                                    imgStyle={{
                                        width: 12,
                                        height: 12,
                                        resizeMode: 'contain',
                                        position: 'absolute',
                                        right: 20
                                    }}
                                />
                            )}
                        />
                    </Container>

                    <Container containerStyle={{ width: '100%' }} pointerEvents="box-only" mpContainer={{ mt: 15 }}>
                        <InputBox
                            placeholder={'Dob'}
                            containerStyle={styles.inputStyle}
                            inputStyle={{ color: colors.Black, alignItems: 'center', justifyContent: 'center' }}
                            inputHeight={50}
                            mpInputContainer={{ ph: 10 }}
                            textSize={14}
                            editable={false}
                            pointerEvents="box-only"
                            rightIcon={() => (
                                <Img
                                    imgSrc={images.calender_img}
                                    imgStyle={{
                                        width: 18,
                                        height: 18,
                                        resizeMode: 'contain',
                                        position: 'absolute',
                                        right: 20
                                    }}
                                />
                            )}
                        />
                    </Container>

                    <Container containerStyle={{ width: '100%' }} pointerEvents="box-only" mpContainer={{ mt: 15 }}>
                        <InputBox
                            placeholder={'Education'}
                            containerStyle={styles.inputStyle}
                            inputStyle={{ color: colors.Black, alignItems: 'center', justifyContent: 'center' }}
                            inputHeight={50}
                            mpInputContainer={{ ph: 10 }}
                            textSize={14}
                            editable={false}
                            pointerEvents="box-only"
                            rightIcon={() => (
                                <Img
                                    imgSrc={images.down_img}
                                    imgStyle={{
                                        width: 12,
                                        height: 12,
                                        resizeMode: 'contain',
                                        position: 'absolute',
                                        right: 20
                                    }}
                                />
                            )}
                        />
                    </Container>

                    <Container containerStyle={{ width: '100%' }} pointerEvents="box-only" mpContainer={{ mt: 15 }}>
                        <InputBox
                            placeholder={'Experience'}
                            containerStyle={styles.inputStyle}
                            inputStyle={{ color: colors.Black, alignItems: 'center', justifyContent: 'center' }}
                            inputHeight={50}
                            mpInputContainer={{ ph: 10 }}
                            textSize={14}
                            editable={false}
                            pointerEvents="box-only"
                            rightIcon={() => (
                                <Img
                                    imgSrc={images.down_img}
                                    imgStyle={{
                                        width: 12,
                                        height: 12,
                                        resizeMode: 'contain',
                                        position: 'absolute',
                                        right: 20
                                    }}
                                />
                            )}
                        />
                    </Container>

                    <InputBox
                        placeholder={'About'}
                        containerStyle={styles.inputStyle}
                        textAlignVertical="top"
                        height={100}
                        mpContainer={{ mt: 15 }}
                        mpInput={{ ph: 10, pt: 15 }}
                        inputStyle={{ color: colors.Black }}
                        multiline={true}
                        textInCenter={10}
                        textOnTop={-10}
                    />

                    <Btn
                        title='Update Profile'
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

export default EditProfile;