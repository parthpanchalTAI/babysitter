import React, { useEffect, useLayoutEffect, useState } from "react";
import Container from "../../../components/Container";
import { useNavigation } from "@react-navigation/native";
import { images } from "../../../assets/Images";
import Img from "../../../components/Img";
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import Label from "../../../components/Label";
import { fonts } from "../../../assets/Fonts/fonts";
import { hs, screenHeight, vs } from "../../../utils/styleUtils";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Btn from "../../../components/Btn";
import { colors } from "../../../assets/Colors/colors";
import { useDispatch, useSelector } from "react-redux";
import { jobRequestDetailsApi } from "../../../features/dashboardSlice";
import Toast from 'react-native-simple-toast';
import { imageBaseUrl } from "../../../utils/apiEndPoints";
import MainContainer from "../../../components/MainContainer";

const JobRequestDetails = ({
    route
}) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { id } = route?.params;

    const [selectedLocation, setSelectedLocation] = useState(null);
    const [accept, setAccept] = useState(false);
    const [detailsInfo, setDetailsInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const { loading: loading } = useSelector((state) => state.dashboard.job_req_details);

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

    const handleRefresh = () => {
        setIsRefreshing(true);
        jobRequestDetailsHandler();
    }

    useEffect(() => {
        jobRequestDetailsHandler();
    }, []);

    const jobRequestDetailsHandler = async () => {
        setIsLoading(true);

        let formData = new FormData();
        formData.append('id', id);

        const response = await dispatch(jobRequestDetailsApi({ data: formData })).unwrap();
        console.log('res of job req details', response);

        if (response?.status == 'Success') {
            Toast.show(response?.message, Toast.SHORT);
            setIsLoading(false);
            setIsRefreshing(false);
            setDetailsInfo(response?.data);
        } else {
            Toast.show(response?.message, Toast.SHORT);
            setIsLoading(false);
            setIsRefreshing(false);
        }
    }

    return (
        <MainContainer absoluteLoading={loading}>
            <Container containerStyle={{ flex: 1, backgroundColor: 'white' }}>
                <ScrollView
                    contentContainerStyle={{ paddingBottom: vs(20) }}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={handleRefresh}
                            colors={['#F27289']}
                        />
                    }
                >
                    <Container mpContainer={{ mh: 20 }}>
                        {detailsInfo?.user_details?.profile_image ?
                            <Img
                                imgSrc={{ uri: `${imageBaseUrl}${detailsInfo?.user_details?.profile_image}` }}
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
                            <Container mpContainer={{ mt: 20 }} containerStyle={{ borderWidth: 1, borderRadius: 100, borderColor: '#f2f2f2', alignSelf: 'center' }} height={vs(90)} width={hs(90)} />
                        }
                        <Label mpLabel={{ mt: 15 }} labelSize={18} style={{ fontFamily: fonts.bold, fontWeight: 'bold', alignSelf: 'center' }}>{detailsInfo?.user_details?.first_name} {detailsInfo?.user_details?.last_name}</Label>
                        <Label mpLabel={{ mt: 5 }} labelSize={16} style={{ fontFamily: fonts.regular, alignSelf: 'center' }}>{detailsInfo?.user_details?.email}</Label>

                        <Container containerStyle={{ borderWidth: 1, borderColor: '#f2f2f2' }} mpContainer={{ mt: 15 }} />

                        <Container mpContainer={{ mt: 15 }}>
                            <Label labelSize={16} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }}>Date & Time</Label>
                            <Label mpLabel={{ mt: 5 }} labelSize={16} style={{ fontFamily: fonts.regular }}>{detailsInfo?.start_time} to {detailsInfo?.end_time}</Label>
                            <Label mpLabel={{ mt: 5 }} labelSize={16} style={{ fontFamily: fonts.regular }}>{detailsInfo?.start_date} to {detailsInfo?.end_date}</Label>
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
                                <Label mpLabel={{ ml: 5 }} labelSize={16} style={{ fontFamily: fonts.regular }}>{detailsInfo?.user_details?.address}</Label>
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
                    {/* {isLoading && <ActivityIndicator size={"large"} color={colors.light_pink} />} */}
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
        </MainContainer>
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