import React, { useCallback, useMemo, useState } from "react";
import Container from "../../components/Container";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Label from "../../components/Label";
import { Portal } from "react-native-portalize";
import BottomSheet, { BottomSheetBackdrop, BottomSheetModalProvider, BottomSheetModal, BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { fonts } from "../../assets/Fonts/fonts";
import { Arrays } from "../../../Arrays";
import GenderLists from "../../components/ListsViews/GenderLists/GenderLists";

const GenderModal = ({
    modalizeRef,
    select,
    setSelect
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
                    style={{ fontFamily: fonts.bold, color: '#000', fontWeight: 'bold' }}
                >Gender</Label>
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


    const _renderGenderLists = ({ item }) => {

        const selectMethod = () => {
            setSelect(item.gender);
            modalizeRef?.current?.close()
        }
       
        return <GenderLists {...item} select={select == item.gender} selectMethod={selectMethod} />
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
                    <BottomSheetFlatList
                        data={Arrays.genderLists}
                        renderItem={_renderGenderLists}
                        keyExtractor={(_, index) => index.toString()}
                    />
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </Portal>
    )
}

export default GenderModal;