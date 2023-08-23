import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { Image, Text, View } from 'react-native';
import useChat from "../../hooks/chatHook/useChat";

export const ChatContext = React.createContext();

const ChatProvider = ({ children, channel }) => {
    const navigation = useNavigation();
    const { channelId, op_uid } = channel;
    const { op_user } = useChat({ channelId, uid: op_uid });

    console.log("opUser", op_user);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTintColor: 'black',
            headerTitle: () => {
                return (
                    <View style={{
                        flexDirection: "row",
                        alignItems: 'center',
                        left: -15
                    }} >
                        <View>
                            <Text
                                style={{ fontSize: 15, color: 'black', marginHorizontal: 15 }}
                            >{op_user?.name}</Text>
                         </View>
                     </View>
                )
            },
        })
    }, [op_user])

    return (
        <ChatContext.Provider value={{ ...channel, op_user }}>
            {children}
        </ChatContext.Provider>
    )
}

export default ChatProvider;