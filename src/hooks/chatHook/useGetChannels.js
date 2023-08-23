import React, { useEffect, useState } from "react";
import database from "@react-native-firebase/database";
import { useSelector } from "react-redux";

const useGetChannels = () => {
    const [loading, setLoading] = useState(true);
    const [channelList, setChannelList] = useState([]);

    const { fbUid } = useSelector((state) => state.whiteLists);

    useEffect(() => {
        getChannels()
    }, [])

    const getChannels = () => {
        database().ref('/Channels').on('value', snapShot => {
            console.log('snapShot', snapShot.val())
            setLoading(false)
            if (snapShot.exists()) {
                // console.log('snapShot',snapShot)
                const channels = Object.values(snapShot.val()).filter((channel) => {
                    console.log('channel', channel.members)
                    return Object.keys(channel.members).includes(fbUid)
                }).sort((a, b) => b.last_message_time - a.last_message_time)

                setChannelList(channels)
            }
        })
    }

    return { loading, channelList }
}

export default useGetChannels;