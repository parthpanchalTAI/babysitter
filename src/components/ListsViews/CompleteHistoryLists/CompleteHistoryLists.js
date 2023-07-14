import React from "react";
import Container from "../../Container";
import Img from "../../Img";
import Label from "../../Label";
import { fonts } from "../../../assets/Fonts/fonts";
import { colors } from "../../../assets/Colors/colors";
import { images } from "../../../assets/Images";
import { useNavigation } from "@react-navigation/native";

const CompleteHistoryLists = ({
    name,
    profile_pic,
    hourly_rate,
    date,
    time,
    rate
}) => {

    return (
        <Container containerStyle={{ borderWidth: 0, borderRadius: 10, borderColor: '#f2f2f2' }} mpContainer={{ mt: 15 }}>
            <Container containerStyle={{ flexDirection: 'row', justifyContent: 'space-between' }} mpContainer={{ mh: 15 }}>
                <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Img
                        imgSrc={profile_pic}
                        imgStyle={{
                            width: 80,
                            height: 80,
                            resizeMode: 'contain'
                        }}
                    />
                    <Container mpContainer={{ mh: 10, mb: 5 }}>
                        <Label labelSize={16} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }}>{name}</Label>
                        <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }} mpContainer={{ mt: 5 }}>
                            <Img
                                imgSrc={images.calender_img}
                                imgStyle={{
                                    width: 18,
                                    height: 18,
                                    resizeMode: 'contain',
                                    tintColor: colors.Input_Gray_text
                                }}
                                mpImage={{ mt: 2 }}
                            />
                            <Label labelSize={14} mpLabel={{ ml: 10, mt: 2 }} style={{ fontFamily: fonts.regular, color: colors.Input_Gray_text }}>{date}</Label>
                        </Container>

                        <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }} mpContainer={{ mt: 6 }}>
                            <Img
                                imgSrc={images.time_img}
                                imgStyle={{
                                    width: 18,
                                    height: 18,
                                    resizeMode: 'contain',
                                    tintColor: colors.Input_Gray_text
                                }}
                                mpImage={{ mt: 2 }}
                            />
                            <Label labelSize={14} mpLabel={{ ml: 10, mt: 2 }} style={{ fontFamily: fonts.regular, color: colors.Input_Gray_text }}>{time}</Label>
                        </Container>
                    </Container>
                </Container>
            </Container>
        </Container>
    )
}

export default CompleteHistoryLists;