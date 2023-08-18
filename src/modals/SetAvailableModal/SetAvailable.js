import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ScrollView, StyleSheet, Switch } from "react-native";
import Container from "../../components/Container";
import Label from "../../components/Label";
import { fonts } from "../../assets/Fonts/fonts";
import { Portal } from "react-native-portalize";
import BottomSheet, { BottomSheetBackdrop, BottomSheetModalProvider, BottomSheetModal } from '@gorhom/bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from "../../assets/Colors/colors";
import Btn from "../../components/Btn";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { screenWidth, vs } from "../../utils/styleUtils";
import { useDispatch } from "react-redux";
import Toast from 'react-native-simple-toast';
import { saveAvailabilityData, sitterAvailabilityApi } from "../../features/accountSlice";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SetAvailabileModal = ({
    modalizeRef,
    selectedDate
}) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const snapPoints = useMemo(() => ['50%'], []);

    const [isDayOff, setIsDayOff] = useState(false);
    const [hide, setHider] = useState(false);

    // time picker
    const [isStartTimePickerVisible, setStartTimePickerVisible] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisible] = useState(false);
    const [startTime, setStartTime] = useState([]);
    const [endTime, setEndTime] = useState([]);
    const [confirmStartTime, setConfirmStartTime] = useState('');
    const [confirmEndTime, setConfirmEndTime] = useState('');

    const toggleDayOff = () => setIsDayOff(previousState => !previousState);

    // time picker
    const handleStartTimeConfirm = (time) => {
        setStartTime(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
        setConfirmStartTime(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
        setStartTimePickerVisible(false);
    };

    const handleEndTimeConfirm = (time) => {
        setEndTime(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
        setConfirmEndTime(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
        setEndTimePickerVisible(false);
    };

    const showStartTimePicker = () => {
        setStartTimePickerVisible(true);
    };

    const showEndTimePicker = () => {
        setEndTimePickerVisible(true);
    };

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

    const availabilityHandler = async () => {
        let formData = new FormData();

        formData.append('date', selectedDate);
        formData.append('start_time', confirmStartTime);
        formData.append('end_time', confirmEndTime);
        formData.append('day_off', isDayOff == true ? 1 : 0);

        const response = await dispatch(sitterAvailabilityApi({ data: formData })).unwrap();

        if (response?.status == 'Success') {
            Toast.show(response?.message, Toast.SHORT);
            dispatch(saveAvailabilityData({ ...response?.data?.availability }));
            modalizeRef?.current?.close();
            navigation.navigate('Account');
        } else {
            Toast.show(response?.message, Toast.SHORT);
        }
    }

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
                >Set availability</Label>
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

    const renderComponents = () => {
        return (
            <Container mpContainer={{ mh: 20, mt: 20 }}>
                <ScrollView contentContainerStyle={{ paddingBottom: vs(100) }} showsVerticalScrollIndicator={false}>
                    <Container containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Label labelSize={16} style={{ fontFamily: fonts.regular }}>Date</Label>
                        <Label labelSize={16} style={{ fontFamily: fonts.regular }}>{selectedDate}</Label>
                    </Container>

                    <Container mpContainer={{ mt: 15 }} containerStyle={{ borderWidth: 1, borderColor: '#f2f2f2' }} />

                    <Container mpContainer={{ mt: 15 }} containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Label labelSize={16} style={{ fontFamily: fonts.regular }}>Worktime</Label>
                        {hide == false ?
                            <>
                                {startTime == '' ?
                                    <Label onPress={() => setHider(true)} labelSize={16} style={{ fontFamily: fonts.regular, color: colors.light_pink }}>Add work time</Label>
                                    :
                                    <Label onPress={() => setHider(true)} labelSize={16} style={{ fontFamily: fonts.regular, color: colors.light_pink }}>{`${startTime} - ${endTime}`}</Label>
                                }
                            </>
                            :
                            <Label onPress={() => setHider(false)} labelSize={16} style={{ fontFamily: fonts.regular, color: colors.light_pink }}>{'Done'}</Label>
                        }
                    </Container>

                    {hide == true ?
                        <>
                            <Container containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Container onPress={showStartTimePicker} containerStyle={{ borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderColor: 'lightgrey', width: screenWidth * 0.40 }} height={48} mpContainer={{ mt: 15, ph: 10 }}>
                                    <Label labelSize={14} style={{ fontFamily: fonts.regular }}>Start at</Label>
                                    <Label mpLabel={{ mt: 5 }} labelSize={16} style={{ fontFamily: fonts.regular }}>{startTime}</Label>
                                </Container>

                                <DateTimePickerModal
                                    isVisible={isStartTimePickerVisible}
                                    mode="time"
                                    onConfirm={handleStartTimeConfirm}
                                    onCancel={() => setStartTimePickerVisible(false)}
                                />

                                <Container onPress={showEndTimePicker} containerStyle={{ borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 5, borderColor: 'lightgrey', width: screenWidth * 0.40 }} height={48} mpContainer={{ mt: 15, ph: 10 }}>
                                    <Label labelSize={14} style={{ fontFamily: fonts.regular }}>End at</Label>
                                    <Label mpLabel={{ mt: 5 }} labelSize={16} style={{ fontFamily: fonts.regular }}>{endTime}</Label>
                                </Container>
                                <DateTimePickerModal
                                    isVisible={isEndTimePickerVisible}
                                    mode="time"
                                    onConfirm={handleEndTimeConfirm}
                                    onCancel={() => setEndTimePickerVisible(false)}
                                />
                            </Container>
                        </>
                        :
                        null}

                    <Container mpContainer={{ mt: 15 }} containerStyle={{ borderWidth: 1, borderColor: '#f2f2f2' }} />

                    <Container onPress={toggleDayOff} mpContainer={{ mt: 15 }} containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Label labelSize={16} style={{ fontFamily: fonts.regular }}>Day off</Label>
                        <Switch
                            trackColor={{ false: '#D9D9D9', true: '#34A853' }}
                            thumbColor={isDayOff ? '#fff' : '#FFFFFF'}
                            ios_backgroundColor="#3e3e3e"
                            value={isDayOff == 1 ? true : false}
                            onValueChange={toggleDayOff}
                        />
                    </Container>

                    <Btn
                        title='Save'
                        btnStyle={styles.btn_style}
                        btnHeight={50}
                        mpBtn={{ mt: 35 }}
                        textColor={'white'}
                        textSize={16}
                        onPress={availabilityHandler}
                    />
                </ScrollView>
            </Container>
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
    btn_style: {
        backgroundColor: colors.light_pink,
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        width: "100%"
    }
})

export default SetAvailabileModal;