import { useNavigation } from "@react-navigation/core";
import React, { useLayoutEffect, useState } from "react";
import { ScrollView, StyleSheet, Switch, View } from "react-native";
import Container from "../../../components/Container";
import Label from "../../../components/Label";
import { fonts } from "../../../assets/Fonts/fonts";
import { getStatusBarHeight } from "../../../utils/globals";
import Img from "../../../components/Img";
import { images } from "../../../assets/Images";
import { hs, screenWidth, vs } from "../../../utils/styleUtils";
import { colors } from "../../../assets/Colors/colors";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Account = () => {

    const navigation = useNavigation();
    const statusBarHeight = getStatusBarHeight();

    const [ispushNotifications, setIsPushNotification] = useState(false);

    const togglePushNotification = () => setIsPushNotification(previousState => !previousState);

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => {
                return renderHeader();
            }
        });
    }, []);

    const renderHeader = () => {
        return (
            <Container containerStyle={{ backgroundColor: 'white', paddingTop: statusBarHeight }} mpContainer={{ ph: 15 }}>
                <Container containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Label mpLabel={{ mt: 5 }} labelSize={30} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }}>Account</Label>

                    <Container height={30} containerStyle={{ borderWidth: 1, borderRadius: 5, width: screenWidth * 0.20, justifyContent: 'center', alignItems: 'center', borderColor: colors.light_yellow, backgroundColor: colors.light_yellow }}>
                        <Label mpLabel={{ mt: 0 }} labelSize={18} style={{ fontFamily: fonts.regular }}>$15/hr</Label>
                    </Container>
                </Container>
            </Container>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: vs(20) }}>
                <Container mpContainer={{ mh: 20, mt: 15 }}>
                    <Container containerStyle={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Img
                            imgSrc={images.profile_img}
                            imgStyle={{
                                width: hs(80),
                                height: vs(80),
                                borderRadius: 100,
                                resizeMode: 'contain'
                            }}
                        />
                        <Container mpContainer={{ mh: 20 }}>
                            <Label labelSize={20} mpLabel={{ mt: 5 }} style={{ fontFamily: fonts.regular, fontWeight: 'bold' }}>Nicole Foster</Label>
                            <Label labelSize={16} mpLabel={{ mt: 5 }} style={{ fontFamily: fonts.regular }}>nicolefoster@gmail.com</Label>
                            <Label labelSize={16} mpLabel={{ mt: 5 }} style={{ fontFamily: fonts.regular }}>223, sanfrancisco, california</Label>
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

                    <Container containerStyle={{ borderWidth: 1, borderRadius: 10, borderColor: '#f2f2f2', justifyContent: 'center', }} mpContainer={{ mt: 15 }} height={55}>
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

                    <Container containerStyle={{ borderWidth: 1, borderRadius: 10, borderColor: '#f2f2f2', justifyContent: 'center', }} mpContainer={{ mt: 15 }} height={55}>
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: {}
})

export default Account;