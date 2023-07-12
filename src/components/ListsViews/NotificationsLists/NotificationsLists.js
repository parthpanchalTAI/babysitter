import React from "react";
import Container from "../../Container";
import { Animated, StyleSheet } from "react-native";
import Label from "../../Label";
import Img from "../../Img";
import { fonts } from "../../../assets/Fonts/fonts";

const NotificationsLists = ({
    notification_desc,
    notification_desc2,
    time,
    notification_img,
    scale,
    id
}) => {
    return (
        <Animated.View style={[styles.container, { transform: [{ scale: 1 }] }]} key={id}>
            <Container containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                <Container>
                    <Label labelSize={16} style={{ fontFamily: fonts.regular }}>{notification_desc}</Label>
                    <Label labelSize={16} style={{ fontFamily: fonts.regular }}>{notification_desc2}</Label>
                    <Label mpLabel={{ mt: 5 }} style={{ fontFamily: fonts.regular }} labelSize={14}>{time}</Label>
                </Container>
                <Img
                    imgSrc={notification_img}
                    imgStyle={{
                        width: 50,
                        height: 50,
                        resizeMode: 'contain'
                    }}
                />
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