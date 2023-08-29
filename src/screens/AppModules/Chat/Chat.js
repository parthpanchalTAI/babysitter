import { useHeaderHeight } from "@react-navigation/elements";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, View } from "react-native";
// import { useSelector } from "react-redux";
import { colors } from "../../../assets/Colors/colors";
import { fonts } from "../../../assets/Fonts/fonts";
import { images } from "../../../assets/Images";
import Container from "../../../components/Container";
import Img from "../../../components/Img";
import InputBox from "../../../components/InputBox";
import Label from "../../../components/Label";
import ChatLists from "../../../components/ListsViews/ChatLists/ChatLists";
import Loading from "../../../components/Loader/Loading";
import MainContainer from "../../../components/MainContainer";
import useGetChannels from "../../../hooks/chatHook/useGetChannels";
import { getStatusBarHeight } from "../../../utils/globals";
import { vs } from "../../../utils/styleUtils";

const Chats = ({

}) => {
    const statusBarHeight = getStatusBarHeight();
    const headerHeight = useHeaderHeight();
    const navigation = useNavigation();

    const { channelList, loading } = useGetChannels();
    // const { fbUid } = useSelector((state) => state.whiteLists);

    const [usersList, setUsersList] = useState([]);
    const [search, setSearch] = useState('');

    const renderChatUserLists = ({ item }) => {
        return <ChatLists {...item} />
    }

    useEffect(() => {
        setUsersList(channelList)
    }, [channelList])


    const setSearchedUser = (search) => {
        console.log('search', search)
        const searchedUserList = channelList.filter(
            function (channels) {
                console.log('channel1 ', channels);
                console.log('channel', channels?.members?.name)
                const itemData = channels?.members?.ArhTSgrBk7WX9hTIIGKUVGLYsWh2?.name?.toUpperCase() || ''?.toLowerCase();
                console.log('itemData', itemData);
                const textData = search.toUpperCase();
                return itemData.indexOf(textData) > -1;
            }
        );
        setUsersList(searchedUserList);
    }

    useEffect(() => {
        if (search.trim().length > 2) {
            setSearchedUser(search)
        } else {
            setUsersList(channelList);
        }
    }, [search]);

    const renderHeader = () => {
        return (
            <Container
                containerStyle={{
                    backgroundColor: 'white',
                    paddingTop: statusBarHeight,
                }}
                mpContainer={{ ph: 15 }}
                height={headerHeight}
            >
                <Label mpLabel={{ mt: 5 }} labelSize={30} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }}>Chat</Label>
            </Container>
        )
    }

    useLayoutEffect(() => {
        navigation.setOptions(({
            header: () => {
                return renderHeader();
            }
        }))
    }, []);

    return (
        <MainContainer
            disableSafeAreaView={true}
        >
            <View style={{
                flex: 1,
                backgroundColor: 'white'
            }}>
                <InputBox
                    placeholder={'Search...'}
                    placeholderTextColor="#000"
                    containerStyle={{
                        borderColor: colors.grey,
                        borderRadius: 25,
                    }}
                    inputStyle={{ color: colors.Black }}
                    inputHeight={45}
                    mpInputContainer={{ ph: 10 }}
                    textSize={14}
                    mpContainer={{ mh: 20 }}
                    leftIcon={() => {
                        return (
                            <Img
                                imgSrc={images.search_img}
                                imgStyle={{
                                    width: 20,
                                    height: 20,
                                    resizeMode: 'contain'
                                }}
                            />
                        )
                    }}
                    value={search}
                    onChangeText={setSearch}
                />
                {
                    loading ? <Loading /> :
                        <FlatList
                            data={usersList}
                            renderItem={renderChatUserLists}
                            keyExtractor={(_, index) => index.toString()}
                            contentContainerStyle={{
                                paddingBottom: vs(20)
                            }}
                            ListHeaderComponent={() => <Container mpContainer={{ mt: 5 }} />}
                            ItemSeparatorComponent={() => <Container mpContainer={{ mt: 5 }} />}
                            ListEmptyComponent={() => {
                                return <Label style={{ textAlign: 'center', marginTop: 20 }} labelSize={20}>No Chats found</Label>
                            }}
                            showsVerticalScrollIndicator={false}
                        />
                }
            </View>
        </MainContainer>
    )
}

export default Chats;