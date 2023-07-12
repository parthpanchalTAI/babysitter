import React from "react";
import { StyleSheet,View,Pressable,Text } from "react-native";
import { colors } from "../../../assets/Colors/colors";

const MessageLists = ({
    send_message,
    receive_message
}) => {
    if (send_message) {
        return (
            <View style={{
                marginHorizontal: 10,
                maxWidth: '75%',
                justifyContent: 'flex-start',
                alignSelf: 'flex-end',
            }} >
                <Pressable style={{
                    backgroundColor: colors.black,
                    borderRadius: 15,
                    borderBottomRightRadius: 0,
                    paddingHorizontal: 15,
                    paddingVertical: 12,
                }}
                >
                    <Text
                        style={{
                            // color: 'black',
                            color: 'white',
                            fontSize: 14
                        }}
                    >{send_message}</Text>

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
                    >32</Text>
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
            >
                <Text
                    style={{
                        // color: 'black',
                        color: colors.Black,
                        fontSize: 14
                    }}
                >{receive_message}</Text>

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
                        color: colors.Input_Gray_text,
                    }}
                >32</Text>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 60,
    },
    myMessage: {
        backgroundColor: '#DCF8C5',
        alignSelf: 'flex-end',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    otherMessage: {
        backgroundColor: '#F2F2F2',
        alignSelf: 'flex-start',
        padding: 10,
        borderRadius: 10,
        marginBottom: 10,
    },
    messageText: {
        fontSize: 16,
        color: '#000',
    },
})

export default MessageLists;