import { useNavigation } from "@react-navigation/native";
import React, { Fragment, useLayoutEffect } from "react";
import { StyleSheet } from "react-native";
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
import MainContainer from "../../../components/MainContainer";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import { hourlyRateValidate } from "../../../utils/validation";
import Toast from 'react-native-simple-toast';
import { saveUser } from "../../../features/whiteLists";
import { AppStack } from "../../../navigators/NavActions";
import { hourly_rateApi } from "../../../features/authSlice";

const HourlyRate = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const keyboardVerticalOffset = screenHeight * 0.15;

    const { user } = useSelector((state) => state?.whiteLists);
    const { loading: loading } = useSelector((state) => state.account.hourly_rate);

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

    const hourlyRateHandler = async (values) => {
        let formData = new FormData();
        formData.append('hourly_rate', values.hourly_rate);

        const response = await dispatch(hourly_rateApi({ data: formData })).unwrap();
        console.log('res of edit hourly rate');

        if (response?.status == 'Success') {
            Toast.show(response?.message, Toast.SHORT);
            dispatch(saveUser({ ...response?.data }));

            navigation.dispatch(AppStack);
        } else {
            Toast.show(response?.message, Toast.SHORT);
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
                    <Formik
                        initialValues={{
                            ...hourlyRateValidate.initialState,
                            hourly_rate: user?.hourly_rate,
                        }}
                        validationSchema={hourlyRateValidate.schema}
                        onSubmit={(values) => hourlyRateHandler(values)}
                        enableReinitialize={true}
                    >
                        {({ values, setFieldTouched, handleChange, handleSubmit, errors, touched }) => (
                            <Fragment>
                                <Container containerStyle={{ width: '92%' }}>
                                    <InputBox
                                        placeholderTextColor={'#000'}
                                        containerStyle={styles.inputStyle}
                                        value={values.hourly_rate}
                                        onChangeText={handleChange("hourly_rate")}
                                        onBlur={() => setFieldTouched('hourly_rate')}
                                        touched={touched.hourly_rate}
                                        errors={errors.hourly_rate}
                                        height={50}
                                        mpContainer={{ mt: 20 }}
                                        mpInput={{ ph: 20 }}
                                        inputStyle={{ color: colors.Black }}
                                        textSize={14}
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
                                    onPress={handleSubmit}
                                />
                            </Fragment>
                        )}
                    </Formik>
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