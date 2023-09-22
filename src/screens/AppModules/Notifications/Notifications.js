import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, RefreshControl } from "react-native";
import Label from "../../../components/Label";
import { useNavigation } from "@react-navigation/core";
import { getStatusBarHeight } from "../../../utils/globals";
import Container from "../../../components/Container";
import { fonts } from "../../../assets/Fonts/fonts";
import { hs, vs } from "../../../utils/styleUtils";
import NotificationsLists from "../../../components/ListsViews/NotificationsLists/NotificationsLists";
import { useDispatch, useSelector } from "react-redux";
import { notificationListsApi } from "../../../features/notificationSlice";
import Toast from 'react-native-simple-toast';
import MainContainer from "../../../components/MainContainer";
import { colors } from "../../../assets/Colors/colors";

const Notifications = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const statusBarHeight = getStatusBarHeight();

    const scrollY = useRef(new Animated.Value(0)).current;

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const { loading: notificationListsLoading, data: notificationLists } = useSelector((state) => state.notification.notification_lists);

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
                <Label mpLabel={{ mt: 5 }} labelSize={30} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }}>Notifications</Label>
            </Container>
        )
    }

    const handleRefresh = () => {
        setIsRefreshing(true);
        notificationListsHandler();
    }

    useEffect(() => {
        notificationListsHandler();
    }, [isRefreshing]);

    const notificationListsHandler = async () => {
        const response = await dispatch(notificationListsApi({ data: '' })).unwrap();
        console.log('res of lists', response);

        if (response?.status == 'Success') {
            Toast.show(response?.message, Toast.SHORT);
            setIsLoading(false);
            setIsRefreshing(false);
        } else {
            Toast.show(response?.message, Toast.SHORT);
            setIsLoading(false);
            setIsRefreshing(false);
        }
    }

    const _renderNotificationsLists = ({ item }) => {
        const scale = scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [1, 0.5],
            extrapolate: 'clamp',
        });

        return (
            <NotificationsLists {...item} scale={scale} />
        )
    }

    return (
        <Container containerStyle={{ flex: 1, backgroundColor: 'white' }}>
            <MainContainer absoluteLoading={notificationListsLoading}>
                <Animated.FlatList
                    data={notificationLists}
                    renderItem={_renderNotificationsLists}
                    keyExtractor={(_, index) => index.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: vs(20)
                    }}
                    style={{ marginHorizontal: hs(20), }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: true }
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={isRefreshing}
                            onRefresh={handleRefresh}
                            colors={['#F27289']}
                        />
                    }
                    ListEmptyComponent={() => {
                        return (
                            <Label mpLabel={{ mt: 30 }} labelSize={20} style={{ fontFamily: fonts.regular, alignSelf: 'center' }}>No notification lists found</Label>
                        )
                    }}
                />
            </MainContainer>
            {isLoading && <ActivityIndicator size={"large"} color={colors.light_pink} />}
        </Container>
    )
}

export default Notifications;