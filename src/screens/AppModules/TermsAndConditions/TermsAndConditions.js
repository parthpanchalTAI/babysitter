import React, { useLayoutEffect } from "react";
import { View } from "react-native";
import Container from "../../../components/Container";
import Img from "../../../components/Img";
import { images } from "../../../assets/Images";
import { fonts } from "../../../assets/Fonts/fonts";
import Label from "../../../components/Label";
import { useNavigation } from "@react-navigation/core";
import { screenHeight, screenWidth } from "../../../utils/styleUtils";

const TermsAndConditions = () => {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => {
                return renderHeader();
            }
        });
    }, []);

    const renderHeader = () => {
        return (
            <View style={{ backgroundColor: 'white' }}>
                <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Img
                        imgSrc={images.back_img}
                        mpImage={{ mt: 45, mh: 15 }}
                        imgStyle={{
                            width: 20,
                            height: 20,
                            resizeMode: 'contain'
                        }}
                        onPress={() => navigation.goBack()}
                    />
                    <Label labelSize={18} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }} mpLabel={{ mt: 45 }}>Terms & Conditions</Label>
                </Container>
            </View>
        )
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <Container mpContainer={{ mh: 20 }}>
                <Img
                    imgSrc={images.logo}
                    imgStyle={{
                        width: screenWidth * 0.30,
                        height: screenHeight * 0.25,
                        resizeMode: 'contain',
                    }}
                />
                <Label labelSize={35} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }}>Terms and conditions</Label>
                <Label mpLabel={{mt: 15}} labelSize={16} style={{ fontFamily: fonts.regular }}>Lorem ipsum is simply dummy text printing.</Label>
                
                <Label mpLabel={{mt: 15}} labelSize={16} style={{ fontFamily: fonts.regular }}>1. Lorem ipsum is simply dummy text printing.</Label>
                <Label mpLabel={{mt: 5}} labelSize={16} style={{ fontFamily: fonts.regular }}>2. Lorem ipsum is simply dummy text printing.</Label>
                <Label mpLabel={{mt: 5}} labelSize={16} style={{ fontFamily: fonts.regular }}>3. Lorem ipsum is simply dummy text printing.</Label>
                <Label mpLabel={{mt: 5}} labelSize={16} style={{ fontFamily: fonts.regular }}>4. Lorem ipsum is simply dummy text printing.</Label>
            </Container>
        </View>
    )
}

export default TermsAndConditions;