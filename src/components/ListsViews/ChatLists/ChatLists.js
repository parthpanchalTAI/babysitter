import React from "react";
import Container from "../../Container";
import Img from "../../Img";
import Label from "../../Label";
import { fonts } from "../../../assets/Fonts/fonts";
import { colors } from "../../../assets/Colors/colors";
import { useNavigation } from "@react-navigation/core";

const ChatLists = ({
    name,
    message,
    time,
    profile_pic
}) => {

    const navigation = useNavigation();

    return (
        <Container onPress={() => navigation.navigate('Conversations', { user_name: name })}>
            <Container containerStyle={{ flexDirection: 'row', justifyContent: 'space-between' }} mpContainer={{ mt: 20 }}>
                <Container containerStyle={{ flexDirection: 'row' }}>
                    <Img
                        imgSrc={profile_pic}
                        imgStyle={{
                            width: 50,
                            height: 50,
                            resizeMode: 'contain',
                        }}
                    />
                    <Container>
                        <Label mpLabel={{ ml: 15, mt: 5 }} labelSize={16} style={{ fontFamily: fonts.regular, fontWeight: 'bold' }}>{name}</Label>
                        <Label mpLabel={{ ml: 15 }} labelSize={14} style={{ fontFamily: fonts.regular }}>{message}</Label>
                    </Container>
                </Container>
                <Label labelSize={14} mpLabel={{ mt: 5 }} style={{ fontFamily: fonts.regular, color: colors.Input_Gray_text }}>{time}</Label>
            </Container>
            <Container containerStyle={{ borderWidth: 1, borderColor: '#f2f2f2' }} mpContainer={{ mt: 15 }} />
        </Container>
    )
}

export default ChatLists;