import React, { useCallback, useMemo, useState } from "react";
import Container from "../../components/Container";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Label from "../../components/Label";
import { Portal } from "react-native-portalize";
import BottomSheet, { BottomSheetBackdrop, BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet'
import { fonts } from "../../assets/Fonts/fonts";
import { ScrollView, StyleSheet, View } from "react-native";
import CustomRadioButton from "../../components/CustomRadioButton";

const ExperienceModal = ({
    modalizeRef,
    selectExp,
    setSelectExp
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

    const renderComponents = () => {
        return (
            <View style={styles.container}>
                <CustomRadioButton
                    label={"Infant"}
                    selected={selectExp === "Infant"}
                    onPress={() => handleExperienceChange("Infant")}
                />

                <CustomRadioButton
                    label={"Toddler"}
                    selected={selectExp === "Toddler"}
                    onPress={() => handleExperienceChange("Toddler")}
                />

                <CustomRadioButton
                    label={"Preschool"}
                    selected={selectExp === "Preschool"}
                    onPress={() => handleExperienceChange("Preschool")}
                />

                <CustomRadioButton
                    label={"Pre-Kindergarten"}
                    selected={selectExp === "Pre-Kindergarten"}
                    onPress={() => handleExperienceChange("Pre-Kindergarten")}
                />

                <CustomRadioButton
                    label={"Kindergarten"}
                    selected={selectExp === "Kindergarten"}
                    onPress={() => handleExperienceChange("Kindergarten")}
                />

                <CustomRadioButton
                    label={"Elementry-Schools"}
                    selected={selectExp === "Elementry-Schools"}
                    onPress={() => handleExperienceChange("Elementry-Schools")}
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
                    <ScrollView>
                        {renderHeader()}
                        {renderComponents()}
                    </ScrollView>
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