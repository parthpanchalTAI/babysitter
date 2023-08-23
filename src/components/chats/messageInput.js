import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import { KeyboardAvoidingView, Platform, Pressable, TextInput, useWindowDimensions, View } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { useSelector } from "react-redux";
import { colors } from "../../assets/Colors/colors";
import useChannel from "../../hooks/chatHook/useChannel";
import useMessages from "../../hooks/chatHook/useMessages";
import { screenHeight } from "../../utils/styleUtils";
import { ChatContext } from "./chatProvider";

const MessageInput = () => {
    const keyboardVerticalOffset = screenHeight * 0.0;

    const { height } = useWindowDimensions()
    const navigation = useNavigation()
    const { channelId, op_user } = useContext(ChatContext);
    console.log('channelId', channelId);

    const { fbUid, user } = useSelector((state) => state.whiteLists);
    console.log('user ->', user);
    console.log('op_user', op_user);

    const { message, sendMessage, changeMessageText } = useMessages({ channelId, op_user });
    const { createChannel } = useChannel();

    const sendMessageHandler = async () => {
        if (!channelId) {
            const { channelId } = await createChannel({
                members: {
                    [fbUid]: {
                        uid: fbUid,
                        name: user.first_name + '' + user.last_name,
                        chatConnect: false,
                        unReadCount: 0,
                        profile: user.profile_image || ''
                    },
                    [op_user.uid]: {
                        uid: op_user.uid,
                        name: op_user.name,
                        // first_name: op_user.first_name,
                        // last_name: op_user.last_name,
                        chatConnect: false,
                        unReadCount: 1,
                        profile: op_user?.profile
                    }
                },
                lastMessage: message,
                last_message_time: new Date().getTime(),
            })
            if (!channelId) return;
            sendMessage(channelId, op_user?.uid, true)
            navigation.setParams({
                channelId: channelId,
                fromCreateChannel: true
            });
        } else {
            sendMessage(channelId, op_user?.uid, false)
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={100}
        >
            <View style={{
                backgroundColor: 'white',
                borderTopWidth: 1,
                borderColor: 'lightgrey',
                // minHeight: 100,
                // position: 'absolute',
                // bottom: 0,
                // width: '100%',
                justifyContent: 'center',
                alignItems: 'flex-end',
                flexDirection: 'row',
                paddingVertical: 10
            }}
            >
                <TextInput
                    placeholder={'Type a message...'}
                    placeholderTextColor="#000"
                    style={{
                        borderWidth: 1,
                        borderColor: 'lightgrey',
                        borderRadius: 30,
                        width: '80%',
                        paddingHorizontal: 20,
                        paddingVertical: 6,
                        maxHeight: height * 0.50
                    }}
                    multiline={true}
                    value={message}
                    onChangeText={changeMessageText}
                />
                <Pressable style={{
                    // backgroundColor: colors.light_pink,
                    width: 35, height: 35,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 10,
                    bottom: 2,
                    opacity: message?.trim().length ? 1 : 0.2
                }}
                    disabled={message?.trim()?.length ? false : true}
                    onPress={sendMessageHandler}
                >
                    <FontAwesome
                        name='send'
                        size={25}
                        color={colors.light_pink}
                    />
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    )
}

export default MessageInput;