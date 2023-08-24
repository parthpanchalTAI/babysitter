import moment from "moment";
import React from "react";
import { Pressable, Text, View } from 'react-native';
import { colors } from "../../assets/Colors/colors";

const MessageLists = ({
    isMyMessage,
    message,
    created_at,
    deleteMessage
}) => {
    if (isMyMessage) {
        return (
            <View style={{
                marginHorizontal: 10,
                maxWidth: '75%',
                justifyContent: 'flex-start',
                alignSelf: 'flex-end',
            }} >
                <Pressable style={{
                    backgroundColor: colors.light_yellow,
                    borderRadius: 15,
                    borderBottomRightRadius: 0,
                    paddingHorizontal: 15,
                    paddingVertical: 12,
                }}
                    onPress={deleteMessage}
                >
                    <Text
                        style={{
                            // color: 'black',
                            color: 'white',
                            fontSize: 14
                        }}
                    >{message}</Text>

                </Pressable>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    alignSelf: 'flex-end',
                    marginTop: 5
                }} >
                    <Text
                        style={{
                            fontSize: 10,
                            color: colors.Input_Gray_text,
                        }}
                    >{moment(created_at).format('HH:mm')}</Text>
                </View>
            </View>
        )
    }
    return (
        <View style={{
            // paddingRight:25,
            marginHorizontal: 10,
            maxWidth: '75%',
            justifyContent: 'flex-start',
            alignSelf: 'flex-start',
        }} >
            <Pressable style={{
                backgroundColor: '#f2f2f2',
                borderRadius: 15,
                borderBottomLeftRadius: 0,
                paddingHorizontal: 15,
                paddingVertical: 12,
            }}
                onPress={deleteMessage}
            >
                <Text
                    style={{
                        // color: 'black',
                        color: colors.Black,
                        fontSize: 14
                    }}
                >{message}</Text>

            </Pressable>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-start',
                marginTop: 5
            }} >
                <Text
                    style={{
                        fontSize: 10,
                        color: colors.Black,
                    }}
                >{moment(created_at).format('HH:mm')}</Text>
            </View>
        </View>
    )
}

export default MessageLists;