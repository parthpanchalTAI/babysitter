import { useNavigation } from "@react-navigation/core";
import React, { useLayoutEffect } from "react";
import { Animated, StyleSheet, View } from "react-native";
import Container from "../../../components/Container";
import Img from "../../../components/Img";
import { images } from "../../../assets/Images";
import { fonts } from "../../../assets/Fonts/fonts";
import Label from "../../../components/Label";
import { getStatusBarHeight } from "../../../utils/globals";
import { screenWidth, vs } from "../../../utils/styleUtils";
import { Arrays } from "../../../../Arrays";
import ChatLists from "../../../components/ListsViews/ChatLists/ChatLists";

const Chat = () => {

    const navigation = useNavigation();
    const statusBarHeight = getStatusBarHeight();

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
                    <Label mpLabel={{ mt: 5 }} labelSize={30} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }}>Chat</Label>

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
            </Container>
        )
    }

    const _renderChatLists = ({ item }) => {
        return <ChatLists {...item} />
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Container mpContainer={{ mt: 5, mh: 20 }}>
                <Animated.FlatList
                    data={Arrays.chatLists}
                    renderItem={_renderChatLists}
                    keyExtractor={(_, index) => index.toString()}
                    contentContainerStyle={{
                        paddingBottom: vs(20)
                    }}
                    showsVerticalScrollIndicator={false}
                />
            </Container>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {}
})

export default Chat;
