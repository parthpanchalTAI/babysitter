import { useNavigation } from "@react-navigation/native";
import React, { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, View } from "react-native";
import Img from "../../../components/Img";
import { images } from "../../../assets/Images";
import Container from "../../../components/Container";
import Label from "../../../components/Label";
import { fonts } from "../../../assets/Fonts/fonts";
import InputBox from "../../../components/InputBox";
import { colors } from "../../../assets/Colors/colors";
import { vs } from "../../../utils/styleUtils";
import Btn from "../../../components/Btn";
import GenderModal from "../../../modals/GenderModal/GenderModal";
import { Formik } from "formik";
import { completeProfileValidate } from "../../../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { completeprofileApi } from "../../../features/authSlice";
import MainContainer from "../../../components/MainContainer";

const CompleteProfile = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const genderRef = useRef(null);

    const [selectedGender, setSelectedGender] = useState('');
    const [DOB, setDOB] = useState(false);
    const [selectDOB, setSelectDOB] = useState('');

    const { loading: loading } = useSelector((state) => state.auth.completeProfile)

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

    const handleDOBConfirm = (date) => {
        setSelectDOB(date.toISOString().split('T')[0]);
        setDOB(false);
    };

    const showDOBPicker = () => {
        setDOB(true);
    };

    const openGenderModal = () => {
        if (genderRef.current && genderRef.current.present && typeof genderRef.current.present === 'function') {
            genderRef.current.present();
        } else {
            console.error('The present function is not available on genderRef.current');
        }
    }

    const completeProfileHandler = async (values) => {
        let formData = new FormData();

        formData.append('gender', selectedGender);
        formData.append('dob', selectDOB)
        formData.append('education', values.education);
        formData.append('experience', values.experience);
        formData.append('about', values.about);

        console.log('selg', selectedGender);
        console.log('dob', selectDOB);

        if (selectedGender == '' || selectDOB == '') {
            Alert.alert('Please complete your profile');
        } else {
            const response = await dispatch(completeprofileApi({ data: formData })).unwrap();
            console.log('res of complete profile', response);

            if (response?.status == 'Success') {
                navigation.navigate('Availability');
            }
        }
    }

    return (
        <MainContainer absoluteLoading={loading}>
            <Container containerStyle={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView contentContainerStyle={{ paddingBottom: vs(20) }} showsVerticalScrollIndicator={false}>
                    <Container mpContainer={{ mt: 20, mh: 20 }}>
                        <Label labelSize={30} style={{ fontFamily: fonts.bold, fontWeight: 'bold', textAlign: 'center' }}>Complete your profile</Label>

                        <Container mpContainer={{ mt: 30 }}>
                            <Formik
                                initialValues={completeProfileValidate.initialState}
                                validationSchema={completeProfileValidate.schema}
                                onSubmit={(values) => completeProfileHandler(values)}
                            >
                                {({ values, setFieldTouched, handleChange, handleSubmit, errors, touched }) => (
                                    <Fragment>
                                        <Container onPress={openGenderModal} containerStyle={{ width: '100%' }} pointerEvents="box-only">
                                            <InputBox
                                                placeholder={'Gender'}
                                                containerStyle={{
                                                    backgroundColor: '#f2f2f2',
                                                    borderColor: '#f2f2f2',
                                                    borderWidth: 1,
                                                    borderRadius: 8,
                                                }}
                                                inputStyle={{ color: colors.Black, alignItems: 'center', justifyContent: 'center' }}
                                                inputHeight={50}
                                                value={selectedGender}
                                                mpInputContainer={{ ph: 10 }}
                                                textSize={14}
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

                                        <Container onPress={showDOBPicker} containerStyle={{ width: '100%' }} pointerEvents="box-only" mpContainer={{ mt: 15 }}>
                                            <InputBox
                                                placeholder={'Dob'}
                                                // placeholderTextColor={selectDOB == '' ? colors.Input_Gray_text : colors.Black}
                                                containerStyle={styles.inputStyle}
                                                inputStyle={{ color: colors.Black, alignItems: 'center', justifyContent: 'center' }}
                                                inputHeight={50}
                                                mpInputContainer={{ ph: 10 }}
                                                textSize={14}
                                                pointerEvents="box-only"
                                                value={selectDOB}
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

                                        <DateTimePickerModal
                                            isVisible={DOB}
                                            mode="date"
                                            onConfirm={handleDOBConfirm}
                                            onCancel={() => setDOB(false)}
                                        />

                                        <Container containerStyle={{ width: '100%' }} pointerEvents="box-only" mpContainer={{ mt: 15 }}>
                                            <InputBox
                                                placeholder={'Education'}
                                                containerStyle={{
                                                    backgroundColor: '#f2f2f2',
                                                    borderColor: touched.education && errors.education ? 'red' : '#f2f2f2',
                                                    borderWidth: 1,
                                                    borderRadius: 8,
                                                }}
                                                value={values.education}
                                                onChangeText={handleChange('education')}
                                                onBlur={() => setFieldTouched('education')}
                                                touched={touched.education}
                                                inputStyle={{ color: colors.Black, alignItems: 'center', justifyContent: 'center' }}
                                                inputHeight={50}
                                                mpInputContainer={{ ph: 10 }}
                                                textSize={14}
                                            // rightIcon={() => (
                                            //     <Img
                                            //         imgSrc={images.down_img}
                                            //         imgStyle={{
                                            //             width: 12,
                                            //             height: 12,
                                            //             resizeMode: 'contain',
                                            //             position: 'absolute',
                                            //             right: 20
                                            //         }}
                                            //     />
                                            // )}
                                            />
                                        </Container>

                                        <Container containerStyle={{ width: '100%' }} pointerEvents="box-only" mpContainer={{ mt: 15 }}>
                                            <InputBox
                                                placeholder={'Experience'}
                                                containerStyle={{
                                                    backgroundColor: '#f2f2f2',
                                                    borderColor: touched.experience && errors.experience ? 'red' : '#f2f2f2',
                                                    borderWidth: 1,
                                                    borderRadius: 8,
                                                }}
                                                value={values.experience}
                                                onChangeText={handleChange('experience')}
                                                onBlur={() => setFieldTouched('experience')}
                                                touched={touched.experience}
                                                inputStyle={{ color: colors.Black, alignItems: 'center', justifyContent: 'center' }}
                                                inputHeight={50}
                                                mpInputContainer={{ ph: 10 }}
                                                textSize={14}
                                            // rightIcon={() => (
                                            //     <Img
                                            //         imgSrc={images.down_img}
                                            //         imgStyle={{
                                            //             width: 12,
                                            //             height: 12,
                                            //             resizeMode: 'contain',
                                            //             position: 'absolute',
                                            //             right: 20
                                            //         }}
                                            //     />
                                            // )}
                                            />
                                        </Container>

                                        <InputBox
                                            placeholder={'About'}
                                            containerStyle={{
                                                backgroundColor: '#f2f2f2',
                                                borderColor: touched.about && errors.about ? 'red' : '#f2f2f2',
                                                borderWidth: 1,
                                                borderRadius: 8,
                                            }}
                                            value={values.about}
                                            onChangeText={handleChange('about')}
                                            onBlur={() => setFieldTouched('about')}
                                            touched={touched.about}
                                            textAlignVertical="top"
                                            height={100}
                                            mpContainer={{ mt: 15 }}
                                            mpInput={{ ph: 15, pt: 15 }}
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
                                            onPress={handleSubmit}
                                        />
                                    </Fragment>
                                )}
                            </Formik>
                        </Container>
                    </Container>
                </ScrollView>
                <GenderModal
                    modalizeRef={genderRef}
                    selectedGender={selectedGender}
                    setSelectedGender={setSelectedGender}
                />
            </Container>
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
        width: "100%"
    }
})

export default CompleteProfile;