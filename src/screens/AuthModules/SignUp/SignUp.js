import React, { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Img from "../../../components/Img";
import { images } from "../../../assets/Images";
import { useNavigation } from "@react-navigation/native";
import Container from "../../../components/Container";
import Label from "../../../components/Label";
import { fonts } from "../../../assets/Fonts/fonts";
import { screenHeight } from "../../../utils/styleUtils";
import { colors } from "../../../assets/Colors/colors";
import InputBox from "../../../components/InputBox";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Btn from "../../../components/Btn";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FooterComponents from "../../../components/FooterComponents";
import { Formik } from "formik";
import { registerApi } from "../../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { getValues, saveUser } from "../../../features/whiteLists";
import { registerValidate } from "../../../utils/validation";
import MainContainer from "../../../components/MainContainer";
import ImagePicker from 'react-native-image-crop-picker'
import ImagePickerModal from "../../../modals/ImagePickerModal/ImagePickerModal";

const SignUp = ({
    route
}) => {

    const formRef = useRef();
    const ImagePickerModalRef = useRef();

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const keyboardVerticalOffset = screenHeight * 0.15;

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [profileImage, setProfileImage] = useState('');

    const { loading: loading } = useSelector((state) => state.auth.register);

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => {
                return renderHeader();
            }
        });
    }, []);

    const renderHeader = () => {
        return (
            <Container onPress={() => navigation.goBack()} containerStyle={{ backgroundColor: 'white' }}>
                <Img
                    imgSrc={images.back_img}
                    mpImage={{ mt: 45, mh: 15 }}
                    imgStyle={styles.back_img}
                />
            </Container>
        )
    }

    const registerHandler = async (values) => {
        let formData = new FormData();
        formData.append('first_name', values.first_name);
        formData.append('last_name', values.last_name);
        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('country_code', route.params?.country_code);
        formData.append('phone', values.phone);

        if (profileImage) {
            let file_name = profileImage?.substring(profileImage?.lastIndexOf('/') + 1);
            formData.append('profile_image', {
                uri: profileImage,
                name: file_name,
                type: 'image/jpeg'
            })
        }

        const response = await dispatch(registerApi({ data: formData })).unwrap();
        console.log('response of register ->', response);

        if (response?.status == 'Success') {
            dispatch(getValues(true));
            dispatch(saveUser({ ...response?.data }));
            navigation.navigate('EmailVerify', {
                email: response?.data?.email,
                signupOTP: response?.data?.otp,
                fromSignup: true
            });
        }
    }

    useEffect(() => {
        if (formRef.current) {
            formRef.current?.setFieldValue('country_code', route.params?.country_code || '');
        }
    }, [formRef, route.params]);

    const selectCountryHandler = () => {
        navigation.navigate('Country', {
            fromSignup: true
        });
    };

    const PickFromGallery = () => {
        ImagePicker.openPicker({
            cropping: true,
            mediaType: "photo",
            freeStyleCropEnabled: true
        }).then(image => {
            ImagePickerModalRef.current?.close();
            console.log(image);
            setProfileImage(image.path);
        }).catch((err) => {
            console.log(err);
        });
    }

    const PickFromCamera = () => {
        ImagePicker.openCamera({
            cropping: true,
            mediaType: "photo",
            freeStyleCropEnabled: true
        }).then((img) => {
            ImagePickerModalRef.current?.close()
            setProfileImage(img.path);
        }).catch((err) => {
            console.log("err", err)
        })
    }

    const openImagePickerModal = () => {
        ImagePickerModalRef.current.present();
    }

    return (
        <MainContainer
            absoluteLoading={loading}
        >
            <Container containerStyle={{ flex: 1, backgroundColor: 'white' }}>
                <KeyboardAwareScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false} behavior={Platform.OS == 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={keyboardVerticalOffset}>
                    <Label labelSize={25} mpLabel={{ mt: 25 }} style={styles.heading_text}>Sign up to join</Label>

                    {profileImage ?
                        <Img
                            imgSrc={{ uri: profileImage }}
                            width={75} height={75}
                            onPress={openImagePickerModal}
                            imgStyle={{
                                borderRadius: 40,
                                resizeMode: 'contain',
                                alignSelf: 'center'
                            }}
                            mpImage={{ mt: 20 }}
                        />
                        :
                        <Img
                            imgSrc={images.profile_placeholder}
                            imgStyle={styles.profile_img}
                            mpImage={{ mt: 20 }}
                            onPress={openImagePickerModal}
                        />
                    }
                    <Container mpContainer={{ mh: 20, mt: 25 }}>
                        <Formik
                            initialValues={registerValidate.initialState}
                            validationSchema={registerValidate.schema}
                            onSubmit={(values) => registerHandler(values)}
                            innerRef={formRef}
                        >
                            {({ values, setFieldTouched, handleChange, handleSubmit, errors, touched }) => (
                                <Fragment>
                                    <Container containerStyle={styles.name_container}>
                                        <Container containerStyle={{ width: '49%' }}>
                                            <InputBox
                                                placeholder={'First name'}
                                                containerStyle={{
                                                    backgroundColor: '#f2f2f2',
                                                    borderColor: touched.first_name && errors.first_name ? 'red' : '#f2f2f2',
                                                    borderWidth: 1,
                                                    borderRadius: 8,
                                                }}
                                                value={values.first_name}
                                                onChangeText={handleChange('first_name')}
                                                onBlur={() => setFieldTouched('first_name')}
                                                touched={touched.first_name}
                                                height={50}
                                                mpContainer={{ mt: 5 }}
                                                mpInput={{ ph: 10 }}
                                                inputStyle={{ color: colors.Black }}
                                            />
                                            {touched.last_name && errors.first_name && <Label style={{ fontFamily: fonts.regular, color: 'red' }} mpLabel={{ mt: 2, ml: 2 }}>{errors.first_name}</Label>}
                                        </Container>

                                        <Container containerStyle={{ width: '49%' }}>
                                            <InputBox
                                                placeholder={'Last name'}
                                                containerStyle={{
                                                    backgroundColor: '#f2f2f2',
                                                    borderColor: touched.last_name && errors.last_name ? 'red' : '#f2f2f2',
                                                    borderWidth: 1,
                                                    borderRadius: 8,
                                                }}
                                                value={values.last_name}
                                                onChangeText={handleChange('last_name')}
                                                onBlur={() => setFieldTouched('last_name')}
                                                touched={touched.last_name}
                                                height={50}
                                                mpContainer={{ mt: 5 }}
                                                mpInput={{ ph: 10 }}
                                                inputStyle={{ color: colors.Black }}
                                            />
                                            {touched.last_name && errors.last_name && <Label style={{ fontFamily: fonts.regular, color: 'red' }} mpLabel={{ mt: 2, ml: 2 }}>{errors.last_name}</Label>}
                                        </Container>
                                    </Container>

                                    <InputBox
                                        placeholder={'Email'}
                                        containerStyle={{
                                            backgroundColor: '#f2f2f2',
                                            borderColor: touched.email && errors.email ? 'red' : '#f2f2f2',
                                            borderWidth: 1,
                                            borderRadius: 8,
                                        }}
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                        onBlur={() => setFieldTouched('email')}
                                        touched={touched.email}
                                        height={50}
                                        mpContainer={{ mt: 15 }}
                                        mpInput={{ ph: 10 }}
                                        inputStyle={{ color: colors.Black }}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                    {touched.email && errors.email && <Label style={{ fontFamily: fonts.regular, color: 'red' }} mpLabel={{ mt: 2, ml: 2 }}>{errors.email}</Label>}

                                    <Container containerStyle={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Container onPress={selectCountryHandler} containerStyle={{ width: '25%' }} pointerEvents="box-only">
                                            <InputBox
                                                placeholder={'+1'}
                                                containerStyle={{
                                                    backgroundColor: '#f2f2f2',
                                                    borderColor: touched.country_code && errors.country_code ? 'red' : '#f2f2f2',
                                                    borderWidth: 1,
                                                    borderRadius: 8,
                                                }}
                                                value={values.country_code}
                                                onChangeText={handleChange('country_code')}
                                                onBlur={() => setFieldTouched('country_code')}
                                                touched={touched.country_code}
                                                inputStyle={{ color: colors.Black, alignItems: 'center', justifyContent: 'center' }}
                                                height={50}
                                                mpInputContainer={{ ph: 13, mt: 15 }}
                                                textSize={14}
                                                editable={false}
                                                pointerEvents="box-only"
                                                rightIcon={() => (
                                                    <Ionicons
                                                        name='chevron-down'
                                                        size={18}
                                                        color='black'
                                                    />
                                                )}
                                            />
                                            {touched.country_code && errors.country_code && <Label style={{ fontFamily: fonts.regular, color: 'red' }} mpLabel={{ mt: 2, ml: 2 }}>{errors.country_code}</Label>}
                                        </Container>

                                        <Container containerStyle={{ width: '73%' }}>
                                            <InputBox
                                                placeholder={'Phone'}
                                                containerStyle={{
                                                    backgroundColor: '#f2f2f2',
                                                    borderColor: touched.phone && errors.phone ? 'red' : '#f2f2f2',
                                                    borderWidth: 1,
                                                    borderRadius: 8,
                                                }}
                                                keyboardType="phone-pad"
                                                value={values.phone}
                                                onChangeText={handleChange('phone')}
                                                onBlur={() => setFieldTouched('phone')}
                                                touched={touched.phone}
                                                height={50}
                                                mpContainer={{ mt: 15 }}
                                                mpInput={{ ph: 10 }}
                                                inputStyle={{ color: colors.Black }}
                                                textSize={14}
                                            />
                                            {touched.phone && errors.phone && <Label style={{ fontFamily: fonts.regular, color: 'red' }} mpLabel={{ mt: 2, ml: 2 }}>{errors.phone}</Label>}
                                        </Container>
                                    </Container>

                                    <InputBox
                                        placeholder={'Password'}
                                        containerStyle={{
                                            backgroundColor: '#f2f2f2',
                                            borderColor: touched.password && errors.password ? 'red' : '#f2f2f2',
                                            borderWidth: 1,
                                            borderRadius: 8,
                                        }}
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        onBlur={() => setFieldTouched('password')}
                                        touched={touched.password}
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
                                    {touched.password && errors.password && <Label style={{ fontFamily: fonts.regular, color: 'red' }} mpLabel={{ mt: 2, ml: 2 }}>{errors.password}</Label>}

                                    <Btn
                                        title='Sign up'
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

                <FooterComponents>
                    <Container containerStyle={{ alignItems: 'center' }} mpContainer={{ mb: 10 }} onPress={() => navigation.navigate('SignIn')}>
                        <Label labelSize={16} style={{ fontFamily: fonts.regular }}>Already have an account ? <Label labelSize={16} style={{ fontFamily: fonts.regular, color: colors.light_pink }}>Sign in</Label></Label>
                    </Container>
                </FooterComponents>

                <ImagePickerModal
                    modalizeRef={ImagePickerModalRef}
                    onDone={function (val) {
                        if (val == 'camera') {
                            PickFromCamera();
                        }
                        else {
                            PickFromGallery();
                        }
                    }}
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
    bg_img: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profile_img: {
        width: 75,
        height: 75,
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