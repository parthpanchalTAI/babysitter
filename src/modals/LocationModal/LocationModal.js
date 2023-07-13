import React, { useCallback, useMemo } from "react";
import Container from "../../components/Container";
import Label from "../../components/Label";
import { fonts } from "../../assets/Fonts/fonts";
import { Portal } from "react-native-portalize";
import BottomSheet, { BottomSheetBackdrop, BottomSheetModalProvider, BottomSheetModal, BottomSheetFlatList } from '@gorhom/bottom-sheet'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from "react-native";
import { colors } from "../../assets/Colors/colors";
import Btn from "../../components/Btn";

const LocationModal = ({
    modalizeRef
}) => {

    const snapPoints = useMemo(() => ['45%'], []);

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
                >Location</Label>
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

    const renderContainer = () => {
        return (
            <Container mpContainer={{ mh: 15, mt: 15 }}>
                <Container
                    height={50}
                    containerStyle={{
                        borderWidth: 1,
                        borderColor: '#f2f2f2',
                        backgroundColor: '#f2f2f2',
                        justifyContent: 'center',
                        borderRadius: 5
                    }}>
                    <Container mpContainer={{ mh: 20 }} containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Label labelSize={16} style={{ fontFamily: fonts.regular }}>Country</Label>
                        <Ionicons
                            name='chevron-down'
                            size={25}
                            color='black'
                        />
                    </Container>
                </Container>

                <Container
                    height={50}
                    mpContainer={{ mt: 15 }}
                    containerStyle={{
                        borderWidth: 1,
                        borderColor: '#f2f2f2',
                        backgroundColor: '#f2f2f2',
                        justifyContent: 'center',
                        borderRadius: 5
                    }}>
                    <Container mpContainer={{ mh: 20 }} containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Label labelSize={16} style={{ fontFamily: fonts.regular }}>City</Label>
                        <Ionicons
                            name='chevron-down'
                            size={25}
                            color='black'
                        />
                    </Container>
                </Container>

                <Btn
                    title='Save'
                    btnStyle={styles.btn_style}
                    btnHeight={50}
                    mpBtn={{ mt: 25 }}
                    textColor={'white'}
                    textSize={16}
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
                    {renderContainer()}
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </Portal>
    )
}

const styles = StyleSheet.create({
    btn_style: {
        backgroundColor: colors.light_pink,
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        width: "100%"
    }
})

export default LocationModal;