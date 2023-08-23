import database from '@react-native-firebase/database';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';

const useChannel = () => {
    const { user } = useSelector((state) => state.whiteLists);

    const getChannel = async (otherUid) => {
        try {
            const snapShot = await database().ref('/Channels').once('value')
            if (snapShot.val()) {
                const channels = Object.values(snapShot.val()).find((channel) => {
                    // return Object.keys(channel.members).find((uid)=>uid == user?.uid)
                    return Object.keys(channel.members).includes(otherUid) && Object.keys(channel.members).includes(user?.uid)
                })
                // console.log('channels', channels)
                return channels || null
            }
            return null
        }
        catch (error) {
            console.log('error', error)
        }
    }

    const createChannel = async ({ members, property_detail, lastMessage, last_message_time }) => {
        const newReference = database().ref('/Channels').push();
        try {
            await newReference.set({
                property_detail,
                members,
                lastMessage,
                last_message_time,
                channelId: newReference.key
            })
            return { channelId: newReference.key };
        } catch (err) {
            console.log('err while creating channel', err)
            Alert.alert("Error", 'Something went wrong')
            return null
        }
    }

    return { createChannel, getChannel }
}

export default useChannel;