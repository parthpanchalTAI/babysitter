import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import Img from "../../../components/Img";
import { images } from "../../../assets/Images";
import Label from "../../../components/Label";
import Container from "../../../components/Container";
import { fonts } from "../../../assets/Fonts/fonts";
import Calendar from "react-native-calendars/src/calendar"
import { colors } from "../../../assets/Colors/colors";
import { useDispatch, useSelector } from "react-redux";
import MainContainer from "../../../components/MainContainer";
import FooterComponents from "../../../components/FooterComponents";
import EditAvailableModal from "../../../modals/EditAvailableModal/EditAvailableModal";
import Btn from "../../../components/Btn";
import { screenWidth } from "../../../utils/styleUtils";
import { getBabySitterDetailsApi } from "../../../features/accountSlice";

const Availability = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const setAvailabileRef = useRef();

    const { loading: userDetailsLoading } = useSelector((state) => state.account.babySitterDetails);
    const { loading: loadingAvailability } = useSelector((state) => state.account.sitter_availability);

    // other method
    const [selectedDates, setSelectedDates] = useState({});
    const [markedDates, setMarkedDates] = useState({});
    const [selectedDatesArray, setSelectedDatesArray] = useState([]);
    const [availability, setAvailability] = useState([]);

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

    useEffect(() => {
        getUserDetailsHandler();
    }, []);

    const getUserDetailsHandler = async () => {
        const response = await dispatch(getBabySitterDetailsApi({})).unwrap();
        if (response?.status == 'Success') {
            setAvailability(response?.data?.availability);
        }
    }

    // other method

    useEffect(() => {
        // Create an object to mark the current date

        const dotsAndCurrDate = availability?.reduce((accumulator, date) => {
            let specialDate = date;
            console.log('date', specialDate);
            accumulator[date?.date] = {
                dotColor: date?.day_off == 0 ? 'red' : 'green',
                marked: true,
            };
            accumulator[new Date().toISOString().split('T')[0]] = {
                selected: true,
                selectedColor: colors.light_yellow,
                dotColor: date?.day_off == 0 ? 'red' : 'green',
                marked: true
            }
            return accumulator;
        }, {});

        setMarkedDates(dotsAndCurrDate);
    }, [availability]);

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
            absoluteLoading={loadingAvailability || userDetailsLoading}
        >
            <Container containerStyle={{ flex: 1, backgroundColor: 'white' }}>
                <Calendar
                    style={{ marginTop: 15 }}
                    theme={{ arrowColor: colors.light_pink }}
                    onDayPress={(day) => handleDateSelection(day)}
                    markedDates={{
                        ...markedDates, ...selectedDates,
                        // [new Date().toISOString().split('T')[0]]: {
                        //     selected: true,
                        //     selectedColor: colors.light_yellow,

                        // }
                    }}
                    minDate={new Date().toISOString().split('T')[0]}
                />

                <FooterComponents>
                    <Container mpContainer={{ mb: 5 }}>
                        <Container containerStyle={{ flexDirection: 'row', alignSelf: 'center' }}>
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
                        </Container>

                        <Btn
                            title='Confirm'
                            btnStyle={styles.btn_style}
                            btnHeight={50}
                            mpBtn={{ mt: 25 }}
                            textColor={'white'}
                            textSize={16}
                            onPress={handleDonePress}
                        />
                    </Container>
                </FooterComponents>
            </Container>

            {loadingAvailability ? null :
                <EditAvailableModal modalizeRef={setAvailabileRef} selectedDate={selectedDatesArray} />
            }
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
        width: screenWidth * 0.90
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