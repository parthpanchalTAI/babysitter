import React from "react";
import Container from "../../Container";
import Label from "../../Label";
import Img from "../../Img";
import { fonts } from "../../../assets/Fonts/fonts";

const SearchNameLists = ({
    name,
    profile_img
}) => {
    return (
        <Container mpContainer={{ mt: 20, mh: 20 }}>
            <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                <Img
                    imgSrc={profile_img}
                    imgStyle={{
                        width: 50,
                        height: 50,
                        resizeMode: 'contain'
                    }}
                />
                <Label mpLabel={{ml: 15}} labelSize={16} style={{ fontFamily: fonts.regular }}>{name}</Label>
            </Container>
        </Container>
    )
}

export default SearchNameLists;