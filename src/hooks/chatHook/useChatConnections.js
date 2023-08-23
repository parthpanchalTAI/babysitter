import { useEffect } from "react";
import { useSelector } from "react-redux";
import database from "@react-native-firebase/database";

const useChatConnections = (channelId) => {
    const { user } = useSelector((state) => state.whiteLists);

    useEffect(() => {
        if (channelId) {
            const reference = database().ref(`/Channels/${channelId}/members/${user.uid}`);
            reference.update({
                chatConnect: true,
                unReadCount: 0
            }).then(() => console.log('My Chat connected.'));

            return () => {
                reference.update({
                    chatConnect: false
                }).then(() => console.log('My Chat Disconnected.'));
            };
        }
    }, [channelId]);

    return null
}

export default useChatConnections;