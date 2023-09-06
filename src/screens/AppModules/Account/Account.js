import { useNavigation } from "@react-navigation/core";
import React, { useLayoutEffect, useState } from "react";
import { ScrollView } from "react-native";
import Container from "../../../components/Container";
import Label from "../../../components/Label";
import { fonts } from "../../../assets/Fonts/fonts";
import { getStatusBarHeight } from "../../../utils/globals";
import Img from "../../../components/Img";
import { images } from "../../../assets/Images";
import { hs, vs } from "../../../utils/styleUtils";
import { colors } from "../../../assets/Colors/colors";
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from "react-redux";
import { imageBaseUrl } from "../../../utils/apiEndPoints";
import MainContainer from "../../../components/MainContainer";
import LogoutModal from "../../../components/LogoutModal";
import DeleteAccountModal from "../../../components/DeleteAccountModal";

const Account = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const statusBarHeight = getStatusBarHeight();

    // const [ispushNotifications, setIsPushNotification] = useState(false);

    const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

    const { user } = useSelector((state) => state?.whiteLists);
    const { loading: logoutLoading } = useSelector((state) => state.account.logout);
    const { loading: deleteAccountLoading } = useSelector((state) => state.account.delete_account);

    // const togglePushNotification = () => setIsPushNotification(previousState => !previousState);

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => {
                return renderHeader();
            }
        });
    }, [dispatch, user?.hourly_rate]);

    const renderHeader = () => {
        return (
            <Container containerStyle={{ backgroundColor: 'white', paddingTop: statusBarHeight }} mpContainer={{ ph: 15 }}>
                <Container containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Label mpLabel={{ mt: 5 }} labelSize={30} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }}>Account</Label>

                    <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Img
                            imgSrc={images.feature_bg}
                            mpImage={{ mr: 15 }}
                            imgStyle={{
                                width: hs(92),
                                height: vs(32),
                                resizeMode: 'stretch',
                            }}
                            onPress={() => navigation.navigate('Featured')}
                        />

                        <Container mpContainer={{ ph: 10 }} onPress={() => navigation.navigate('HourlyRate')} height={33} containerStyle={{ borderWidth: 1, borderRadius: 5, justifyContent: 'center', alignItems: 'center', borderColor: colors.light_yellow, backgroundColor: colors.light_yellow }}>
                            <Label mpLabel={{ mt: 0 }} labelSize={18} style={{ fontFamily: fonts.regular }}>${`${user?.hourly_rate == null ? 0 : user?.hourly_rate}`}/hr</Label>
                        </Container>
                    </Container>
                </Container>
            </Container>
        )
    }

    const toggleLogoutModal = () => {
        setLogoutModalVisible(!isLogoutModalVisible);
    };

    const toggleDeleteModal = () => {
        setDeleteModalVisible(!isDeleteModalVisible);
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
                                <Label labelSize={20} mpLabel={{ mb: 5 }} style={{ fontFamily: fonts.regular, fontWeight: 'bold' }}>{user?.first_name} {user?.last_name}</Label>
                                <Label labelSize={16} mpLabel={{ mb: 5 }} style={{ fontFamily: fonts.regular }}>{user?.email}</Label>
                                {/* <Label labelSize={16} mpLabel={{ mt: 5 }} style={{ fontFamily: fonts.regular }}>{cityAddress}</Label> */}
                                <Label onPress={() => navigation.navigate('EditProfile')} labelSize={16} mpLabel={{ mt: 5 }} style={{ fontFamily: fonts.regular, color: colors.light_pink }}>Edit Profile</Label>
                            </Container>
                        </Container>

                        {/* <Container onPress={togglePushNotification} containerStyle={{ borderWidth: 1, borderRadius: 10, borderColor: '#f2f2f2', justifyContent: 'center', }} mpContainer={{ mt: 20 }} height={55}>
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
                        </Container> */}

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

                        {/* After some time */}
                        {/* <Container onPress={() => navigation.navigate('MyWallet')} containerStyle={{ borderWidth: 1, borderRadius: 10, borderColor: '#f2f2f2', justifyContent: 'center', }} mpContainer={{ mt: 15 }} height={55}>
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
                        </Container> */}

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
                                    <Label labelSize={16} mpLabel={{ ml: 15 }} style={{ fontFamily: fonts.regular }}>Terms & conditions</Label>
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
                                    <Label labelSize={16} mpLabel={{ ml: 15 }} style={{ fontFamily: fonts.regular }}>Change password</Label>
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

                        <Container onPress={() => toggleDeleteModal()} containerStyle={{ borderWidth: 1, borderRadius: 10, borderColor: '#f2f2f2', justifyContent: 'center', }} mpContainer={{ mt: 15 }} height={55}>
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

                        <Container onPress={() => toggleLogoutModal()} containerStyle={{ borderWidth: 1, borderRadius: 10, borderColor: '#f2f2f2', justifyContent: 'center', }} mpContainer={{ mt: 15 }} height={55}>
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

                {
                    deleteAccountLoading ? null :
                        <DeleteAccountModal
                            isVisible={isDeleteModalVisible}
                            closeModal={toggleDeleteModal}
                        />
                }

                {
                    logoutLoading ? null :
                        <LogoutModal
                            isVisible={isLogoutModalVisible}
                            closeModal={toggleLogoutModal}
                        />
                }
            </Container>
        </MainContainer>
    )
}

export default Account;