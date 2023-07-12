import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Img from "../../../components/Img";
import { images } from "../../../assets/Images";
import Container from "../../../components/Container";
import Label from "../../../components/Label";
import { fonts } from "../../../assets/Fonts/fonts";
import InputBox from "../../../components/InputBox";
import { colors } from "../../../assets/Colors/colors";
import { vs } from "../../../utils/styleUtils";
import Btn from "../../../components/Btn";

const CompleteProfile = () => {

    const navigation = useNavigation();

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
        <Container containerStyle={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView contentContainerStyle={{ paddingBottom: vs(20) }} showsVerticalScrollIndicator={false}>
                <Container mpContainer={{ mt: 20, mh: 20 }}>
                    <Label labelSize={30} style={{ fontFamily: fonts.bold, fontWeight: 'bold', textAlign: 'center' }}>Complete your profile</Label>

                    <Container mpContainer={{ mt: 30 }}>
                        <Container containerStyle={{ width: '100%' }} pointerEvents="box-only">
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
                            title='Continue'
                            btnStyle={styles.btn_style}
                            btnHeight={50}
                            mpBtn={{ mt: 25 }}
                            textColor={'white'}
                            textSize={16}
                            onPress={() => navigation.navigate('Availability')}
                        />

                    </Container>
                </Container>
            </ScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({
    back_img: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
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

export default CompleteProfile;