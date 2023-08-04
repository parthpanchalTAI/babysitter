import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import Img from "../../../components/Img";
import { images } from "../../../assets/Images";
import Label from "../../../components/Label";
import Container from "../../../components/Container";
import { fonts } from "../../../assets/Fonts/fonts";
import { Calendar } from 'react-native-calendars';
import { colors } from "../../../assets/Colors/colors";
import SetAvailabileModal from "../../../modals/SetAvailableModal/SetAvailable";
import Btn from "../../../components/Btn";

const Availability = () => {

    const navigation = useNavigation();
    const setAvailabileRef = useRef();

    const [selected, setSelected] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => {
                return renderHeader();
            }
        });
    }, []);

    const renderHeader = () => {
        return (
            <Container containerStyle={{ backgroundColor: 'white' }} onPress={() => navigation.goBack()}>
                <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Img
                        imgSrc={images.back_img}
                        mpImage={{ mt: 45, mh: 15 }}
                        imgStyle={styles.back_img}
                    />
                    <Label mpLabel={{ mt: 45 }} labelSize={18} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }}>Availability</Label>
                </Container>
            </Container>
        )
    }

    const openSetAvailableModal = (day) => {
        setSelected(day.dateString)
        setAvailabileRef?.current?.present();
    }

    const handleDateSelect = (date) => {
        // Check if the date is already selected
        if (selected[date.dateString]) {
            // Date is already selected, unmark it
            const updatedDates = { ...selected };
            delete updatedDates[date.dateString];
            setSelected(updatedDates);
        } else {
            // Date is not selected, mark it
            setSelected({ ...selected, [{ multiDate: date.dateString }]: { selected: true } });
        }
    };

    return (
        <Container containerStyle={{ flex: 1, backgroundColor: 'white' }}>
            <Calendar
                onDayPress={(date) => handleDateSelect(date)}
                style={{ marginTop: 15 }}
                // markedDates={{
                //     [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: colors.light_pink }
                // }}
                markedDates={selected}
                theme={{
                    arrowColor: colors.light_pink,
                    selectedDotColor: colors.light_pink,
                    selectedDayBackgroundColor: colors.light_pink,
                }}
            />
            <SetAvailabileModal modalizeRef={setAvailabileRef} selectedDate={selected} />

            <Btn
                title='Next'
                btnStyle={{
                    backgroundColor: colors.light_pink,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignSelf: 'center',
                    width: "92%"
                }}
                btnHeight={50}
                mpBtn={{ mt: 25 }}
                textColor={'white'}
                textSize={16}
                onPress={openSetAvailableModal}
            />
        </Container>
    )
}

const styles = StyleSheet.create({
    back_img: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    btn_style: {
        backgroundColor: colors.light_pink,
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        width: "92%"
    }
})

export default Availability;