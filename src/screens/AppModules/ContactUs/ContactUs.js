import { useNavigation } from "@react-navigation/core";
import React, { Fragment, useLayoutEffect, useState } from "react";
import { StyleSheet } from "react-native";
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
import { Formik } from "formik";
import { contactUsApi } from "../../../features/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import { contactUsValidate } from "../../../utils/validation";
import Toast from 'react-native-simple-toast';
import DocumentPicker from 'react-native-document-picker'
import MainContainer from "../../../components/MainContainer";

const ContactUs = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const keyboardVerticalOffset = screenHeight * 0.15;

    const [selectedFile, setSelectedFile] = useState('');

    const { loading: contactUsLoading } = useSelector((state) => state.account.contact_us);

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

    const openDocuments = async (setFieldValue) => {
        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.images, DocumentPicker.types.allFiles]
            });

            let cvDoc = {
                "mime": result[0].type,
                "name": result[0].name,
                "path": result[0].uri,
            };
            setSelectedFile(cvDoc);
            setFieldValue('image', result[0].name);
        } catch (error) {
            if (DocumentPicker.isCancel(error)) {
                console.log('User cancelled the document picker')
            } else {
                console.log('Error Picking the document', error);
            }
        }
    }

    const contactUsHandler = async (values) => {
        let formData = new FormData();
        formData.append('email', values.email);
        formData.append('description', values.description);

        if (selectedFile) {
            formData.append('image', {
                uri: selectedFile.path,
                name: selectedFile.name,
                type: selectedFile.mime
            })
        } else {
            formData.append('image', '')
        }

        const response = await dispatch(contactUsApi({ data: formData })).unwrap();

        if (response?.status == 'Success') {
            Toast.show(response?.message, Toast.SHORT);
            navigation.goBack();
        } else {
            Toast.show(response?.message, Toast.SHORT);
        }
    }

    return (
        <MainContainer absoluteLoading={contactUsLoading}>
            <Container containerStyle={{ flex: 1, backgroundColor: 'white' }}>
                <KeyboardAwareScrollView disableScrollViewPanResponder={true} contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false} behavior={Platform.OS == 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={keyboardVerticalOffset}>
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
                        <Formik
                            initialValues={contactUsValidate.initialState}
                            validationSchema={contactUsValidate.schema}
                            onSubmit={(values) => contactUsHandler(values)}
                        >
                            {({ values, setFieldTouched, handleChange, handleSubmit, errors, touched, setFieldValue }) => (
                                <Fragment>
                                    <Label labelSize={16} style={{ fontFamily: fonts.regular, top: 10 }}>Email address*</Label>
                                    <InputBox
                                        placeholder={'loremipsum@gmail.com'}
                                        containerStyle={{
                                            backgroundColor: '#f2f2f2',
                                            borderColor: '#f2f2f2',
                                            borderWidth: 1,
                                            borderRadius: 8,
                                        }}
                                        value={values.email}
                                        onChangeText={handleChange("email")}
                                        onBlur={() => setFieldTouched('email')}
                                        touched={touched.email}
                                        height={50}
                                        mpContainer={{ mt: 25 }}
                                        mpInput={{ ph: 10 }}
                                        inputStyle={{ color: colors.Black }}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                    {touched.email && errors.email && <Label style={{ fontFamily: fonts.regular, color: 'red' }} mpLabel={{ mt: 2, ml: 2 }}>{errors.email}</Label>}

                                    <Label labelSize={16} style={{ fontFamily: fonts.regular, top: 15 }}>Detail description of issue*</Label>
                                    <InputBox
                                        placeholder={'loremipsum'}
                                        containerStyle={{
                                            backgroundColor: '#f2f2f2',
                                            borderColor: '#f2f2f2',
                                            borderWidth: 1,
                                            borderRadius: 8,
                                        }}
                                        value={values.description}
                                        onChangeText={handleChange("description")}
                                        onBlur={() => setFieldTouched('description')}
                                        touched={touched.description}
                                        height={50}
                                        mpContainer={{ mt: 25 }}
                                        mpInput={{ ph: 10 }}
                                        inputStyle={{ color: colors.Black }}
                                    />
                                    {touched.description && errors.description && <Label style={{ fontFamily: fonts.regular, color: 'red' }} mpLabel={{ mt: 2, ml: 2 }}>{errors.description}</Label>}

                                    <Label labelSize={16} style={{ fontFamily: fonts.regular, top: 20 }}>Attach screnshot</Label>

                                    <Container containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <InputBox
                                            placeholder={selectedFile == '' ? 'File name' : selectedFile.name}
                                            value={values.image}
                                            onChangeText={handleChange("image")}
                                            containerStyle={styles.fileUpload_inputStyle}
                                            editable={false}
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
                                            onPress={() => openDocuments(setFieldValue)}
                                        />
                                    </Container>
                                    {touched.image && errors.image && <Label style={{ fontFamily: fonts.regular, color: 'red' }} mpLabel={{ mt: 2, ml: 2 }}>{errors.image}</Label>}

                                    <Btn
                                        title='Send'
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