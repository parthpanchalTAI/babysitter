import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import Img from "../../../components/Img";
import { images } from "../../../assets/Images";
import Label from "../../../components/Label";
import Container from "../../../components/Container";
import { fonts } from "../../../assets/Fonts/fonts";
import { Calendar } from 'react-native-calendars';
import { colors } from "../../../assets/Colors/colors";
import SetAvailabileModal from "../../../modals/SetAvailableModal/SetAvailable";
import { useSelector } from "react-redux";

const Availability = () => {

    const navigation = useNavigation();
    const setAvailabileRef = useRef();

    const [markedDates, setMarkedDates] = useState({});
    const [selected, setSelected] = useState(null);

    // const { loading: sitterAvailabilityLoading } = useSelector((state) => state.account.sitter_availability);
    const { data } = useSelector((state) => state.account.availabilityInitialStateData);

    const flatData = [
        data
    ];
    console.log('Flatdata', flatData);

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
        setSelected(day.dateString);
        setMarkedDates({
            ...markedDates,
            [day.dateString]: { selected: true, selectedColor: 'green', disableTouchEvent: true },
        });
        setAvailabileRef?.current?.present();
    }

    return (
        <Container containerStyle={{ flex: 1, backgroundColor: 'white' }}>
            <Calendar
                onDayPress={(day) => openSetAvailableModal(day)}
                style={{ marginTop: 15 }}
                theme={{
                    arrowColor: colors.light_pink,
                    selectedDotColor: colors.light_pink,
                    selectedDayBackgroundColor: colors.light_pink,
                }}
                markedDates={markedDates}
            />
            <SetAvailabileModal modalizeRef={setAvailabileRef} selectedDate={selected} />

            <FlatList
                data={flatData}
                renderItem={(item) => {
                    console.log('item', item);
                    return (
                        <Text>{item.date}</Text>
                    )
                }}
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