import React, { useEffect, useLayoutEffect, useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import Container from "../../../components/Container";
import Img from "../../../components/Img";
import { images } from "../../../assets/Images";
import { fonts } from "../../../assets/Fonts/fonts";
import Label from "../../../components/Label";
import { useNavigation } from "@react-navigation/core";
import { screenHeight, screenWidth, vs } from "../../../utils/styleUtils";
import { terms_conditionsApi } from "../../../features/accountSlice";
import { useDispatch } from "react-redux";

const TermsAndConditions = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [terms, setTerms] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => {
                return renderHeader();
            }
        });
    }, []);

    const renderHeader = () => {
        return (
            <Container containerStyle={{ backgroundColor: 'white' }}>
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
            </Container>
        )
    }

    const handleRefresh = () => {
        setIsRefreshing(true);
        termsAndconditionsApi();
    }

    useEffect(() => {
        termsAndconditionsApi();
    }, []);

    const termsAndconditionsApi = async () => {
        const response = await dispatch(terms_conditionsApi({})).unwrap();
        console.log("res of terms", response);

        if (response?.status == "Success") {
            setTerms(response?.description);
            setIsLoading(false);
            setIsRefreshing(false)
        } else {
            setIsLoading(false);
            setIsRefreshing(false);
        }
    }

    return (
        <Container containerStyle={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: vs(20)
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                    />
                }
            >
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
                    <Label mpLabel={{ mt: 15 }} labelSize={16} style={{ fontFamily: fonts.regular }}>{terms?.description}</Label>
                </Container>
            </ScrollView>
        </Container>
    )
}

export default TermsAndConditions;