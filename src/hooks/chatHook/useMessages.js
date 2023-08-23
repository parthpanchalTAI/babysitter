import React, { useEffect, useState } from "react";
import database from "@react-native-firebase/database";
import { useSelector } from "react-redux";
import chat from "../../utils/chat";

const useMessages = ({ channelId, op_user }) => {
    const { user, fbUid } = useSelector((state) => state.whiteLists);
    const [message, setMessage] = useState('')

    const [count, setCount] = useState(0);
    const [op_isChatConnected, setOpChatConnected] = useState(false);

    let user_name = user?.first_name + ' ' + user?.last_name || '';

    useEffect(() => {
        if (channelId) {
            database().ref(`/Channels/${channelId}/members/${op_user?.uid}`).on('value', snapShot => {
                console.log('get opponent chat state==> ', snapShot.val())
                if (snapShot.exists()) {
                    let chatDetail = snapShot.val()
                    setCount(chatDetail?.unReadCount)
                    setOpChatConnected(chatDetail?.chatConnect)
                }
            })
        }
    }, [channelId, op_user]);

    const updateLastMessage = async (channelId) => {
        await database().ref(`/Channels/${channelId}`).update({
            lastMessage: message,
            last_message_time: new Date().getTime(),
        })
        if (!op_isChatConnected) {
            setCount((prev) => prev + 1)
            await chat.sendUnreadCount({ channelId, uid: op_user?.uid, count: count + 1 })
            // return;
            await chat.sendNotification({ device_token: op_user?.device_token, name: user_name, message })
        }
    }

    const sendMessage = async (channelId, receiver_uid, isFirstMessage) => {
        const newReference = database().ref(`/Messages/${channelId}`).push();
        // console.log('Auto generated key: ', newReference.key);
        setMessage('');
        await newReference.set({
            messageId: newReference.key,
            message: message,
            created_at: new Date().getTime(),
            sender_uid: fbUid,
            receiver_uid: receiver_uid,
        })
        // await chat.watchTyping({ channelId, uid: user?.uid, typing: false })
        if (!isFirstMessage) {
            await updateLastMessage(channelId)
        } else {
            // return;
            await chat.sendNotification({ device_token: op_user?.device_token, name: user_name, message })
        }
    }

    const changeMessageText = async (val) => {
        setMessage(val)
        // await chat.watchTyping({ channelId, uid: user?.uid, typing: val.length > 1 ? true : false })
    }
    return { message, sendMessage, changeMessageText }
}

export default useMessages;