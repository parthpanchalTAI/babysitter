import React from "react";
import Container from "../../Container";
import { Animated, StyleSheet } from "react-native";
import Label from "../../Label";
import Img from "../../Img";
import { fonts } from "../../../assets/Fonts/fonts";
import { imageBaseUrl } from "../../../utils/apiEndPoints";
import { hs, vs } from "../../../utils/styleUtils";

const NotificationsLists = ({
    id,
    content,
    created_at,
    user_details,
}) => {

    const DateFormat = new Date(created_at).toDateString();
    const TimeFormat = new Date(created_at).toLocaleTimeString();

    return (
        <Animated.View style={[styles.container, { transform: [{ scale: 1 }] }]} key={id}>
            <Container containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Container>
                    <Label labelSize={17} style={{ fontFamily: fonts.regular }}>{content}</Label>
                    <Label mpLabel={{ mt: 5 }} style={{ fontFamily: fonts.regular }} labelSize={15}>{DateFormat}, {TimeFormat}</Label>
                </Container>
                {user_details?.profile_image ?
                    <Img
                        imgSrc={{uri: `${imageBaseUrl}${user_details?.profile_image}`}}
                        imgStyle={{
                            width: 50,
                            height: 50,
                            resizeMode: 'contain',
                            borderRadius: 100
                        }}
                    />
                    :
                    <Container containerStyle={{ borderWidth: 1, borderRadius: 100, borderColor: '#f2f2f2' }} height={vs(50)} width={hs(50)} />
                }
            </Container>
            <Container containerStyle={{ borderWidth: 1, borderColor: '#f2f2f2' }} mpContainer={{ mt: 15 }} />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15
    }
})

export default NotificationsLists;