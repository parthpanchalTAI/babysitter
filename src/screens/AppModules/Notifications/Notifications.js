import React, { useLayoutEffect, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";
import Label from "../../../components/Label";
import { useNavigation } from "@react-navigation/core";
import { getStatusBarHeight } from "../../../utils/globals";
import Container from "../../../components/Container";
import { fonts } from "../../../assets/Fonts/fonts";
import { Arrays } from "../../../../Arrays";
import { hs, vs } from "../../../utils/styleUtils";
import NotificationsLists from "../../../components/ListsViews/NotificationsLists/NotificationsLists";

const Notifications = () => {

    const navigation = useNavigation();
    const statusBarHeight = getStatusBarHeight();

    const scrollY = useRef(new Animated.Value(0)).current;

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
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Animated.FlatList
                data={Arrays.notifications_lists}
                renderItem={_renderNotificationsLists}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: vs(20)
                }}
                style={{ marginHorizontal: hs(20),}}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: true }
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {}
})

export default Notifications;