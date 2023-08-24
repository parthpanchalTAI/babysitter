import React from "react";
import { Alert, FlatList, Text, View } from 'react-native';
import MessageLists from "../../../components/chats/messageLists";
import useGetMessages from "../../../hooks/chatHook/useGetMessages";
import { useSelector } from "react-redux";
import ChatProvider from "../../../components/chats/chatProvider";
import chat from "../../../utils/chat";
import MessageInput from "../../../components/chats/messageInput";
import functions from "../../../utils/func";
import MainContainer from "../../../components/MainContainer";

const Conversation = ({
    route,
    navigation
}) => {
    const channel = route.params;
    console.log('channedl', channel);
    const { messages, setMessageHandler, loading } = useGetMessages(channel);
    const { fbUid } = useSelector((state) => state.whiteLists);

    const deleteMessage = async (messageId, isMyMessage) => {
        Alert.alert(
            "",
            "Delete message?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Delete", onPress: async () => {
                        if (isMyMessage) {
                            await chat.deleteMessage({ channelId: channel.channelId, messageId })

                            const lastMessageId = messages[messages.length - 1]?.messageId

                            console.log('lastMessageId', lastMessageId)
                            console.log('messageId', messageId)

                            if (messageId == lastMessageId) {
                                let lastMessage = messages[messages.length - 2]
                                console.log('lastMessage', lastMessage)
                                await chat.updateLastMessage({ channelId: channel.channelId, message: lastMessage?.message || '' })
                            }
                        } else {
                            await chat.hideMessage({ channelId: channel.channelId, messageId, uid: user?.uid })
                            let message = messages.filter((item, index) => item.messageId != messageId)
                            setMessageHandler(message)
                        }
                    }
                }
            ]
        );
    }

    const _renderMesssageList = ({ item, index }) => {
        let isMyMessage = item.sender_uid == fbUid
        if (item.type == 'day') {
            return <View style={{
                backgroundColor: '#f2f2f2',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 25,
                paddingVertical: 5,
                alignSelf: 'center',
                borderRadius: 4
            }} >
                <Text
                    style={{ fontSize: 12, color: 'grey' }}
                >{functions.getDateString(item.date)}</Text>
            </View>
        }
        return <MessageLists
            isMyMessage={isMyMessage}
            {...item}
            deleteMessage={() => deleteMessage(item.messageId, isMyMessage)}
        />
    }

    return (
        <ChatProvider channel={channel}>
            <MainContainer
                // loading={loading}
                absoluteModalLoading={loading}
            >
                <FlatList
                    data={functions.generateItems(messages)}
                    renderItem={_renderMesssageList}
                    ItemSeparatorComponent={() => <View style={{ marginVertical: 5 }} />}
                    // ListHeaderComponent={() => <View style={{ marginTop: 10 }} />}
                    inverted={true}
                    contentContainerStyle={{ paddingVertical: 20 }}
                    keyExtractor={(_, index) => index.toString()}
                />
                <MessageInput />
            </MainContainer>
        </ChatProvider>
    )
}

export default Conversation;