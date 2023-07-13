import React from "react";
import Container from "../../Container";
import Img from "../../Img";
import Label from "../../Label";
import { fonts } from "../../../assets/Fonts/fonts";
import { images } from "../../../assets/Images";

const CardLists = ({
    card_img,
    card_num,
    select,
    selectMethod
}) => {
    return (
        <Container onPress={selectMethod} containerStyle={{ borderWidth: select == true ? 1 : null, justifyContent: 'center', borderRadius: 5, borderColor: '#b2b2b2' }} height={50} mpContainer={{ mt: 10 }}>
            <Container mpContainer={{ mh: 15 }} containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Img
                        imgSrc={card_img}
                        imgStyle={{
                            width: 30,
                            height: 30,
                            resizeMode: 'contain'
                        }}
                    />
                    <Label mpLabel={{ ml: 20 }} labelSize={16} style={{ fontFamily: fonts.regular }}>{card_num}</Label>
                </Container>

                {select == true ? 
                    <Img
                        imgSrc={images.selected_img}
                        imgStyle={{
                            width: 20,
                            height: 20,
                            resizeMode: 'contain'
                        }}
                    />
                : null}
            </Container>
        </Container>
    )
}

export default CardLists;