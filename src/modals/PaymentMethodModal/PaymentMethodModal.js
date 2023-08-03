import React, { useCallback, useMemo } from "react";
import Container from "../../components/Container";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Label from "../../components/Label";
import { Portal } from "react-native-portalize";
import BottomSheet, { BottomSheetBackdrop, BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet'
import { fonts } from "../../assets/Fonts/fonts";
import { ScrollView, StyleSheet } from "react-native";
import InputBox from "../../components/InputBox";
import { colors } from "../../assets/Colors/colors";
import Btn from "../../components/Btn";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { vs } from "../../utils/styleUtils";

const PaymentMethodModal = ({
    modalizeRef,
}) => {

    const snapPoints = useMemo(() => ['50%'], []);
    // const keyboardVerticalOffset = screenHeight * 0.15;

    const renderHeader = () => {
        return (
            <Container mpContainer={{ mh: 15, mt: 5, mb: 5, }} containerStyle={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Label
                    labelSize={18}
                    style={{ fontFamily: fonts.bold, color: '#000', fontWeight: 'bold' }}
                >Pay by card</Label>
                <Ionicons
                    name='ios-close'
                    size={30}
                    color='black'
                    style={{
                        position: 'absolute',
                        right: 0
                    }}
                    onPress={() => modalizeRef?.current?.close()}
                />
            </Container>
        )
    }

    const renderBackdrop = useCallback(
        props => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                opacity={0.6}
            />
        ),
        []
    )

    const renderComponents = () => {
        return (
            <ScrollView contentContainerStyle={{ paddingBottom: vs(20) }} showsVerticalScrollIndicator={false}>
                <Container mpContainer={{ mh: 15 }}>
                    <InputBox
                        placeholder={'Card Holder Name'}
                        containerStyle={{
                            backgroundColor: '#f2f2f2',
                            borderColor: '#f2f2f2',
                            borderWidth: 1,
                            borderRadius: 8,
                        }}
                        height={50}
                        mpContainer={{ mt: 15 }}
                        mpInput={{ ph: 10 }}
                        inputStyle={{ color: colors.Black }}
                    />

                    <InputBox
                        placeholder={'Card Number'}
                        containerStyle={{
                            backgroundColor: '#f2f2f2',
                            borderColor: '#f2f2f2',
                            borderWidth: 1,
                            borderRadius: 8,
                        }}
                        height={50}
                        mpContainer={{ mt: 15 }}
                        mpInput={{ ph: 10 }}
                        inputStyle={{ color: colors.Black }}
                    />

                    <Container containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Container containerStyle={{ width: '49%' }}>
                            <InputBox
                                placeholder={'Card Holder Name'}
                                containerStyle={{
                                    backgroundColor: '#f2f2f2',
                                    borderColor: '#f2f2f2',
                                    borderWidth: 1,
                                    borderRadius: 8,
                                }}
                                height={50}
                                mpContainer={{ mt: 15 }}
                                mpInput={{ ph: 10 }}
                                inputStyle={{ color: colors.Black }}
                            />
                        </Container>


                        <Container containerStyle={{ width: '49%' }}>
                            <InputBox
                                placeholder={'Card Number'}
                                containerStyle={{
                                    backgroundColor: '#f2f2f2',
                                    borderColor: '#f2f2f2',
                                    borderWidth: 1,
                                    borderRadius: 8,
                                }}
                                height={50}
                                mpContainer={{ mt: 15 }}
                                mpInput={{ ph: 10 }}
                                inputStyle={{ color: colors.Black }}
                            />
                        </Container>
                    </Container>

                    <Btn
                        title='Pay'
                        btnStyle={{
                            backgroundColor: colors.light_pink,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignSelf: 'center',
                            width: "100%"
                        }}
                        btnHeight={50}
                        mpBtn={{ mt: 35 }}
                        textColor={'white'}
                        textSize={16}
                    />
                </Container>
            </ScrollView>
        )
    }

    return (
        <Portal>
            <BottomSheetModalProvider>
                <BottomSheetModal
                    ref={modalizeRef}
                    index={0}
                    snapPoints={snapPoints}
                    handleIndicatorStyle={{
                        width: 100,
                        backgroundColor: 'white',
                        marginTop: 5
                    }}
                    backdropComponent={renderBackdrop}
                    enablePanDownToClose={true}
                >
                    {renderHeader()}
                    {renderComponents()}
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </Portal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    selectedText: {
        fontSize: 16,
        marginTop: 10,
    },
});

export default PaymentMethodModal;