import React from "react";
import Container from "../../Container";
import { screenHeight } from "../../../utils/styleUtils";
import Img from "../../Img";
import Label from "../../Label";
import { fonts } from "../../../assets/Fonts/fonts";

const FeaturePlanLists = ({
    select,
    selectPlan,
    plan_days,
    plan_price,
    active_radio,
    inActive_radio
}) => {
    return (
        <Container onPress={selectPlan} height={50} containerStyle={{ justifyContent: 'center', borderWidth: 1, borderColor: '#f2f2f2', borderRadius: 5 }} mpContainer={{ mt: 15 }}>
            <Container mpContainer={{ mh: 10 }} containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                    {select ?
                        <Img
                            imgSrc={active_radio}
                            imgStyle={{
                                width: 20,
                                height: 20,
                                resizeMode: 'contain'
                            }}
                        />
                        :
                        <Img
                            imgSrc={inActive_radio}
                            imgStyle={{
                                width: 20,
                                height: 20,
                                resizeMode: 'contain'
                            }}
                        />
                    }
                    <Label mpLabel={{ ml: 20 }} labelSize={16} style={{ fontFamily: fonts.regular }}>{plan_days}</Label>
                </Container>

                <Label labelSize={16} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }}>{plan_price}</Label>
            </Container>
        </Container>
    )
}

export default FeaturePlanLists;