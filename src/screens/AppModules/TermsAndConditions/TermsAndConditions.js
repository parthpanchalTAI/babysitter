import React, { useEffect, useLayoutEffect, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import Container from "../../../components/Container";
import Img from "../../../components/Img";
import { images } from "../../../assets/Images";
import { fonts } from "../../../assets/Fonts/fonts";
import Label from "../../../components/Label";
import { useNavigation } from "@react-navigation/core";
import { screenHeight, screenWidth, vs } from "../../../utils/styleUtils";
import { terms_conditionsApi } from "../../../features/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import MainContainer from "../../../components/MainContainer";
import Toast from 'react-native-simple-toast';

const TermsAndConditions = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const [terms, setTerms] = useState({});
    const [isRefreshing, setIsRefreshing] = useState(false);

    const { loading: loading } = useSelector((state) => state.account.terms_conditions);

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => {
                return renderHeader();
            }
        });
    }, []);

    const renderHeader = () => {
        return (
            <Container onPress={() => navigation.goBack()} containerStyle={{ backgroundColor: 'white' }} mpContainer={{ pv: 10 }}>
                <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Img
                        imgSrc={images.back_img}
                        mpImage={{ mt: 45, mh: 15 }}
                        imgStyle={{
                            width: 20,
                            height: 20,
                            resizeMode: 'contain'
                        }}
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
            Toast.show(response?.message, Toast.SHORT)
            setTerms(response?.data);
            setIsRefreshing(false)
        } else {
            Toast.show(response?.message, Toast.SHORT)
            setIsRefreshing(false);
        }
    }

    return (
        <MainContainer absoluteLoading={loading}>
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
                            colors={['#F27289']}
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
                    {/* {isLoading && <ActivityIndicator />} */}
                </ScrollView>
            </Container>
        </MainContainer>
    )
}

export default TermsAndConditions;