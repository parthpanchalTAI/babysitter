import database from "@react-native-firebase/database";
import { firebase_server_key } from "./globals";

const getFbSitterDetail = async ({ user_id }) => {
    let result = await database().ref('User').once('value')
    if (result.exists()) {
        const babysitters = Object.values(result.val())
        const babysittersFind = babysitters.find((item, index) => item.user_id == user_id)
        return babysittersFind || null
    }
    return null
}

const getChannel = async ({ uid, op_uid }) => {
    console.log("op_uid", op_uid);
    try {
        const snapshot = await database().ref('/Channels').once('value')
        if (snapshot.val()) {
            const channels = Object.values(snapshot.val()).find((channel) => {
                return Object.keys(channel.members).includes(uid) && Object.keys(channel.members).includes(op_uid)
            })
            return channels || null
        }
        return null
    }
    catch (error) {
        console.log('error', error);
    }
}

const sendUnreadCount = async ({ channelId, uid, count }) => {
    console.log('sendUnreadcount', count);
    try {
        const result = await database().ref(`/Channels/${channelId}/members/${uid}`)
            .update({
                unReadCount: count
            })
        console.log('send unreadcount =>', count);
        return result;
    }
    catch (error) {
        console.log('error while sending unread Count', error);
    }
}

const memberDetail = ({ channelId, uid }) => {
    var memberDetail = []
    database().ref(`/Channels/${channelId}/members/${uid}`).on('value', snapshot => {
        memberDetail.push(snapshot.val())
    })
    console.log('memberDetail===>', memberDetail);
    return memberDetail;
}

const getUnreadCount = ({ channelId, uid }) => {
    database().ref(`/Channels/${channelId}/members/${uid}`).on('value', snapShot => {
        const channel = snapShot.val()
        console.log('getUnreadCount', channel)
        return channel?.unReadCount || 0;
    })
};

const watchTyping = async ({ channelId, uid, typing }) => {
    try {
        await database().ref(`/Channels/${channelId}/members/${uid}`).update({ typing })
        console.log('Typing Started.. .==>')
        return typing
    }
    catch (error) {
        console.error('error while start Typing', error);
    }
}

const sendNotification = async ({ device_token, first_name, last_name, message, name }) => {
    // const name = `${first_name} ${last_name}`;
    console.log("name notification", name);
    if (device_token) {
        try {
            const result = await fetch('https://fcm.googleapis.com/fcm/send', {
                method: 'POST',
                body: JSON.stringify({
                    "to": device_token,
                    "notification": {
                        "body": message,
                        "title": `${name} send you a message`
                    },
                    "data": {
                        type: "Chat"
                    }
                }),
                headers: {
                    "Accept": "application/json",
                    'Content-Type': 'application/json',
                    'Authorization': `key=${firebase_server_key}`
                }
            })
            let response = await result.json()
            console.log("res from notification", response);

            console.log('send push message to user', response)
        }
        catch (error) {
            console.error('error while sending push message', error);
        }
    }
}

const hideMessage = async ({ channelId, messageId, uid }) => {
    try {
        const result = await database()
            .ref(`/Messages/${channelId}/${messageId}`)
            .update({
                hideMessage_uid: uid
            })
        console.log('hideMessage==>', result)
        return result;
    }

    catch (error) {
        console.log('error while sending unread Count', error);
    }
}

const deleteMessage = async ({ channelId, messageId }) => {
    try {
        const result = await database()
            .ref(`/Messages/${channelId}/${messageId}`)
            .remove()
        console.log('deleteMessage ==>', result)
        return result;
    }

    catch (error) {
        console.log('error while sending unread Count', error);
    }
}

const updateLastMessage = async ({ channelId, message }) => {
    console.log('message', message)
    console.log('channelId', channelId)
    try {
        await database().ref(`/Channels/${channelId}`).update({
            lastMessage: message,
            last_message_time: new Date().getTime(),
        })
        // console.log('updatedLastMessage')
        return true
    }
    catch (error) {
        console.log('error while updating last message', error);
    }
}

export default { getFbSitterDetail, getChannel, sendUnreadCount, getUnreadCount, memberDetail, watchTyping, watchTyping, sendNotification, hideMessage, deleteMessage, updateLastMessage };