import React, { useLayoutEffect, useState } from "react";
import Container from "../../../components/Container";
import { useNavigation } from "@react-navigation/native";
import Img from "../../../components/Img";
import { images } from "../../../assets/Images";
import { FlatList, StyleSheet } from "react-native";
import Label from "../../../components/Label";
import { fonts } from "../../../assets/Fonts/fonts";
import { Arrays } from "../../../../Arrays";
import Btn from "../../../components/Btn";
import { colors } from "../../../assets/Colors/colors";
import { hs, screenHeight, vs } from "../../../utils/styleUtils";
import FeaturePlanLists from "../../../components/ListsViews/FeaturePlanLists/FeaturePlanLists";

const Featured = () => {

    const navigation = useNavigation();
    const [selectfeaturePlan, setSelectFeaturePlan] = useState(false);

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
                <Img
                    imgSrc={images.back_img}
                    mpImage={{ mt: 45, mh: 15 }}
                    imgStyle={styles.back_img}
                    onPress={() => navigation.goBack()}
                />
            </Container>
        )
    }

    const _renderFeaturePlanLists = ({ item }) => {
        return <FeaturePlanLists {...item} select={selectfeaturePlan == item} selectPlan={() => setSelectFeaturePlan(item)} />
    }

    return (
        <Container containerStyle={{ flex: 1, backgroundColor: 'white' }}>
            <Container mpContainer={{ mt: 25, mh: 20 }}>
                <Container height={screenHeight * 0.21} containerStyle={{ justifyContent: 'center', borderWidth: 1, borderColor: '#f2e7cb', backgroundColor: '#f2e7cb', borderRadius: 10 }}>
                    <Img
                        imgSrc={images.featured_icon}
                        imgStyle={{
                            width: hs(70),
                            height: vs(70),
                            resizeMode: 'contain',
                            alignSelf: 'center'
                        }}
                    />
                    <Label mpLabel={{ mt: 20 }} labelSize={20} style={{ fontFamily: fonts.bold, fontWeight: 'bold', alignSelf: 'center' }}>{'Reach more jobs'}</Label>
                </Container>
            </Container>

            <Label mpLabel={{ mt: 20, ml: 20 }} labelSize={22} style={{ fontWeight: 'bold', fontFamily: fonts.bold }}>Featured Ad</Label>
            
            <FlatList
                data={Arrays.featuredPlanLists}
                renderItem={_renderFeaturePlanLists}
                keyExtractor={(_, index) => index.toString()}
                scrollEnabled={true}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: vs(20) }}
                style={{ marginTop: vs(5), marginHorizontal: hs(18) }}
            />

            <Btn
                title='Next'
                btnStyle={{
                    backgroundColor: colors.light_pink,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    width: "92%"
                }}
                mpBtn={{ mb: 10 }}
                btnHeight={50}
                textColor={'white'}
                textSize={16}
                onPress={() => navigation.navigate('PaymentMethod')}
            />
        </Container>
    )
}

const styles = StyleSheet.create({
    back_img: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
})

export default Featured;