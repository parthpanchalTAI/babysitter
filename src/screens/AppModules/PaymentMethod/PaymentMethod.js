import React, { useLayoutEffect, useRef, useState } from "react";
import Container from "../../../components/Container";
import { useNavigation } from "@react-navigation/native";
import Img from "../../../components/Img";
import { images } from "../../../assets/Images";
import Label from "../../../components/Label";
import { fonts } from "../../../assets/Fonts/fonts";
import { FlatList, StyleSheet } from "react-native";
import { Arrays } from "../../../../Arrays";
import Btn from "../../../components/Btn";
import { colors } from "../../../assets/Colors/colors";
import PaymentMethodModal from "../../../modals/PaymentMethodModal/PaymentMethodModal";
import { useDispatch, useSelector } from "react-redux";
import { purchaseFeaturePlanApi } from "../../../features/accountSlice";
import MainContainer from "../../../components/MainContainer";
import Toast from 'react-native-simple-toast';

const PaymentMethod = ({
    route
}) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const paymentmethodModalRef = useRef();

    const [select, setSelect] = useState(false);

    const { featured_id } = route?.params;
    const { loading: purchaseplanLoading } = useSelector((state) => state.account.purchase_feature_plan);

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
                <Label labelSize={18} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }} mpLabel={{ mt: 45 }}>Payment Methods</Label>
            </Container>
        )
    }

    const openPaymentMethodModal = () => {
        paymentmethodModalRef?.current?.present();
    }

    const _renderPaymentMethodLists = ({ item }) => {
        return (
            <Container onPress={() => {
                if (item?.payment_method == 'Card') {
                    setSelect(item);
                    openPaymentMethodModal();
                } else {
                    setSelect(item);
                }
            }} mpContainer={{ mt: 20, mh: 20 }} height={50} containerStyle={{ justifyContent: 'center', borderWidth: 1, borderRadius: 5, borderColor: '#f2f2f2', }}>
                <Container mpContainer={{ mh: 15 }} containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Img
                            imgSrc={item?.img}
                            imgStyle={{
                                width: 25,
                                height: 25,
                                resizeMode: 'contain'
                            }}
                        />
                        <Label mpLabel={{ ml: 15 }} labelSize={16} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }}>{item?.payment_method}</Label>
                    </Container>

                    {select == item ?
                        <Img
                            imgSrc={item?.active_radio}
                            imgStyle={{
                                width: 20,
                                height: 20,
                                resizeMode: 'contain'
                            }}
                        />
                        :
                        <Img
                            imgSrc={item?.inActive_radio}
                            imgStyle={{
                                width: 20,
                                height: 20,
                                resizeMode: 'contain'
                            }}
                        />
                    }
                </Container>
            </Container>
        )
    }

    const purchaseFeaturePlanHandler = async () => {
        let formData = new FormData();
        formData.append('featured_id', featured_id);

        const response = await dispatch(purchaseFeaturePlanApi({ data: formData })).unwrap();
        if (response?.status == 'Success') {
            Toast.show(response?.message, Toast.SHORT);
            navigation.navigate('MySubscriptions', { featured_id: featured_id });
        }
    }

    return (
        <MainContainer absoluteLoading={purchaseplanLoading}>
            <Container containerStyle={{ flex: 1, backgroundColor: 'white' }}>
                <FlatList
                    data={Arrays.paymentMethodLists}
                    renderItem={_renderPaymentMethodLists}
                    keyExtractor={(_, index) => index.toString()}
                />

                <Btn
                    title='Pay'
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
                    onPress={purchaseFeaturePlanHandler}
                />

                <PaymentMethodModal modalizeRef={paymentmethodModalRef} />
            </Container>
        </MainContainer>
    )
}

const styles = StyleSheet.create({
    back_img: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
})
export default PaymentMethod;