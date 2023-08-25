import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { imageBaseUrl } from "../../../utils/apiEndPoints";
import { fonts } from "../../../assets/Fonts/fonts";
import { images } from "../../../assets/Images";
import Container from "../../Container";
import Img from "../../Img";
import Label from "../../Label";
import functions from "../../../utils/func";

const ChatLists = (props) => {
    const { lastMessage, last_message_time, } = props;
    const { fbUid } = useSelector((state) => state.whiteLists);
    const navigation = useNavigation();

    let uid = Object.keys(props.members).find((uid) => uid != fbUid);
    const user = props.members[uid];
    const { unReadCount } = props.members[fbUid];

    const onSelectChannel = () => {
        navigation.navigate('Conversations', {
            channelId: props?.channelId,
            op_uid: user?.uid,
        })
    }

    return (
        <Container
            containerStyle={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: '#f2f2f2',
                borderRadius: 5,
                elevation: 1
            }}
            mpContainer={{ ph: 10, pv: 10,mt: 15 }}
            onPress={onSelectChannel}
        >
            <Container containerStyle={styles.buttonstyle}>
                {
                    user?.profile_image ?
                        <Img
                            imgStyle={{
                                backgroundColor: 'white',
                                borderWidth: 1,
                                borderRadius: 60
                            }}
                            imgSrc={{ uri: `${imageBaseUrl}${user?.profile_image}` }}
                            width={45}
                            height={45}
                        />
                        : <Container
                            containerStyle={{
                                backgroundColor: 'white',
                                width: 45,
                                height: 45,
                                borderRadius: 60,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderWidth: 1,
                                borderColor: 'lightgrey'
                            }}
                        >
                            <Img
                                imgStyle={{
                                    backgroundColor: 'white',
                                    borderWidth: 1,
                                    borderRadius: 60
                                }}
                                imgSrc={images.profile_img}
                                width={45} height={45}
                            />
                        </Container>
                }
                <Container
                    containerStyle={{ flex: 0.85 }}
                    mpContainer={{ mh: 10 }}
                >
                    <Label
                        textColor='black'
                        style={{ fontFamily: fonts.regular }}
                        labelSize={14}
                    >{user?.name}</Label>
                    <Label
                        textColor='black'
                        labelSize={12}
                        numberOfLines={1}
                        style={{ fontFamily: unReadCount ? fonts.bold : fonts.regular }}
                    >{lastMessage}</Label>
                </Container>
                <Label
                    textColor='grey'
                    labelSize={12}
                    mpLabel={{ mt: 2 }}
                    style={{
                        position: "absolute",
                        right: 10,
                        top: -5
                    }}
                >{functions.getLastMessageDateString(last_message_time)}</Label>
            </Container>
            {
                unReadCount == 0 ? null :
                    <Container
                        containerStyle={{
                            backgroundColor: '#3fba34',
                            borderWidth: 2,
                            borderColor: 'white',
                            justifyContent: "center",
                            alignItems: 'center',
                            borderRadius: 22,
                            position: 'absolute',
                            right: 15,
                            bottom: 10
                        }}
                        width={25} height={25}
                    >
                        <Label
                            labelSize={14}
                            textColor="white"
                            style={{
                                fontFamily: fonts.semiBold
                            }}
                        >{unReadCount}</Label>
                    </Container>
            }
        </Container>
    )
}

const styles = StyleSheet.create({
    buttonstyle: {
        marginHorizontal: 2,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageestyle: {
        borderRadius: 50,
    },
    nametextstyle: {
        color: '#000'
    },
    messagetextstyle: {
        fontSize: 18
    },
    textcontainer: {
        flex: 1,
    }

});

export default ChatLists;