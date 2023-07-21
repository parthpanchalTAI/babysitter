import React, { useLayoutEffect } from "react";
import Container from "../../../components/Container";
import { useNavigation } from "@react-navigation/native";
import { images } from "../../../assets/Images";
import { FlatList, StyleSheet, View } from "react-native";
import Img from "../../../components/Img";
import Label from "../../../components/Label";
import { fonts } from "../../../assets/Fonts/fonts";
import { screenHeight, vs } from "../../../utils/styleUtils";
import { colors } from "../../../assets/Colors/colors";
import MyWalletLists from "../../../components/ListsViews/MyWalletLists/MyWalletLists";
import { Arrays } from "../../../../Arrays";

const MyWallet = () => {

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
                <Label labelSize={18} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }} mpLabel={{ mt: 45 }}>My wallet</Label>
            </Container>
        )
    }

    const _renderWalletItems = ({ item }) => {
        return <MyWalletLists {...item} />
    }

    return (
        <Container containerStyle={{ flex: 1, backgroundColor: 'white' }}>
            <Container mpContainer={{ mt: 20, mh: 20 }}>
                <Container containerStyle={{ borderWidth: 1, borderRadius: 20, borderColor: colors.light_pink, backgroundColor: colors.light_pink }} height={screenHeight * 0.20}>
                    <Container mpContainer={{ ph: 20, mt: 20 }} containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Label labelSize={16} style={{ fontFamily: fonts.regular, color: 'white' }}>Total Wallet Balance</Label>

                        <Container onPress={() => navigation.navigate('Withdraw')} containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Label labelSize={16} style={{ fontFamily: fonts.regular, color: 'white' }}>Withdraw</Label>
                            <Img
                                imgSrc={images.right_img}
                                imgStyle={{
                                    width: 15,
                                    height: 15,
                                    resizeMode: 'contain',
                                    tintColor: 'white'
                                }}
                                mpImage={{ ml: 10 }}
                            />
                        </Container>
                    </Container>

                    <Label mpLabel={{ mt: 25, ph: 20 }} labelSize={30} style={{ fontFamily: fonts.regular, color: 'white' }}>{'$1024.00'}</Label>
                </Container>
            </Container>
            {/* 
            <Container
                containerStyle={{
                    backgroundColor: "white",
                    elevation: 10,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    paddingBottom: vs(20),
                    position: 'relative',
                    top: 10,
                    bottom: 0,
                    left: 0,
                    right: 0,
                }}> */}
            {/* <Container mpContainer={{ mt: 20, mh: 20 }}> */}

            <Label labelSize={16} mpLabel={{ mh: 20, mt: 20 }} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }}>Transactions</Label>

            <FlatList
                data={Arrays.myWalletList}
                renderItem={_renderWalletItems}
                keyExtractor={(_, index) => index.toString()}
                contentContainerStyle={{
                    paddingBottom: vs(20)
                }}
                showsVerticalScrollIndicator={false}
                style={{
                    marginTop: 10,
                    marginHorizontal: 20
                }}
            />
            {/* </Container> */}
            {/* </Container> */}
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

export default MyWallet;