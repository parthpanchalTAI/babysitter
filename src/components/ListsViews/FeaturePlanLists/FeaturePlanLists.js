import React from "react";
import Container from "../../Container";
import Img from "../../Img";
import Label from "../../Label";
import { fonts } from "../../../assets/Fonts/fonts";
import { images } from "../../../assets/Images";

const FeaturePlanLists = ({
    id,
    select,
    selectPlan,
    price,
    validity,
    duration,
}) => {
    return (
        <Container onPress={selectPlan} height={50} containerStyle={{ justifyContent: 'center', borderWidth: 1, borderColor: '#f2f2f2', borderRadius: 5 }} mpContainer={{ mt: 15 }}>
            <Container mpContainer={{ mh: 10 }} containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                    {select ?
                        <Img
                            imgSrc={images.feature_activeRadio}
                            imgStyle={{
                                width: 20,
                                height: 20,
                                resizeMode: 'contain'
                            }}
                        />
                        :
                        <Img
                            imgSrc={images.feature_inActiveRadio}
                            imgStyle={{
                                width: 20,
                                height: 20,
                                resizeMode: 'contain'
                            }}
                        />
                    }
                    <Label mpLabel={{ ml: 20 }} labelSize={16} style={{ fontFamily: fonts.regular }}>{validity} {duration}</Label>
                </Container>

                <Label labelSize={16} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }}>${price}</Label>
            </Container>
        </Container>
    )
}

export default FeaturePlanLists;