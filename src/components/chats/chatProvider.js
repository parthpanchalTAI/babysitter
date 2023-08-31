import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { Text } from 'react-native';
import useChat from "../../hooks/chatHook/useChat";
import { useHeaderHeight } from "@react-navigation/elements";
import ChatActionsMenu from "../ActionsMenu/ChatActionsMenu";
import { getStatusBarHeight } from "../../utils/globals";
import Container from "../Container";
import { images } from "../../assets/Images";
import Img from "../Img";

export const ChatContext = React.createContext();

const ChatProvider = ({ children, channel }) => {

    const statusbarHeight = getStatusBarHeight();
    const headerHeight = useHeaderHeight();
    const navigation = useNavigation();

    const { channelId, op_uid } = channel;
    const { op_user } = useChat({ channelId, uid: op_uid });
    console.log("op", op_user);

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => {
                return renderHeader();
            }
        })
    }, [op_user])

    const renderHeader = () => {
        return (
            <Container containerStyle={{ backgroundColor: 'white' }}>
                <Container
                    containerStyle={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingTop: statusbarHeight,
                    }}
                    mpContainer={{ pv: 10, mh: 10, mt: 10 }}
                >
                    <Container
                        onPress={() => navigation.goBack()}
                        containerStyle={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                        <Img
                            imgSrc={images.back_img}
                            imgStyle={{
                                width: 20,
                                height: 20,
                                resizeMode: 'contain',
                            }}
                            onPress={() => navigation.goBack()}
                        />
                    </Container>
                    
                    <Text style={{ fontSize: 15, color: 'black', marginHorizontal: 15 }}>{op_user?.name}</Text>
                    <ChatActionsMenu headerHeight={headerHeight} />
                </Container>
            </Container>
        )
    }

    return (
        <ChatContext.Provider value={{ ...channel, op_user }}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatProvider;