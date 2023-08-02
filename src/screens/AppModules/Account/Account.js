import { useNavigation } from "@react-navigation/core";
import React, { useLayoutEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, Switch } from "react-native";
import Container from "../../../components/Container";
import Label from "../../../components/Label";
import { fonts } from "../../../assets/Fonts/fonts";
import { getStatusBarHeight } from "../../../utils/globals";
import Img from "../../../components/Img";
import { images } from "../../../assets/Images";
import { hs, vs } from "../../../utils/styleUtils";
import { colors } from "../../../assets/Colors/colors";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { deleteAccountApi, logoutApi } from "../../../features/accountSlice";
import { deleteAccount, getValues, logOutUser } from "../../../features/whiteLists";
import { AuthStack } from "../../../navigators/NavActions";
import { useDispatch, useSelector } from "react-redux";
import { imageBaseUrl } from "../../../utils/apiEndPoints";
import MainContainer from "../../../components/MainContainer";
import Toast from 'react-native-simple-toast';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Account = ({
    route
}) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const statusBarHeight = getStatusBarHeight();

    const [ispushNotifications, setIsPushNotification] = useState(false);

    const { user } = useSelector((state) => state?.whiteLists);
    const { loading: logoutLoading } = useSelector((state) => state.account.logout);
    const { loading: deleteAccountLoading } = useSelector((state) => state.account.delete_account);

    const togglePushNotification = () => setIsPushNotification(previousState => !previousState);

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => {
                return renderHeader();
            }
        });
    }, [user?.hourly_rate]);

    const renderHeader = () => {
        return (
            <Container containerStyle={{ backgroundColor: 'white', paddingTop: statusBarHeight }} mpContainer={{ ph: 15 }}>
                <Container containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Label mpLabel={{ mt: 5 }} labelSize={30} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }}>Account</Label>

                    <Container mpContainer={{ ph: 10 }} onPress={() => navigation.navigate('HourlyRate')} height={30} containerStyle={{ borderWidth: 1, borderRadius: 5, justifyContent: 'center', alignItems: 'center', borderColor: colors.light_yellow, backgroundColor: colors.light_yellow }}>
                        <Label mpLabel={{ mt: 0 }} labelSize={18} style={{ fontFamily: fonts.regular }}>${`${user?.hourly_rate}`}/hr</Label>
                    </Container>
                </Container>
            </Container>
        )
    }

    const deleteAccountAlert = async () => {
        Alert.alert(
            "BabySitter",
            "Are you sure want to delete this account ?",
            [
                {
                    text: 'No',
                    style: 'cancel'
                },
                {
                    text: 'Yes',
                    onPress: () => { deleteAccountHandler() }
                }
            ]
        )
    }

    const deleteAccountHandler = async () => {
        const response = await dispatch(deleteAccountApi({})).unwrap();

        if (response?.status == 'Success') {
            Toast.show(response?.message, Toast.SHORT);
            await AsyncStorage.removeItem("addHourlyRate");
            dispatch(deleteAccount());
            dispatch(getValues(false));
            navigation.dispatch(AuthStack);
        } else {
            Toast.show(response?.message, Toast.SHORT);
        }
    }

    const logout = async () => {
        Alert.alert(
            "BabySitter",
            "Are you sure want to logout ?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text: "Yes", onPress: () => { logoutHandler() }
                }
            ]
        );
    }

    const logoutHandler = async () => {
        const response = await dispatch(logoutApi({})).unwrap();

        if (response?.status == 'Success') {
            Toast.show(response?.message, Toast.SHORT);
            dispatch(logOutUser());
            dispatch(getValues(false));
            navigation.dispatch(AuthStack);
        } else {
            Toast.show(response?.message, Toast.SHORT);
        }
    }

    return (
        <MainContainer absoluteModalLoading={logoutLoading || deleteAccountLoading}>
            <Container containerStyle={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: vs(20) }}>
                    <Container mpContainer={{ mh: 20, mt: 15 }}>
                        <Container containerStyle={{ flexDirection: 'row', alignItems: 'center', }}>
                            {user?.profile_image ?
                                <Img
                                    imgSrc={{ uri: `${imageBaseUrl}${user?.profile_image}` }}
                                    imgStyle={{
                                        width: hs(90),
                                        height: vs(90),
                                        borderRadius: 100,
                                        resizeMode: 'contain'
                                    }}
                                />
                                :
                                <Container containerStyle={{ borderWidth: 1, borderRadius: 100, borderColor: '#f2f2f2' }} height={vs(90)} width={hs(90)} />
                            }
                            <Container mpContainer={{ mh: 20 }}>
                                <Label labelSize={20} mpLabel={{ mt: 5 }} style={{ fontFamily: fonts.regular, fontWeight: 'bold' }}>{user?.first_name} {user?.last_name}</Label>
                                <Label labelSize={16} mpLabel={{ mt: 5 }} style={{ fontFamily: fonts.regular }}>{user?.email}</Label>
                                <Label labelSize={16} mpLabel={{ mt: 5 }} style={{ fontFamily: fonts.regular }}>{user?.address}</Label>
                                <Label onPress={() => navigation.navigate('EditProfile')} labelSize={16} mpLabel={{ mt: 5 }} style={{ fontFamily: fonts.regular, color: colors.light_pink }}>Edit Profile</Label>
                            </Container>
                        </Container>

                        <Container onPress={togglePushNotification} containerStyle={{ borderWidth: 1, borderRadius: 10, borderColor: '#f2f2f2', justifyContent: 'center', }} mpContainer={{ mt: 20 }} height={55}>
                            <Container mpContainer={{ mh: 10 }} containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Ionicons
                                        name='notifications'
                                        size={25}
                                        color={colors.light_pink}
                                    />
                                    <Label labelSize={16} mpLabel={{ ml: 15 }} style={{ fontFamily: fonts.regular }}>Push notifications</Label>
                                </Container>

                                <Switch
                                    trackColor={{ false: '#D9D9D9', true: '#34A853' }}
                                    thumbColor={ispushNotifications ? '#fff' : '#FFFFFF'}
                                    ios_backgroundColor="#3e3e3e"
                                    value={ispushNotifications == 1 ? true : false}
                                    onValueChange={togglePushNotification}
                                />
                            </Container>
                        </Container>

                        <Container onPress={() => navigation.navigate('Availability')} containerStyle={{ borderWidth: 1, borderRadius: 10, borderColor: '#f2f2f2', justifyContent: 'center', }} mpContainer={{ mt: 15 }} height={55}>
                            <Container mpContainer={{ mh: 10 }} containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Img
                                        imgSrc={images.availability}
                                        imgStyle={{
                                            width: 25,
                                            height: 25,
                                            resizeMode: 'contain'
                                        }}
                                    />
                                    <Label labelSize={16} mpLabel={{ ml: 15 }} style={{ fontFamily: fonts.regular }}>Availability</Label>
                                </Container>

                                <Img
                                    imgSrc={images.right_img}
                                    imgStyle={{
                                        width: 15,
                                        height: 15,
                                        resizeMode: 'contain'
                                    }}
                                />
                            </Container>
                        </Container>

                        <Container onPress={() => navigation.navigate('MyWallet')} containerStyle={{ borderWidth: 1, borderRadius: 10, borderColor: '#f2f2f2', justifyContent: 'center', }} mpContainer={{ mt: 15 }} height={55}>
                            <Container mpContainer={{ mh: 10 }} containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Img
                                        imgSrc={images.wallet_img}
                                        imgStyle={{
                                            width: 25,
                                            height: 25,
                                            resizeMode: 'contain'
                                        }}
                                    />
                                    <Label labelSize={16} mpLabel={{ ml: 15 }} style={{ fontFamily: fonts.regular }}>My wallet</Label>
                                </Container>

                                <Img
                                    imgSrc={images.right_img}
                                    imgStyle={{
                                        width: 15,
                                        height: 15,
                                        resizeMode: 'contain'
                                    }}
                                />
                            </Container>
                        </Container>

                        <Container onPress={() => navigation.navigate('TermsAndConditions')} containerStyle={{ borderWidth: 1, borderRadius: 10, borderColor: '#f2f2f2', justifyContent: 'center', }} mpContainer={{ mt: 15 }} height={55}>
                            <Container mpContainer={{ mh: 10 }} containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Img
                                        imgSrc={images.terms_img}
                                        imgStyle={{
                                            width: 25,
                                            height: 25,
                                            resizeMode: 'contain'
                                        }}
                                    />
                                    <Label labelSize={16} mpLabel={{ ml: 15 }} style={{ fontFamily: fonts.regular }}>Terms & Conditions</Label>
                                </Container>

                                <Img
                                    imgSrc={images.right_img}
                                    imgStyle={{
                                        width: 15,
                                        height: 15,
                                        resizeMode: 'contain'
                                    }}
                                />
                            </Container>
                        </Container>

                        <Container onPress={() => navigation.navigate('ContactUs')} containerStyle={{ borderWidth: 1, borderRadius: 10, borderColor: '#f2f2f2', justifyContent: 'center', }} mpContainer={{ mt: 15 }} height={55}>
                            <Container mpContainer={{ mh: 10 }} containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Img
                                        imgSrc={images.contact_img}
                                        imgStyle={{
                                            width: 25,
                                            height: 25,
                                            resizeMode: 'contain'
                                        }}
                                    />
                                    <Label labelSize={16} mpLabel={{ ml: 15 }} style={{ fontFamily: fonts.regular }}>Contact us</Label>
                                </Container>

                                <Img
                                    imgSrc={images.right_img}
                                    imgStyle={{
                                        width: 15,
                                        height: 15,
                                        resizeMode: 'contain'
                                    }}
                                />
                            </Container>
                        </Container>

                        <Container onPress={() => navigation.navigate('ChangePassword')} containerStyle={{ borderWidth: 1, borderRadius: 10, borderColor: '#f2f2f2', justifyContent: 'center', }} mpContainer={{ mt: 15 }} height={55}>
                            <Container mpContainer={{ mh: 10 }} containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Img
                                        imgSrc={images.change_psw_img}
                                        imgStyle={{
                                            width: 25,
                                            height: 25,
                                            resizeMode: 'contain'
                                        }}
                                    />
                                    <Label labelSize={16} mpLabel={{ ml: 15 }} style={{ fontFamily: fonts.regular }}>Change Password</Label>
                                </Container>

                                <Img
                                    imgSrc={images.right_img}
                                    imgStyle={{
                                        width: 15,
                                        height: 15,
                                        resizeMode: 'contain'
                                    }}
                                />
                            </Container>
                        </Container>

                        <Container onPress={deleteAccountAlert} containerStyle={{ borderWidth: 1, borderRadius: 10, borderColor: '#f2f2f2', justifyContent: 'center', }} mpContainer={{ mt: 15 }} height={55}>
                            <Container mpContainer={{ mh: 10 }} containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <AntDesign
                                        name='deleteuser'
                                        size={25}
                                        color={colors.light_pink}
                                    />
                                    <Label labelSize={16} mpLabel={{ ml: 15 }} style={{ fontFamily: fonts.regular }}>Delete account</Label>
                                </Container>

                                <Img
                                    imgSrc={images.right_img}
                                    imgStyle={{
                                        width: 15,
                                        height: 15,
                                        resizeMode: 'contain'
                                    }}
                                />
                            </Container>
                        </Container>

                        <Container onPress={logout} containerStyle={{ borderWidth: 1, borderRadius: 10, borderColor: '#f2f2f2', justifyContent: 'center', }} mpContainer={{ mt: 15 }} height={55}>
                            <Container mpContainer={{ mh: 10 }} containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Img
                                        imgSrc={images.logout_img}
                                        imgStyle={{
                                            width: 25,
                                            height: 25,
                                            resizeMode: 'contain'
                                        }}
                                    />
                                    <Label labelSize={16} mpLabel={{ ml: 15 }} style={{ fontFamily: fonts.regular }}>Logout</Label>
                                </Container>

                                <Img
                                    imgSrc={images.right_img}
                                    imgStyle={{
                                        width: 15,
                                        height: 15,
                                        resizeMode: 'contain'
                                    }}
                                />
                            </Container>
                        </Container>
                    </Container>
                </ScrollView>
            </Container>
        </MainContainer>
    )
}

const styles = StyleSheet.create({
    container: {}
})

export default Account;