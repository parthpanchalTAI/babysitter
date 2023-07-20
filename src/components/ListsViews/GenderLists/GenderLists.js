import React from "react";
import Container from "../../Container";
import Label from "../../Label";
import { fonts } from "../../../assets/Fonts/fonts";
import Img from "../../Img";
import { images } from "../../../assets/Images";
import { useSelector } from "react-redux";

const GenderLists = ({
    gender,
    id,
    select,
    selectMethod,
    selected
}) => {

    const { user } = useSelector((state) => state?.whiteLists);

    return (
        <Container onPress={selectMethod} key={id} mpContainer={{ mh: 20, mt: 20 }} containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Label labelSize={16} style={{ fontFamily: fonts.regular }}>{gender}</Label>
            {user?.gender == 'Female' ?
                <Img
                    imgSrc={images.radio_select}
                    imgStyle={{
                        width: 20,
                        height: 20,
                        resizeMode: 'contain',
                    }}
                />
                :
                <Img
                    imgSrc={images.radio_unselect}
                    imgStyle={{
                        width: 20,
                        height: 20,
                        resizeMode: 'contain',
                    }}
                />
            }
        </Container>
    )
}

export default GenderLists;