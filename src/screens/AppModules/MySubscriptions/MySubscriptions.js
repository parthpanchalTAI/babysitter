import React, { useLayoutEffect } from "react";
import Container from "../../../components/Container";
import { useNavigation } from "@react-navigation/native";
import Img from "../../../components/Img";
import { images } from "../../../assets/Images";
import { fonts } from "../../../assets/Fonts/fonts";
import Label from "../../../components/Label";
import { FlatList, StyleSheet } from "react-native";
import { Arrays } from "../../../../Arrays";
import { screenHeight, screenWidth, vs } from "../../../utils/styleUtils";
import { colors } from "../../../assets/Colors/colors";
import Btn from "../../../components/Btn";

const MySubscriptions = () => {

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
            <Container onPress={() => navigation.goBack()} containerStyle={{ backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                <Img
                    imgSrc={images.back_img}
                    mpImage={{ mt: 45, mh: 15 }}
                    imgStyle={styles.back_img}
                />
                <Label labelSize={18} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }} mpLabel={{ mt: 45 }}>My Subscriptions</Label>
            </Container>
        )
    }

    const _renderMySubscriptionLists = ({ item }) => {
        return (
            <Container height={screenHeight * 0.16} mpContainer={{ mt: 20, mh: 20 }} containerStyle={{ justifyContent: 'center', borderWidth: 1, borderColor: '#f2f2f2', borderRadius: 5 }}>
                <Container containerStyle={{ flexDirection: 'row' }}>
                    <Container mpContainer={{ ml: 11 }} height={screenHeight * 0.13} width={screenWidth * 0.28} containerStyle={{ justifyContent: 'center', borderWidth: 1, backgroundColor: '#e1e3e1', borderRadius: 5, borderColor: '#e1e3e1' }}>
                        <Img
                            imgSrc={item?.subs_img}
                            imgStyle={{
                                width: 50,
                                height: 50,
                                resizeMode: 'contain',
                                alignSelf: 'center'
                            }}
                        />
                    </Container>

                    <Container mpContainer={{ mh: 20 }}>
                        <Label mpLabel={{ mt: 5 }} labelSize={20} style={{ fontFamily: fonts.regular }}>{item?.feature_plan}</Label>
                        <Label mpLabel={{ mt: 5 }} labelSize={14} style={{ fontFamily: fonts.regular }}>Expires on : {item?.expired_on}</Label>
                        <Label mpLabel={{ mt: 5 }} labelSize={14} style={{ fontFamily: fonts.regular }}>Price : {item?.price}</Label>
                        <Label mpLabel={{ mt: 5 }} labelSize={14} style={{ fontFamily: fonts.regular }}>Status : {item?.status}</Label>
                    </Container>
                </Container>
            </Container>
        )
    }

    return (
        <Container containerStyle={{ flex: 1, backgroundColor: 'white' }}>
            <FlatList
                data={Arrays.mysubscriptionLists}
                renderItem={_renderMySubscriptionLists}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={{ paddingBottom: vs(20) }}
            />

            <Btn
                title='Upgrade plan'
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

export default MySubscriptions;