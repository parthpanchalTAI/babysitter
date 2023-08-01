import React, { useLayoutEffect, useState } from "react";
import Container from "../../../components/Container";
import { useNavigation } from "@react-navigation/native";
import { images } from "../../../assets/Images";
import Img from "../../../components/Img";
import { ScrollView, StyleSheet, View } from "react-native";
import Label from "../../../components/Label";
import { fonts } from "../../../assets/Fonts/fonts";
import { hs, screenHeight, vs } from "../../../utils/styleUtils";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Btn from "../../../components/Btn";
import { colors } from "../../../assets/Colors/colors";
import { imageBaseUrl } from "../../../utils/apiEndPoints";

const ActiveHistoryDetails = ({
    route
}) => {

    const navigation = useNavigation();

    const { start_date, end_date, start_time, end_time, booked_by_details } = route?.params?.activeHistoryDetails;

    const [selectedLocation, setSelectedLocation] = useState(null);

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

    return (
        <Container containerStyle={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView contentContainerStyle={{ paddingBottom: vs(20) }} showsVerticalScrollIndicator={false}>
                <Container mpContainer={{ mh: 20 }}>
                    {booked_by_details?.profile_image ?
                        <Img
                            imgSrc={{ uri: `${imageBaseUrl}${booked_by_details?.profile_image}` }}
                            imgStyle={{
                                width: hs(90),
                                height: vs(90),
                                resizeMode: 'contain',
                                alignSelf: 'center',
                                borderRadius: 100
                            }}
                            mpImage={{ mt: 20 }}
                        />
                        :
                        <Container containerStyle={{ borderWidth: 1, borderRadius: 100, borderColor: '#f2f2f2', alignSelf: 'center' }} height={vs(70)} width={hs(70)} />
                    }
                    <Label mpLabel={{ mt: 15 }} labelSize={18} style={{ fontFamily: fonts.bold, fontWeight: 'bold', alignSelf: 'center' }}>{booked_by_details?.first_name} {booked_by_details?.last_name}</Label>
                    <Label mpLabel={{ mt: 5 }} labelSize={16} style={{ fontFamily: fonts.regular, alignSelf: 'center' }}>{booked_by_details?.email}</Label>

                    <Container containerStyle={{ borderWidth: 1, borderColor: '#f2f2f2' }} mpContainer={{ mt: 15 }} />

                    <Container mpContainer={{ mt: 15 }}>
                        <Label labelSize={16} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }}>Date & Time</Label>
                        <Label mpLabel={{ mt: 5 }} labelSize={16} style={{ fontFamily: fonts.regular }}>{start_date} to {end_date}</Label>
                        <Label mpLabel={{ mt: 5 }} labelSize={16} style={{ fontFamily: fonts.regular }}>{start_time} to {end_time}</Label>
                    </Container>

                    <Container mpContainer={{ mt: 15 }}>
                        <Label labelSize={16} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }}>Address</Label>

                        <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }} mpContainer={{ mt: 10 }}>
                            <Img
                                imgSrc={images.location_pin}
                                imgStyle={{
                                    width: hs(18),
                                    height: vs(18),
                                    resizeMode: 'contain'
                                }}
                            />
                            <Label mpLabel={{ ml: 5 }} labelSize={16} style={{ fontFamily: fonts.regular }}>{booked_by_details?.address}</Label>
                        </Container>

                        <View style={{ borderRadius: 10, overflow: 'hidden', marginTop: 15 }}>
                            <MapView
                                style={{ height: screenHeight * 0.35 }}
                                provider={PROVIDER_GOOGLE}
                                mapPadding={{ bottom: 0 }}
                            >
                                {selectedLocation && <Marker coordinate={selectedLocation} />}
                            </MapView>
                        </View>
                    </Container>
                </Container>
            </ScrollView>

            {/* {accept == false ?
                <Container mpContainer={{ mh: 20, mb: 10, mt: 10, }} containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Btn
                        title='Decline'
                        btnStyle={styles.decline_btn_style}
                        btnHeight={45}
                        textColor={'black'}
                        textSize={16}
                        onPress={() => navigation.goBack()}
                    />

                    <Btn
                        title='Accept'
                        btnStyle={styles.accept_btn_style}
                        btnHeight={45}
                        textColor={'white'}
                        textSize={16}
                        onPress={() => setAccept(true)}
                    />
                </Container>
                :
                <Btn
                    title='Send message'
                    btnStyle={styles.btn_style}
                    btnHeight={50}
                    mpBtn={{ mb: 10, mt: 10 }}
                    textColor={'white'}
                    textSize={16}
                />
            } */}

            <Btn
                title='Send message'
                btnStyle={styles.btn_style}
                btnHeight={50}
                mpBtn={{ mb: 10, mt: 10 }}
                textColor={'white'}
                textSize={16}
            />
        </Container>
    )
}

const styles = StyleSheet.create({
    back_img: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    decline_btn_style: {
        backgroundColor: 'lightgrey',
        borderRadius: 5,
        justifyContent: 'center',
        width: "48%"
    },
    accept_btn_style: {
        backgroundColor: colors.light_pink,
        borderRadius: 5,
        justifyContent: 'center',
        width: "48%"
    },
    btn_style: {
        backgroundColor: colors.light_pink,
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        width: "92%",
    }
})

export default ActiveHistoryDetails;