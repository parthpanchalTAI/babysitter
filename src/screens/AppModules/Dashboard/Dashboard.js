import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useRef } from "react";
import { FlatList, View } from "react-native";
import Container from "../../../components/Container";
import Img from "../../../components/Img";
import { images } from "../../../assets/Images";
import Label from "../../../components/Label";
import { fonts } from "../../../assets/Fonts/fonts";
import { hs, screenWidth, vs } from "../../../utils/styleUtils";
import { getStatusBarHeight } from "../../../utils/globals";
import { Arrays } from "../../../../Arrays";
import JobRequestsLists from "../../../components/ListsViews/JobRequestsLists/JobRequestsLists";
import LocationModal from "../../../modals/LocationModal/LocationModal";
import { useSelector } from "react-redux";

const Dashboard = () => {

    const navigation = useNavigation();
    const statusBarHeight = getStatusBarHeight();

    const locationRef = useRef();

    const { user } = useSelector((state) => state?.whiteLists);

    const openLocationModal = () => {
        locationRef?.current?.present();
    }

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
                    <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Img
                            imgSrc={images.location_pin}
                            imgStyle={{
                                width: 25,
                                height: 25,
                                resizeMode: "contain"
                            }}
                        />
                        <Label labelSize={16} mpLabel={{ ml: 5 }} style={{ fontFamily: fonts.regular, fontWeight: '650' }}>{user?.first_name}</Label>
                    </Container>

                    <Container onPress={() => navigation.navigate('Search')} containerStyle={{ borderWidth: 1, backgroundColor: '#f2f2f2', borderColor: '#f2f2f2', borderRadius: 40, justifyContent: 'center' }} width={screenWidth * 0.28} height={35}>
                        <Container containerStyle={{ flexDirection: 'row', justifyContent: 'space-between' }} mpContainer={{ mh: 10 }}>
                            <Label labelSize={14} style={{ fontFamily: fonts.regular }}>Search</Label>
                            <Img
                                imgSrc={images.search_img}
                                imgStyle={{
                                    width: 15,
                                    height: 15,
                                    resizeMode: 'contain'
                                }}
                            />
                        </Container>
                    </Container>
                </Container>

                <Label mpLabel={{ mt: 10, ml: 5 }} labelSize={20} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }}>{'4 new job request'}</Label>
            </Container>
        )
    }

    const _renderJobRequestItem = ({ item }) => {
        return <JobRequestsLists {...item} />
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <FlatList
                data={Arrays.jobRequestsLists}
                renderItem={_renderJobRequestItem}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={{
                    paddingBottom: vs(20)
                }}
                showsVerticalScrollIndicator={false}
                style={{
                    marginHorizontal: hs(20),
                    marginTop: vs(10)
                }}
            />

            <LocationModal modalizeRef={locationRef} />
        </View>
    )
}

export default Dashboard;