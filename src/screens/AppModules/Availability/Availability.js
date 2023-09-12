import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
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

    const { date, day_off } = useSelector((state) => state.account.sitter_availability);

    const [selected, setSelected] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
        setAvailabileRef?.current?.present();
    }

    // New marked dates function

    return (
        <MainContainer
            absoluteLoading={isLoading ? setAvailabileRef?.current?.close() : null}
        >
            <Container containerStyle={{ flex: 1, backgroundColor: 'white' }}>
                <Calendar
                    onDayPress={(day) => openSetAvailableModal(day)}
                    style={{ marginTop: 15 }}
                    theme={{ arrowColor: colors.light_pink }}

                    markedDates={{
                        [date]: {
                            //based on user select date
                            dotColor: day_off == 0 ? 'red' : 'green',
                            marked: true,
                        },
                        [selected]: {
                            selected: true,
                            selectedColor: colors.light_pink,
                        },
                        [new Date().toISOString().split('T')[0]]: {
                            selected: true,
                            selectedColor: colors.light_yellow,
                        }
                    }}
                />
                <EditAvailableModal modalizeRef={setAvailabileRef} selectedDate={selected} day_off={day_off} setIsLoading={setIsLoading} />

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