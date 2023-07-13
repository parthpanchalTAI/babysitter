import React, { useLayoutEffect, useState } from "react";
import Container from "../../../components/Container";
import { useNavigation } from "@react-navigation/native";
import { FlatList, StyleSheet, View } from "react-native";
import Img from "../../../components/Img";
import { images } from "../../../assets/Images";
import Label from "../../../components/Label";
import { fonts } from "../../../assets/Fonts/fonts";
import { screenHeight, screenWidth, vs } from "../../../utils/styleUtils";
import InputBox from "../../../components/InputBox";
import { colors } from "../../../assets/Colors/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FooterComponents from "../../../components/FooterComponents";
import Btn from "../../../components/Btn";
import { Arrays } from "../../../../Arrays";
import CardLists from "../../../components/ListsViews/CardLists/CardLists";

const Withdraw = () => {

    const navigation = useNavigation();
    const keyboardVerticalOffset = screenHeight * 0.15;

    const [show, setShow] = useState(false);
    const [select, setSelect] = useState(false);

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
                    <Label labelSize={16} style={{ fontFamily: fonts.regular }} mpLabel={{ mt: 45 }}>Withdraw</Label>
                </Container>
            </View>
        )
    }

    const _renderCardItems = ({ item }) => {
        return <CardLists {...item} select={select == item} selectMethod={() => setSelect(item)} />
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <KeyboardAwareScrollView contentContainerStyle={{ paddingBottom: 20 }} showsVerticalScrollIndicator={false} behavior={Platform.OS == 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={keyboardVerticalOffset}>
                <Container mpContainer={{ mh: 20 }}>
                    <Img
                        imgSrc={images.wallete_img}
                        imgStyle={{
                            width: screenWidth * 0.40,
                            height: screenHeight * 0.40,
                            resizeMode: 'contain',
                            alignSelf: 'center'
                        }}
                    />

                    {show == true ?
                        <FlatList
                            data={Arrays.cardLists}
                            renderItem={_renderCardItems}
                            keyExtractor={(_, index) => index.toString()}
                            contentContainerStyle={{
                                paddingBottom: vs(20)
                            }}
                        />
                        :
                        <InputBox
                            placeholder={''}
                            containerStyle={styles.inputStyle}
                            height={50}
                            mpContainer={{ mt: 25 }}
                            mpInput={{ ph: 20 }}
                            inputStyle={{ color: colors.Black }}
                            leftIcon={() => (<Label labelSize={16} style={{ fontFamily: fonts.regular, position: 'absolute', left: 10 }}>{'$'}</Label>)}
                        />
                    }

                </Container>
            </KeyboardAwareScrollView>

            <FooterComponents>
                <Btn
                    title={show == false ? 'Next' : 'Withdraw'}
                    btnStyle={styles.btn_style}
                    btnHeight={50}
                    mpBtn={{ mt: 25 }}
                    textColor={'white'}
                    textSize={16}
                    onPress={() => setShow(true)}
                />
            </FooterComponents>
        </View>
    )
}

const styles = StyleSheet.create({
    inputStyle: {
        backgroundColor: '#f2f2f2',
        borderColor: '#f2f2f2',
        borderWidth: 1,
        borderRadius: 8,
    },
    btn_style: {
        backgroundColor: colors.light_pink,
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        width: "95%"
    }
})

export default Withdraw;