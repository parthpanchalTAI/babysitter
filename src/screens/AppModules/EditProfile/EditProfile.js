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
import ExperienceModal from "../../../modals/ExperienceModal/ExperienceModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firebaseService from "../../../utils/firebaseService";

const EditProfile = () => {

    const dispatch = useDispatch();

    const ImagePickerModalRef = useRef();
    const genderRef = useRef();
    const experienceRef = useRef(null);

    const navigation = useNavigation();
    const keyboardVerticalOffset = screenHeight * 0.15;

    const [profileImage, setProfileImage] = useState('');
    const [DOB, setDOB] = useState(false);
    const [selectDOB, setSelectDOB] = useState('');
    const [selectExp, setSelectExp] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { user, fbUid } = useSelector((state) => state?.whiteLists);
    // const { loading: loading } = useSelector((state) => state?.account.editProfile);

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

    useEffect(() => {
        // load selected values
        loadSelectedGender();
        loadSelectedExperience();

        // load edit selected values
        loadSelectedEditGender();
        loadSelectedEditExp();
    }, []);

    // load selected values

    const loadSelectedGender = async () => {
        const genderValue = await AsyncStorage.getItem("selectedGenderVal");
        if (genderValue !== null) {
            setSelectedGender(genderValue);
        }
    };

    const loadSelectedExperience = async () => {
        const expValue = await AsyncStorage.getItem("selectedExpVal");
        if (expValue !== null) {
            setSelectExp(expValue);
        }
    };

    // load edit selected values

    const loadSelectedEditGender = async () => {
        const genderValue = await AsyncStorage.getItem("editSelectedGenderVal");
        if (genderValue !== null) {
            setSelectedGender(genderValue);
        }
    };

    const loadSelectedEditExp = async () => {
        const expValue = await AsyncStorage.getItem("editSelectedExpVal");
        if (expValue !== null) {
            setSelectExp(expValue);
        }
    };

    // edit selected gender

    const editSelectedGender = async (value) => {
        try {
            await AsyncStorage.setItem("editSelectedGenderVal", value);
        } catch (error) {
            console.error("Error saving selected value: ", error);
        }
    };

    const editSelectedExp = async (value) => {
        try {
            await AsyncStorage.setItem("editSelectedExpVal", value);
        } catch (error) {
            console.error("Error saving selected value: ", error);
        }
    };

    const openExperienceModal = () => {
        if (experienceRef.current && experienceRef.current.present && typeof experienceRef.current.present === 'function') {
            experienceRef.current.present();
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
        setIsLoading(true);

        let formData = new FormData();

        formData.append('first_name', values.first_name);
        formData.append('last_name', values.last_name);
        formData.append('gender', selectedGender);
        formData.append('dob', selectDOB);
        formData.append('education', values.education);
        formData.append('experience', selectExp);
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

        if (response?.status == 'Success') {
            await firebaseService.updateProfile({
                uid: fbUid,
                profile_image: response?.data?.profile_image,
                name: values.first_name + ' ' + values.last_name
            })

            // edit selected values
            editSelectedGender(selectedGender);
            editSelectedExp(selectExp);

            Toast.show(response?.message, Toast.SHORT);
            dispatch(saveUser(response?.data));
            navigation.goBack();
        } else {
            setIsLoading(false);
            Toast.show(response?.message, Toast.SHORT);
        }
    }

    return (
        <MainContainer absoluteLoading={isLoading}>
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
                                            resizeMode: 'stretch',
                                        }}
                                        onPress={openImagePickerModal}
                                    />
                                    :
                                    <Img
                                        imgSrc={{ uri: `${imageBaseUrl}${user?.profile_image}` }}
                                        imgStyle={{
                                            width: hs(90),
                                            height: vs(90),
                                            resizeMode: 'stretch',
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
                                address: user?.address,
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
                            {({ values, handleChange, errors, setFieldTouched, touched, handleSubmit }) => (
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
                                    {touched.first_name && errors.first_name && <Label style={{ fontFamily: fonts.regular, color: 'red' }} mpLabel={{ mt: 2, ml: 2 }}>{errors.first_name}</Label>}

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

                                    <Container pointerEvents="box-only" onPress={() => navigation.navigate('EditLocation', { fromEdit: true })}>
                                        <InputBox
                                            placeholder={'Address'}
                                            containerStyle={styles.inputStyle}
                                            textAlignVertical="top"
                                            value={user?.address}
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
                                            placeholder={user?.gender ? user?.gender : selectedGender}
                                            placeholderTextColor={colors.Black}
                                            containerStyle={styles.inputStyle}
                                            inputStyle={{ color: colors.Black, alignItems: 'center', justifyContent: 'center' }}
                                            value={selectedGender}
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
                                        {touched.gender && errors.gender && <Label style={{ fontFamily: fonts.regular, color: 'red' }} mpLabel={{ mt: 2, ml: 2 }}>{errors.gender}</Label>}
                                    </Container>

                                    <Container onPress={showDOBPicker} containerStyle={{ width: '100%' }} pointerEvents="box-only" mpContainer={{ mt: 15 }}>
                                        <InputBox
                                            placeholder={user?.dob ? user?.dob : selectDOB}
                                            placeholderTextColor={colors.Black}
                                            containerStyle={styles.inputStyle}
                                            inputStyle={{ color: colors.Black, alignItems: 'center', justifyContent: 'center' }}
                                            value={selectDOB}
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
                                        date={new Date(user?.dob)}
                                        maximumDate={new Date('2004-12-31')}
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
                                        />
                                    </Container>

                                    <Container onPress={openExperienceModal} containerStyle={{ width: '100%' }} pointerEvents="box-only" mpContainer={{ mt: 15 }}>
                                        <InputBox
                                            placeholder={user?.experience ? user?.experience : selectExp}
                                            containerStyle={styles.inputStyle}
                                            inputStyle={{ color: colors.Black, alignItems: 'center', justifyContent: 'center' }}
                                            value={selectExp}
                                            onChangeText={handleChange("experience")}
                                            onBlur={() => setFieldTouched('experience')}
                                            touched={touched.experience}
                                            errors={errors.experience}
                                            pointerEvents="box-only"
                                            inputHeight={50}
                                            mpInputContainer={{ ph: 10 }}
                                            textSize={14}
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

                <ExperienceModal
                    modalizeRef={experienceRef}
                    selectExp={selectExp}
                    setSelectExp={setSelectExp}
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
    },
    customHeaderContainer: {
        backgroundColor: '#007bff', // Change the background color as per your requirement
        padding: 16,
        alignItems: 'center',
    },
    customHeaderText: {
        color: 'white', // Change the text color as per your requirement
        fontSize: 18,
        fontWeight: 'bold',
    },

})

export default EditProfile;