import React, { useCallback, useMemo, useState } from "react";
import Container from "../../components/Container";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Label from "../../components/Label";
import { Portal } from "react-native-portalize";
import BottomSheet, { BottomSheetBackdrop, BottomSheetModalProvider, BottomSheetModal, BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { fonts } from "../../assets/Fonts/fonts";
import { StyleSheet } from "react-native";
import CustomRadioButton from "../../components/CustomRadioButton";
import { Arrays } from "../../../Arrays";

const ExperienceModal = ({
    modalizeRef,
    selectExp,
    setSelectExp
}) => {

    const snapPoints = useMemo(() => ['42%'], []);

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
                >Select your experience</Label>
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

    const handleExperienceChange = (name) => {
        modalizeRef?.current?.close()
        setSelectExp(name);
    };

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
                        data={Arrays.experienceLists}
                        keyExtractor={(_, id) => id.toString()}
                        renderItem={({ item }) => {
                            return (
                                <CustomRadioButton
                                    label={item.name}
                                    selected={selectExp === item.name}
                                    onPress={() => handleExperienceChange(item.name)}
                                />
                            )
                        }}
                    />
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

export default ExperienceModal;