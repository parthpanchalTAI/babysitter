import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import Img from "../../../components/Img";
import { images } from "../../../assets/Images";
import Container from "../../../components/Container";
import { screenHeight, screenWidth } from "../../../utils/styleUtils";
import Label from "../../../components/Label";
import { fonts } from "../../../assets/Fonts/fonts";
import { colors } from "../../../assets/Colors/colors";
import InputBox from "../../../components/InputBox";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Btn from "../../../components/Btn";
import { useDispatch, useSelector } from "react-redux";
import { hourly_rateApi } from "../../../features/authSlice";
import { AppStack } from "../../../navigators/NavActions";
import { saveUser } from "../../../features/whiteLists";
import MainContainer from "../../../components/MainContainer";

const HourlyRate = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const keyboardVerticalOffset = screenHeight * 0.15;

    const [hourlyRate, setHourlyRate] = useState('');

    const { loading: loading } = useSelector((state) => state.auth.hourly_rate);

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

    const hourlyRateHandler = async () => {
        let formData = new FormData();
        formData.append('hourly_rate', hourlyRate);

        const response = await dispatch(hourly_rateApi({ data: formData })).unwrap();
        console.log('res of hourly rate', response);

        if (response?.status == 'Success') {
            dispatch(saveUser({ ...response?.data }));
            navigation.dispatch(AppStack);
        } else if (hourlyRate == '') {
            Alert.alert('Please Enter Valid Hourly Rate');
        }
    }

    return (
        <MainContainer absoluteModalLoading={loading}>
            <KeyboardAwareScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false} behavior={Platform.OS == 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={keyboardVerticalOffset}>
                <Container containerStyle={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
                    <Img
                        imgSrc={images.rate}
                        imgStyle={{
                            width: screenWidth * 0.40,
                            height: screenHeight * 0.30,
                            resizeMode: 'contain',
                            alignSelf: 'center'
                        }}
                        mpImage={{ mt: 40 }}
                    />

                    <Label labelSize={30} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }}>Hourly Rate</Label>
                    <Container containerStyle={{ width: '92%' }}>
                        <InputBox
                            placeholderTextColor={'#000'}
                            containerStyle={styles.inputStyle}
                            onChangeText={(val) => setHourlyRate(val)}
                            value={hourlyRate}
                            height={50}
                            mpContainer={{ mt: 20 }}
                            mpInput={{ ph: 20 }}
                            inputStyle={{ color: colors.Black }}
                            textSize={14}
                            keyboardType="phone-pad"
                            rightIcon={() => (<Label labelSize={16} style={{ fontFamily: fonts.regular, position: 'absolute', right: 10 }}>{'/hr'}</Label>)}
                            leftIcon={() => (<Label labelSize={16} style={{ fontFamily: fonts.regular, position: 'absolute', left: 10 }}>{'$'}</Label>)}
                        />
                    </Container>

                    <Btn
                        title='Done'
                        btnStyle={styles.btn_style}
                        btnHeight={50}
                        mpBtn={{ mt: 25 }}
                        textColor={'white'}
                        textSize={16}
                        onPress={() => hourlyRateHandler()}
                    />
                </Container>
            </KeyboardAwareScrollView>
        </MainContainer>
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
        width: "92%"
    }
})

export default HourlyRate;