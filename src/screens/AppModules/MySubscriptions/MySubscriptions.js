import React, { useEffect, useLayoutEffect, useState } from "react";
import Container from "../../../components/Container";
import { useNavigation } from "@react-navigation/native";
import Img from "../../../components/Img";
import { images } from "../../../assets/Images";
import { fonts } from "../../../assets/Fonts/fonts";
import Label from "../../../components/Label";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { hs, screenHeight, screenWidth, vs } from "../../../utils/styleUtils";
import { colors } from "../../../assets/Colors/colors";
import Btn from "../../../components/Btn";
import { useDispatch, useSelector } from "react-redux";
import { activeFeaturePlanApi, expiredFeaturePlanApi, featuredBabySitterApi } from "../../../features/accountSlice";
import Toast from 'react-native-simple-toast';
import MainContainer from "../../../components/MainContainer";
import { AppStack } from "../../../navigators/NavActions";

const MySubscriptions = ({
    route
}) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { featured_id } = route?.params;

    const [isActive, setIsActive] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const { loading: activeFeatureListLoading, data: activeFeatureLists } = useSelector((state) => state.account.active_feature_plan);
    const { loading: expiredFeatureListLoading, data: expireFeatureLists } = useSelector((state) => state.account.expire_feature_plan)
    const { loading: completeFeatureBabySitterLoading } = useSelector((state) => state.account.feature_babysitter);

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => {
                return renderHeader();
            }
        });
    }, []);

    const renderHeader = () => {
        return (
            <Container onPress={() => navigation.goBack()} containerStyle={{ backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                <Img
                    imgSrc={images.back_img}
                    mpImage={{ mt: 45, mh: 15 }}
                    imgStyle={styles.back_img}
                />
                <Label labelSize={18} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }} mpLabel={{ mt: 45 }}>My Subscription</Label>
            </Container>
        )
    }

    useEffect(() => {
        activeSubscriptionListsHandler();
    },[]);

    useEffect(() => {
        expiredSubscriptionListsHandler();
    },[]);

    const handleActiveListRefresh = () => {
        setIsRefreshing(true);
        activeSubscriptionListsHandler();
    }

    const handleExpireListRefresh = () => {
        setIsRefreshing(true);
        expiredSubscriptionListsHandler();
    }

    const activeSubscriptionListsHandler = async () => {
        const response = await dispatch(activeFeaturePlanApi({})).unwrap();
        if (response?.status == 'Success') {
            console.log('res -->', response);
            Toast.show(response?.message, Toast.SHORT);
            setIsRefreshing(false);
        } else {
            Toast.show(response?.message, Toast.SHORT);
            setIsRefreshing(false);
        }
    }

    const expiredSubscriptionListsHandler = async () => {
        const response = await dispatch(expiredFeaturePlanApi({})).unwrap();
        if (response?.status == 'Success') {
            console.log('res -->', response);
            Toast.show(response?.message, Toast.SHORT);
            setIsRefreshing(false);
        } else {
            Toast.show(response?.message, Toast.SHORT);
            setIsRefreshing(false);
        }
    }

    const completeFeaturedBabySitterHandler = async () => {
        let formData = new FormData();
        formData.append('featured_id', featured_id);

        const response = await dispatch(featuredBabySitterApi({ data: formData })).unwrap();

        if (response?.status == 'Success') {
            navigation.dispatch(AppStack);
        }
    }

    // render subscriptions lists

    const _renderActiveSubscriptionLists = ({ item }) => {
        return (
            <Container mpContainer={{ mt: 20, mh: 20, pv: 10 }} containerStyle={{ justifyContent: 'center', borderWidth: 1, borderColor: '#b2b2b2', borderRadius: 7 }}>
                <Container containerStyle={{ flexDirection: 'row' }}>
                    <Container mpContainer={{ ml: 11 }} height={screenHeight * 0.13} width={screenWidth * 0.28} containerStyle={{ justifyContent: 'center', borderWidth: 1, backgroundColor: '#e1e3e1', borderRadius: 7, borderColor: '#e1e3e1' }}>
                        <Img
                            imgSrc={images.featured_icon}
                            imgStyle={{
                                width: hs(50),
                                height: vs(50),
                                resizeMode: 'contain',
                                alignSelf: 'center'
                            }}
                        />
                    </Container>

                    <Container mpContainer={{ mh: 20 }}>
                        <Label mpLabel={{ mt: 5 }} labelSize={20} style={{ fontFamily: fonts.regular }}>{item?.featured_plan_details?.validity} {item?.featured_plan_details?.duration}</Label>
                        <Label mpLabel={{ mt: 5 }} labelSize={14} style={{ fontFamily: fonts.regular }}>Expires on : {item?.expired_date}</Label>
                        <Label mpLabel={{ mt: 5 }} labelSize={14} style={{ fontFamily: fonts.regular }}>Price : ${item?.featured_plan_details?.price}</Label>
                        <Label mpLabel={{ mt: 5 }} labelSize={14} style={{ fontFamily: fonts.regular }}>Status : <Label mpLabel={{ mt: 5 }} labelSize={14} style={{ fontFamily: fonts.regular, color: 'green' }}>{'Active'}</Label></Label>
                    </Container>
                </Container>
            </Container>
        )
    }

    const _renderExpireSubscriptionLists = ({ item }) => {
        return (
            <Container mpContainer={{ mt: 20, mh: 20, pv: 10 }} containerStyle={{ justifyContent: 'center', borderWidth: 1, borderColor: '#b2b2b2', borderRadius: 7 }}>
                <Container containerStyle={{ flexDirection: 'row' }}>
                    <Container mpContainer={{ ml: 11 }} height={screenHeight * 0.13} width={screenWidth * 0.28} containerStyle={{ justifyContent: 'center', borderWidth: 1, backgroundColor: '#e1e3e1', borderRadius: 7, borderColor: '#e1e3e1' }}>
                        <Img
                            imgSrc={images.featured_icon}
                            imgStyle={{
                                width: hs(50),
                                height: vs(50),
                                resizeMode: 'contain',
                                alignSelf: 'center'
                            }}
                        />
                    </Container>

                    <Container mpContainer={{ mh: 20 }}>
                        <Label mpLabel={{ mt: 5 }} labelSize={20} style={{ fontFamily: fonts.regular }}>{item?.featured_plan_details?.validity} {item?.featured_plan_details?.duration}</Label>
                        <Label mpLabel={{ mt: 5 }} labelSize={14} style={{ fontFamily: fonts.regular }}>Expires on : {item?.expired_date}</Label>
                        <Label mpLabel={{ mt: 5 }} labelSize={14} style={{ fontFamily: fonts.regular }}>Price : ${item?.featured_plan_details?.price}</Label>
                        <Label mpLabel={{ mt: 5 }} labelSize={14} style={{ fontFamily: fonts.regular }}>Status : <Label mpLabel={{ mt: 5 }} labelSize={14} style={{ fontFamily: fonts.regular, color: 'green' }}>{'Active'}</Label></Label>
                    </Container>
                </Container>
            </Container>
        )
    }

    return (
        <MainContainer absoluteLoading={completeFeatureBabySitterLoading}>
            <Container containerStyle={{ flex: 1, backgroundColor: 'white' }}>
                <Container containerStyle={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'white'
                }}
                    mpContainer={{ ph: 15, pt: 15 }}
                >
                    <Btn
                        title='Active'
                        btnStyle={{ width: screenWidth * 0.42, borderRadius: 20, backgroundColor: isActive ? '#e3ecfa' : 'white' }}
                        btnHeight={40}
                        textSize={16}
                        onPress={() => setIsActive(true)}
                        textColor={isActive ? colors.Black : colors.grey}
                    />
                    <Btn
                        title='Expired'
                        btnStyle={{
                            width: screenWidth * 0.42, borderRadius: 20,
                            backgroundColor: !isActive ? '#e3ecfa' : 'white'
                        }}
                        btnHeight={40}
                        textSize={16}
                        textColor={!isActive ? colors.Black : colors.grey}
                        onPress={() => setIsActive(false)}
                    />
                </Container>

                <MainContainer loading={activeFeatureListLoading || expiredFeatureListLoading}>
                    {isActive ?
                        <FlatList
                            data={activeFeatureLists}
                            renderItem={_renderActiveSubscriptionLists}
                            keyExtractor={(_, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: vs(20) }}
                            refreshControl={
                                <RefreshControl
                                    refreshing={isRefreshing}
                                    onRefresh={handleActiveListRefresh}
                                    colors={['#F27289']}
                                />
                            }
                        />
                        :
                        <FlatList
                            data={expireFeatureLists}
                            renderItem={_renderExpireSubscriptionLists}
                            keyExtractor={(_, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingBottom: vs(20) }}
                            refreshControl={
                                <RefreshControl
                                    refreshing={isRefreshing}
                                    onRefresh={handleExpireListRefresh}
                                    colors={['#F27289']}
                                />
                            }
                        />
                    }

                </MainContainer>

                {isActive ?
                    <Btn
                        title='Complete BabySitter Feature'
                        btnStyle={{
                            backgroundColor: colors.light_pink,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignSelf: 'center',
                            width: "92%"
                        }}
                        mpBtn={{ mb: 10 }}
                        btnHeight={50}
                        textColor={'white'}
                        textSize={16}
                        onPress={completeFeaturedBabySitterHandler}
                    />
                    :
                    null
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
})

export default MySubscriptions;