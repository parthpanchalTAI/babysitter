import { useEffect, useRef, useState } from "react";
import database from "@react-native-firebase/database";
import { useSelector } from "react-redux";
import { AppState } from "react-native";

const useChat = ({
    channelId, uid
}) => {
    const [op_user, set_op_user] = useState(null);
    const appState = useRef(AppState.currentState);

    const { fbUid } = useSelector((state) => state.whiteLists);

    useEffect(() => {
        getSitterDetail();
    },[uid]);

    const getSitterDetail = () => {
        database().ref(`/User/${uid}`).on('value', snapShot => {
            // const channel = snapShot.val()
            set_op_user(snapShot.val())
        })
    }

    useEffect(() => {
        if (channelId) {
            const reference = database().ref(`/Channels/${channelId}/members/${fbUid}`);
            reference.update({
                chatConnect: true,
                unReadCount: 0,
            }).then(() => console.log('My Chat connected.'));

            return () => {
                reference.update({
                    chatConnect: false,
                    typing: false
                }).then(() => console.log('My Chat Disconnected.'));
            };
        }
    }, [channelId]);

    useEffect(() => {
        if (channelId) {
            const reference = database().ref(`/Channels/${channelId}/members/${fbUid}`);
            const subscription = AppState.addEventListener("change", nextAppState => {
                appState.current = nextAppState;
                if (appState.current.match(/inactive|background/)) {
                    reference.update({
                        chatConnect: false,
                        typing: false
                    }).then(() => console.log('My Chat Disconnected.'));

                } else {
                    reference.update({
                        chatConnect: true,
                        unReadCount: 0
                    }).then(() => console.log('My Chat connected.'));
                }
            });
            return () => {
                subscription.remove();
            };
        }
    }, [channelId]);

    return { op_user }
}

export default useChat;