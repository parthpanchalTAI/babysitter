import React, { useEffect, useState } from "react";
import database from "@react-native-firebase/database";
import { useSelector } from "react-redux";

const useGetMessages = ({
    channelId, fromCreateChannel
}) => {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)

    const { fbUid } = useSelector((state) => state.whiteLists);

    useEffect(() => {
        if (channelId) {
            let ref = database().ref('/Messages').child(channelId)
            const onValueChange = ref.limitToLast(1).on('child_added', (snapshot) => {
                // console.log('chat message from event: ', snapshot.val());
                // let messages = []
                if (snapshot.exists()) {
                    let item = snapshot.val()
                    // console.log('messages a===>', messages)
                    setMessages((prev) => {
                        let isAvailable = prev.some((item) => item.messageId == snapshot.key)
                        console.log('isAvailable', isAvailable)
                        if (isAvailable) {
                            return [...prev]
                        } else {
                            return [...prev, { ...item }]
                        }
                    })
                }
            });
            const onValueChildRemove = database().ref('/Messages').child(channelId).on('child_removed', (snapshot) => {
                // console.log('chat message remove from event: ', snapshot.key);

                setMessages((prev) => {
                    const message = prev.filter((item) => item.messageId != snapshot.key)
                    return message
                })

            });

            return () => {
                console.log('remove node')
                ref.off('child_added', onValueChange);
                ref.off('child_removed', onValueChildRemove)
                setMessages([])
            }
        }
    }, [channelId])

    useEffect(() => {
        if (channelId) {
            getMessages()
        }
    }, [channelId])

    const getMessages = async () => {
        setLoading(fromCreateChannel ? false : true)
        const snapShot = await database().ref(`/Messages/${channelId}`).once('value')
        if (snapShot.exists()) {
            let messages = []
            snapShot.forEach((snapShot) => {
                var item = snapShot.val()
                if (item.hideMessage_uid != fbUid) {
                    messages.push(item)
                }
            })
            setLoading(false)
            setMessages(messages)
        }
        setLoading(false)
    }

    const setMessageHandler = (val) => {
        setMessages(val)
    }

    return { messages, loading, setMessageHandler }
}

export default useGetMessages;