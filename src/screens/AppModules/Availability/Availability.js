import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { StyleSheet, Text } from "react-native";
import Img from "../../../components/Img";
import { images } from "../../../assets/Images";
import Label from "../../../components/Label";
import Container from "../../../components/Container";
import { fonts } from "../../../assets/Fonts/fonts";
import Calendar from "react-native-calendars/src/calendar"
import { colors } from "../../../assets/Colors/colors";
import { useSelector } from "react-redux";
import MainContainer from "../../../components/MainContainer";
import FooterComponents from "../../../components/FooterComponents";
import EditAvailableModal from "../../../modals/EditAvailableModal/EditAvailableModal";

const Availability = () => {

    const navigation = useNavigation();
    const setAvailabileRef = useRef();

    const { availability } = useSelector((state) => state.account.sitter_availability);

    // const [selected, setSelected] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // other
    const [selectedDates, setSelectedDates] = useState({});
    const [markedDates, setMarkedDates] = useState({});
    const [selectedDatesArray, setSelectedDatesArray] = useState([]);

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

    // const openSetAvailableModal = (day) => {
    //     setSelected(day.dateString);
    //     setAvailabileRef?.current?.present();
    // }

    // other

    useEffect(() => {
        // Create an object to mark the current date
        const today = new Date();
        const currentDateString = today.toISOString().split('T')[0];

        // Create an object to mark some specific dates with dots

        // const dotsAndCurrDate = {
        //     // Current date
        //     [currentDateString]: {
        //         selected: true,
        //         selectedColor: colors.light_yellow,
        //     },
        //     // Example date with dots
        //     // Add more marked dates here as needed
        // };

        const dotsAndCurrDate = availability.reduce((accumulator, date) => {
            console.log("accDate", date?.day_off);
            accumulator[date?.date] = {
                dotColor: date?.day_off == 0 ? 'red' : 'green',
                marked: true,
            };
            accumulator[currentDateString] = {
                selected: true,
                selectedColor: colors.light_yellow,
            }
            return accumulator;
        }, {});

        setMarkedDates(dotsAndCurrDate);
    }, []);

    const handleDateSelection = (day) => {
        const updatedDates = { ...selectedDates };

        if (updatedDates[day.dateString]) {
            delete updatedDates[day.dateString];
        } else {
            updatedDates[day.dateString] = {
                selected: true,
                selectedColor: colors.light_pink
            };
        }

        setSelectedDates(updatedDates);
    };

    const handleDonePress = () => {
        const selectedDatesArray = Object.keys(selectedDates);
        setSelectedDatesArray(selectedDatesArray);
        setAvailabileRef?.current?.present();
    };

    return (
        <MainContainer
            absoluteLoading={isLoading ? setAvailabileRef?.current?.close() : null}
        >
            <Container containerStyle={{ flex: 1, backgroundColor: 'white' }}>
                <Calendar
                    style={{ marginTop: 15 }}
                    theme={{ arrowColor: colors.light_pink }}
                    onDayPress={(day) => handleDateSelection(day)}
                    markedDates={{ ...markedDates, ...selectedDates }}
                // markedDates={{
                //     [dateOfArray]: {
                //         //based on user select date
                //         dotColor: day_off == 0 ? 'red' : 'green',
                //         marked: true,
                //     },
                //     [selected]: {
                //         selected: true,
                //         selectedColor: colors.light_pink,
                //     },
                //     [new Date().toISOString().split('T')[0]]: {
                //         selected: true,
                //         selectedColor: colors.light_yellow,
                //     }
                // }}
                />

                <Text style={{textAlign: 'center', marginTop: 30}} onPress={handleDonePress}>Press</Text>
                <EditAvailableModal modalizeRef={setAvailabileRef} selectedDate={selectedDatesArray} setIsLoading={setIsLoading} />

                <FooterComponents>
                    <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Img
                            imgSrc={images.red_dor}
                            imgStyle={{
                                width: 10,
                                height: 10,
                                resizeMode: 'contain'
                            }}
                            mpImage={{ ml: 10 }}
                        />
                        <Label mpLabel={{ ml: 5 }} labelSize={18} style={{ fontFamily: fonts.regular, alignSelf: 'center' }}>Not Available</Label>
                    </Container>

                    <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Img
                            imgSrc={images.red_dor}
                            imgStyle={{
                                width: 10,
                                height: 10,
                                resizeMode: 'contain',
                                tintColor: 'green'
                            }}
                            mpImage={{ ml: 20 }}
                        />
                        <Label mpLabel={{ ml: 5 }} labelSize={18} style={{ fontFamily: fonts.regular, alignSelf: 'center' }}>Available</Label>
                    </Container>
                </FooterComponents>
            </Container>
        </MainContainer>
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

// Extra codes

// Marked array dates
// const markedDates = markedDatesArray.reduce((accumulator, date) => {
//     accumulator[date] = {
//         marked: true,
//         dotColor: 'red',
//     };
//     accumulator[selected] = {
//         selected: true,
//         selectedColor: colors.light_pink,
//     };
//     accumulator[new Date().toISOString().split('T')[0]] = {
//         selected: true,
//         selectedColor: colors.light_yellow,
//     }
//     return accumulator;
// }, {});