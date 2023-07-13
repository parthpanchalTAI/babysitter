import React, { useLayoutEffect, useState } from "react";
import Container from "../../../components/Container";
import { useNavigation } from "@react-navigation/native";
import { images } from "../../../assets/Images";
import Img from "../../../components/Img";
import { ScrollView, StyleSheet, View } from "react-native";
import Label from "../../../components/Label";
import { fonts } from "../../../assets/Fonts/fonts";
import { screenHeight, vs } from "../../../utils/styleUtils";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Btn from "../../../components/Btn";
import { colors } from "../../../assets/Colors/colors";

const JobRequestDetails = ({

}) => {

    const navigation = useNavigation();
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [accept, setAccept] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => {
                return renderHeader();
            }
        });
    }, []);

    const renderHeader = () => {
        return (
            <View style={{ backgroundColor: 'white' }}>
                <Img
                    imgSrc={images.back_img}
                    mpImage={{ mt: 45, mh: 15 }}
                    imgStyle={styles.back_img}
                    onPress={() => navigation.goBack()}
                />
            </View>
        )
    }

    return (
        <Container containerStyle={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView contentContainerStyle={{ paddingBottom: vs(20) }} showsVerticalScrollIndicator={false}>
                <Container mpContainer={{ mh: 20 }}>
                    <Img
                        imgSrc={images.profile_img2}
                        imgStyle={{
                            width: 90,
                            height: 90,
                            resizeMode: 'contain',
                            alignSelf: 'center'
                        }}
                        mpImage={{ mt: 20 }}
                    />
                    <Label mpLabel={{ mt: 15 }} labelSize={18} style={{ fontFamily: fonts.bold, fontWeight: 'bold', alignSelf: 'center' }}>{'David john'}</Label>
                    <Label mpLabel={{ mt: 5 }} labelSize={16} style={{ fontFamily: fonts.regular, alignSelf: 'center' }}>{'davidjohn@gmail.com'}</Label>

                    <Container containerStyle={{ borderWidth: 1, borderColor: '#f2f2f2' }} mpContainer={{ mt: 15 }} />

                    <Container mpContainer={{ mt: 15 }}>
                        <Label labelSize={16} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }}>Date & Time</Label>
                        <Label mpLabel={{ mt: 5 }} labelSize={16} style={{ fontFamily: fonts.regular }}>{'19 Oct 2021 to 19 Nov 2021'}</Label>
                        <Label mpLabel={{ mt: 5 }} labelSize={16} style={{ fontFamily: fonts.regular }}>{'6:00 AM to 10:00 AM'}</Label>
                    </Container>

                    <Container mpContainer={{ mt: 15 }}>
                        <Label labelSize={16} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }}>Address</Label>

                        <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }} mpContainer={{ mt: 10 }}>
                            <Img
                                imgSrc={images.location_pin}
                                imgStyle={{
                                    width: 18,
                                    height: 18,
                                    resizeMode: 'contain'
                                }}
                            />
                            <Label mpLabel={{ ml: 5 }} labelSize={16} style={{ fontFamily: fonts.regular }}>{'223, Sanfrancisco, California'}</Label>
                        </Container>

                        <MapView
                            style={{ height: screenHeight * 0.35, marginTop: 15 }}
                            provider={PROVIDER_GOOGLE}
                            mapPadding={{ bottom: 0 }}
                        >
                            {selectedLocation && <Marker coordinate={selectedLocation} />}
                        </MapView>
                    </Container>
                </Container>
            </ScrollView>

            {accept == false ?
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
            }
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

export default JobRequestDetails;