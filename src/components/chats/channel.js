import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Pressable, Text, View } from 'react-native';
import { useSelector } from "react-redux";
import functions from "../../utils/func";

const Channel = (props) => {
    const { lastMessage, last_message_time } = props;
    const { user } = useSelector((state) => state.whiteLists);
    const navigation = useNavigation();

    let uid = Object.keys(props.members).find((uid) => uid != user.uid);
    const userData = props.members[uid]
    const { unReadCount } = props.members[user.uid];

    const onSelectChannel = () => {
        navigation.navigate('Conversations', {
            channel: {
                channelId: props?.channelId,
                user: props.members[uid]
            }
        })
    }
    return (
        <Pressable style={{
            flexDirection: 'row',
            alignItems: 'center',
            // height: 60,
            marginHorizontal: 10,
        }}
            onPress={onSelectChannel}
        >
            <Image
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Pierre-Person.jpg' }}
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 40
                }}
            />
            <View style={{ marginHorizontal: 10, flex: 0.8 }} >
                <Text style={{
                    fontSize: 14,
                    color: 'black'
                }} >{userData?.name}</Text>
                <Text style={{
                    fontSize: 12,
                    color: 'grey',
                    marginTop: 2
                }}
                    numberOfLines={1}
                >{lastMessage}</Text>
            </View>
            <Text
                style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    fontSize: 12
                }}
            >{functions.getLastMessageDateString(last_message_time)}</Text>
            <View style={{
                backgroundColor: 'green',
                borderRadius: 10,
                width: 18, height: 18,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                bottom: 2,
                right: 0,
                display: unReadCount ? 'flex' : 'none'
            }} >
                <Text
                    style={{ color: 'white', fontSize: 10 }}
                >{unReadCount}</Text>
            </View>
        </Pressable>
    )
}

export default Channel;