import React from "react";
import Container from "../../Container";
import Img from "../../Img";
import Label from "../../Label";
import { fonts } from "../../../assets/Fonts/fonts";

const MyWalletLists = ({
    profile,
    name,
    card_num,
    transaction
}) => {
    return (
        <Container mpContainer={{ mt: 15 }}>
            <Container containerStyle={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Container containerStyle={{ flexDirection: 'row' }}>
                    <Img
                        imgSrc={profile}
                        imgStyle={{
                            width: 60,
                            height: 60,
                            resizeMode: 'contain'
                        }}
                    />

                    <Container>
                        <Label mpLabel={{ ml: 15, mt: 5 }} labelSize={16} style={{ fontFamily: fonts.regular }}>{name}</Label>
                        <Label mpLabel={{ ml: 15, mt: 5 }} labelSize={14} style={{ fontFamily: fonts.regular }}>{card_num}</Label>
                    </Container>
                </Container>
                <Label mpLabel={{ mt: 5 }} labelSize={16} style={{ fontFamily: fonts.regular, color: '#22bf2d' }}>{transaction}</Label>
            </Container>
        </Container>
    )
}

export default MyWalletLists;