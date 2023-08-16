import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import Container from "../../../components/Container";
import Img from "../../../components/Img";
import { images } from "../../../assets/Images";
import Label from "../../../components/Label";
import { fonts } from "../../../assets/Fonts/fonts";
import { hs, screenWidth, vs } from "../../../utils/styleUtils";
import { getStatusBarHeight } from "../../../utils/globals";
import JobRequestsLists from "../../../components/ListsViews/JobRequestsLists/JobRequestsLists";
import LocationModal from "../../../modals/LocationModal/LocationModal";
import { useDispatch, useSelector } from "react-redux";
import { jobRequestListsApi } from "../../../features/dashboardSlice";
import Toast from 'react-native-simple-toast';
import MainContainer from "../../../components/MainContainer";

const Dashboard = ({
    route
}) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const statusBarHeight = getStatusBarHeight();

    const locationRef = useRef();

    const [isRefreshing, setIsRefreshing] = useState(false);

    const { user } = useSelector((state) => state?.whiteLists);
    const { loading: jobreqListLoading, data: data } = useSelector((state) => state.dashboard.job_req_lists);
    const { action } = useSelector((state) => state.dashboard);

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
                            imgSrc={images.pin2_img}
                            imgStyle={{
                                width: 25,
                                height: 25,
                                resizeMode: "contain"
                            }}
                        />
                        <Label labelSize={16} mpLabel={{ ml: 5 }} style={{ fontFamily: fonts.regular, fontWeight: '650' }}>{user?.address}</Label>
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

                <Label mpLabel={{ mt: 10, ml: 5 }} labelSize={20} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }}>{'New job requests'}</Label>
            </Container>
        )
    }

    const _renderJobRequestItem = ({ item }) => {
        return <JobRequestsLists {...item} />
    }

    const handleRefresh = () => {
        setIsRefreshing(true);
        jobrequestListsHandler();
    }

    useEffect(() => {
        if (action == true) {
            jobrequestListsHandler();
        }
    }, [dispatch, action]);

    useEffect(() => {
        if (route?.params?.fromDecline) {
            jobrequestListsHandler();
        }
    }, [route?.params?.fromDecline]);

    useEffect(() => {
        jobrequestListsHandler();
    }, []);

    const jobrequestListsHandler = async () => {
        const response = await dispatch(jobRequestListsApi({})).unwrap();
        if (response?.status == 'Success') {
            console.log('res -->', response);
            Toast.show(response?.message, Toast.SHORT);
            setIsRefreshing(false);
        } else {
            Toast.show(response?.message, Toast.SHORT);
            setIsRefreshing(false);
        }
    }

    return (
        <MainContainer absoluteLoading={jobreqListLoading}>
            <Container containerStyle={{ flex: 1, backgroundColor: 'white' }}>
                <FlatList
                    data={data}
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
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={handleRefresh}
                            colors={['#F27289']}
                        />
                    }
                />
                <LocationModal modalizeRef={locationRef} />
            </Container>
        </MainContainer>
    )
}

export default Dashboard;