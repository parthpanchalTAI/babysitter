import React, { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import Container from "../../../components/Container";
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
import { useDispatch, useSelector } from "react-redux";
import ImagePicker from 'react-native-image-crop-picker'
import ImagePickerModal from "../../../modals/ImagePickerModal/ImagePickerModal";
import { imageBaseUrl } from "../../../utils/apiEndPoints";
import { Formik } from "formik";
import { editProfileValidate } from "../../../utils/validation";
import GenderModal from "../../../modals/GenderModal/GenderModal";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { editProfileApi } from "../../../features/accountSlice";
import { saveUser } from "../../../features/whiteLists";
import MainContainer from "../../../components/MainContainer";
import Toast from 'react-native-simple-toast';

const EditProfile = () => {

    const dispatch = useDispatch();
    const ImagePickerModalRef = useRef();
    const genderRef = useRef();
    const navigation = useNavigation();
    const keyboardVerticalOffset = screenHeight * 0.15;

    const [profileImage, setProfileImage] = useState('');
    const [DOB, setDOB] = useState(false);
    const [selectDOB, setSelectDOB] = useState('');
    const [selectedGender, setSelectedGender] = useState('');

    const { user } = useSelector((state) => state?.whiteLists);
    const { loading: loading } = useSelector((state) => state?.account.editProfile);

    useEffect(() => {
        if (user?.profile_image) {
            setProfileImage(`${imageBaseUrl}${user?.profile_image}`);
        }
    }, [user?.profile_image]);

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
                    <Label labelSize={18} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }} mpLabel={{ mt: 45 }}>Edit profile</Label>
                </Container>
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

    const openImagePickerModal = () => {
        ImagePickerModalRef.current.present();
    }

    const openGenderModal = () => {
        if (genderRef.current && genderRef.current.present && typeof genderRef.current.present === 'function') {
            genderRef.current.present();
        } else {
            console.error('The present function is not available on genderRef.current');
        }
    }

    const PickFromGallery = () => {
        ImagePicker.openPicker({
            cropping: true,
            mediaType: "photo",
            freeStyleCropEnabled: true
        }).then(image => {
            ImagePickerModalRef.current?.close();
            console.log("img", image);
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

    const editProfileHandler = async (values) => {
        let formData = new FormData();

        formData.append('first_name', values.first_name);
        formData.append('last_name', values.last_name);
        formData.append('gender', selectedGender);
        formData.append('dob', selectDOB);
        formData.append('education', values.education);
        formData.append('experience', values.experience);
        formData.append('about', values.about);

        if (profileImage) {
            let prev_img = `${imageBaseUrl}${user?.profile_image}`;
            if (prev_img != profileImage) {
                let file_name = profileImage?.substring(profileImage?.lastIndexOf('/') + 1);
                formData.append('profile_image', {
                    uri: profileImage,
                    name: file_name,
                    type: 'image/jpeg'
                })
            }
        } else {
            formData.append('profile_image', '');
        }

        const response = await dispatch(editProfileApi({ data: formData })).unwrap();
        console.log('res of edit profile', response);

        if (response?.status == 'Success') {
            Toast.show(response?.message, Toast.SHORT);
            dispatch(saveUser(response?.data));
            navigation.goBack();
        } else {
            Toast.show(response?.message, Toast.SHORT);
        }
    }

    return (
        <MainContainer absoluteLoading={loading}>
            <Container containerStyle={{ flex: 1, backgroundColor: 'white' }}>
                <KeyboardAwareScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false} behavior={Platform.OS == 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={keyboardVerticalOffset}>
                    <Container mpContainer={{ mt: 20, mh: 20 }}>
                        <Container containerStyle={{ alignSelf: 'center', borderWidth: 1, borderRadius: 100, borderColor: '#f2f2f2' }}>
                            {
                                profileImage ?
                                    <Img
                                        imgSrc={{ uri: `${profileImage}` }}
                                        imgStyle={{
                                            width: hs(90),
                                            height: vs(90),
                                            borderRadius: 100,
                                            resizeMode: 'contain',
                                        }}
                                        onPress={openImagePickerModal}
                                    />
                                    :
                                    <Img
                                        imgSrc={{ uri: `${imageBaseUrl}${user?.profile_image}` }}
                                        imgStyle={{
                                            width: hs(90),
                                            height: vs(90),
                                            resizeMode: 'contain',
                                            borderRadius: 100,
                                        }}
                                        onPress={openImagePickerModal}
                                    />
                            }
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

                        <Formik
                            initialValues={{
                                ...editProfileValidate.initialState,
                                first_name: user?.first_name,
                                last_name: user?.last_name,
                                email: user?.email,
                                gender: user?.gender,
                                dob: user?.dob,
                                education: user?.education,
                                experience: user?.experience,
                                about: user?.about
                            }}
                            onSubmit={(values) => editProfileHandler(values)}
                            validationSchema={editProfileHandler.schema}
                            enableReinitialize={true}
                        >
                            {({ values, handleChange, errors, setFieldTouched, touched, handleBlur, handleSubmit }) => (
                                <Fragment>
                                    <InputBox
                                        placeholder={'First name'}
                                        containerStyle={styles.inputStyle}
                                        value={values.first_name}
                                        onChangeText={handleChange("first_name")}
                                        onBlur={() => setFieldTouched('first_name')}
                                        touched={touched.first_name}
                                        errors={errors.first_name}
                                        height={50}
                                        mpContainer={{ mt: 25 }}
                                        mpInput={{ ph: 10 }}
                                        inputStyle={{ color: colors.Black }}
                                    />

                                    <InputBox
                                        placeholder={'Last name'}
                                        containerStyle={styles.inputStyle}
                                        value={values.last_name}
                                        onChangeText={handleChange("last_name")}
                                        onBlur={() => setFieldTouched('last_name')}
                                        touched={touched.last_name}
                                        errors={errors.last_name}
                                        height={50}
                                        mpContainer={{ mt: 15 }}
                                        mpInput={{ ph: 10 }}
                                        inputStyle={{ color: colors.Black }}
                                    />

                                    <InputBox
                                        placeholder={'Email'}
                                        containerStyle={styles.inputStyle}
                                        value={values.email}
                                        onChangeText={handleChange("email")}
                                        onBlur={() => setFieldTouched('email')}
                                        touched={touched.email}
                                        errors={errors.email}
                                        editable={false}
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

                                    <Container onPress={openGenderModal} mpContainer={{ mt: 15 }} containerStyle={{ width: '100%' }} pointerEvents="box-only">
                                        <InputBox
                                            placeholder={selectedGender == 'Male' ? 'Male' : selectedGender == 'Female' ? 'Female' : 'Gender'}
                                            placeholderTextColor={selectedGender == false ? colors.Input_Gray_text : colors.Black} containerStyle={styles.inputStyle}
                                            inputStyle={{ color: colors.Black, alignItems: 'center', justifyContent: 'center' }}
                                            value={values.gender}
                                            onChangeText={handleChange("gender")}
                                            onBlur={() => setFieldTouched('gender')}
                                            touched={touched.gender}
                                            errors={errors.gender}
                                            inputHeight={50}
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
                                            placeholder={selectDOB == '' ? 'Dob' : selectDOB}
                                            placeholderTextColor={selectDOB == '' ? colors.Input_Gray_text : colors.Black}
                                            containerStyle={styles.inputStyle}
                                            inputStyle={{ color: colors.Black, alignItems: 'center', justifyContent: 'center' }}
                                            value={values.dob}
                                            onChangeText={handleChange("dob")}
                                            onBlur={() => setFieldTouched('dob')}
                                            touched={touched.dob}
                                            errors={errors.dob}
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

                                    <DateTimePickerModal
                                        isVisible={DOB}
                                        mode="date"
                                        onConfirm={handleDOBConfirm}
                                        onCancel={() => setDOB(false)}
                                    />

                                    <Container containerStyle={{ width: '100%' }} pointerEvents="box-only" mpContainer={{ mt: 15 }}>
                                        <InputBox
                                            placeholder={'Education'}
                                            containerStyle={styles.inputStyle}
                                            inputStyle={{ color: colors.Black, alignItems: 'center', justifyContent: 'center' }}
                                            value={values.education}
                                            onChangeText={handleChange("education")}
                                            onBlur={() => setFieldTouched('education')}
                                            touched={touched.education}
                                            errors={errors.education}
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
                                            containerStyle={styles.inputStyle}
                                            inputStyle={{ color: colors.Black, alignItems: 'center', justifyContent: 'center' }}
                                            value={values.experience}
                                            onChangeText={handleChange("experience")}
                                            onBlur={() => setFieldTouched('experience')}
                                            touched={touched.experience}
                                            errors={errors.experience}
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
                                        containerStyle={styles.inputStyle}
                                        value={values.about}
                                        onChangeText={handleChange("about")}
                                        onBlur={() => setFieldTouched('about')}
                                        touched={touched.about}
                                        errors={errors.about}
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
                                        title='Update Profile'
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

                <GenderModal
                    modalizeRef={genderRef}
                    selectedGender={selectedGender}
                    setSelectedGender={setSelectedGender}
                />

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