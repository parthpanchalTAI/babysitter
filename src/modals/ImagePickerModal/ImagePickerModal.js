import React from "react";
import BottomSheet, { BottomSheetBackdrop, BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Portal } from "react-native-portalize";
import { useMemo } from "react";
import { useCallback } from "react";
import Container from "../../components/Container";
import Label from "../../components/Label";
import { fonts } from "../../assets/Fonts/fonts";

const ImagePickerModal = ({
    modalizeRef,
    onDone,
    label,
    close
}) => {
    const snapPoints = useMemo(() => ['30%'], []);

    const renderHeader = () => {
        return (
            <Container mpContainer={{ mh: 15, mt: 5, mb: 5, }} containerStyle={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Label
                    labelSize={18}
                    style={{ fontFamily: fonts.semiBold }}
                >{label || 'Add a picture'}</Label>
                <Ionicons
                    name='ios-close'
                    size={30}
                    color='black'
                    style={{
                        position: 'absolute',
                        right: 10
                    }}
                    onPress={() => {
                        if (close) {
                            close();
                        } else {
                            modalizeRef?.current?.close();
                        }
                    }}
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
                        backgroundColor: 'lightgrey',
                        marginTop: 5
                    }}
                    backdropComponent={renderBackdrop}
                    enablePanDownToClose={true}
                >
                    {renderHeader()}
                    <Container containerStyle={{
                        backgroundColor: 'white',
                        height: 50,
                        borderRadius: 5,
                        flexDirection: 'row',
                        alignItems: 'center',
                        // borderBottomWidth: 1,
                        borderBottomColor: 'lightgrey'
                    }}
                        height={40}
                        mpContainer={{ mh: 20, mt: 10 }}
                        onPress={() => {
                            onDone("camera")
                        }}
                    >
                        <Ionicons
                            name='ios-camera'
                            size={24}
                            color='grey'
                            style={{ width: 30 }}
                        />
                        <Label
                            textColor='black'
                            labelSize={16}
                            mpLabel={{ ml: 20 }}
                        >{'To take a picture'}</Label>
                    </Container>

                    <Container containerStyle={{
                        backgroundColor: 'white',
                        height: 50,
                        borderRadius: 5,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                        height={40}
                        mpContainer={{ mh: 20 }}
                        onPress={() => {
                            onDone("gallery")
                        }}
                    >
                        <Ionicons
                            name="ios-image"
                            size={24}
                            color='grey'
                            style={{ width: 30 }}
                        />
                        <Label
                            textColor="black"
                            labelSize={16}
                            mpLabel={{ ml: 20 }}
                        >
                            {'Select from your photos'}
                        </Label>
                    </Container>
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </Portal>
    )
}

export default ImagePickerModal;