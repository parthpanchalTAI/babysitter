import React, { useCallback, useMemo, useState } from "react";
import Container from "../../components/Container";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Label from "../../components/Label";
import { Portal } from "react-native-portalize";
import BottomSheet, { BottomSheetBackdrop, BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet'
import { fonts } from "../../assets/Fonts/fonts";
import { StyleSheet ,View } from "react-native";
import CustomRadioButton from "../../components/CustomRadioButton";

const GenderModal = ({
    modalizeRef,
    selectedGender,
    setSelectedGender
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

    const handleGenderChange = (gender) => {
        modalizeRef?.current?.close()
        setSelectedGender(gender);
    };

    const renderComponents = () => {
        return (
            <View style={styles.container}>
                <CustomRadioButton
                    label="Male"
                    selected={selectedGender === 'Male'}
                    onPress={() => handleGenderChange('Male')}
                />
                <CustomRadioButton
                    label="Female"
                    selected={selectedGender === 'Female'}
                    onPress={() => handleGenderChange('Female')}
                />
            </View>
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

export default GenderModal;