import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import Img from "../../../components/Img";
import { images } from "../../../assets/Images";
import Label from "../../../components/Label";
import Container from "../../../components/Container";
import { fonts } from "../../../assets/Fonts/fonts";
import { Calendar } from 'react-native-calendars';
import { colors } from "../../../assets/Colors/colors";
import SetAvailabileModal from "../../../modals/SetAvailableModal/SetAvailable";
import { useSelector } from "react-redux";
import MainContainer from "../../../components/MainContainer";
import FooterComponents from "../../../components/FooterComponents";

const Availability = ({
    route
}) => {

    const navigation = useNavigation();
    const setAvailabileRef = useRef();

    const { loading } = useSelector((state) => state.account.sitter_availability);
    const { data: availability } = useSelector((state) => state.account.sitter_availability);

    const date = availability?.availability?.map(item => item.date);
    const initDate = date

    const [selected, setSelected] = useState(initDate);
    const [markedDates, setMarkedDates] = useState({});

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
            [day.dateString]: { selected: true, selectedColor: colors.light_pink, disableTouchEvent: true },
        });
        setAvailabileRef?.current?.present();
    }

    const marked = useMemo(() => ({
        [selected]: {
            selected: true,
            selectedColor: 'red',
            selectedTextColor: 'white',
        }
    }), [selected]);

    return (
        <MainContainer absoluteLoading={loading ? setAvailabileRef?.current?.close() : null}>
            <Container containerStyle={{ flex: 1, backgroundColor: 'white' }}>
                <Calendar
                    onDayPress={(day) => openSetAvailableModal(day)}
                    style={{ marginTop: 15 }}
                    theme={{
                        arrowColor: colors.light_pink,
                        selectedDotColor: colors.light_pink,
                        selectedDayBackgroundColor: colors.light_pink,
                    }}
                    markedDates={marked}
                />
                <SetAvailabileModal modalizeRef={setAvailabileRef} selectedDate={selected} />

                <FooterComponents>
                    <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Img
                            imgSrc={images.red_dor}
                            imgStyle={{
                                width: 10,
                                height: 10,
                                resizeMode: 'contain'
                            }}
                            mpImage={{ mr: 10 }}
                        />
                        <Label labelSize={18} style={{ fontFamily: fonts.regular, alignSelf: 'center' }}>I am not available</Label>
                    </Container>
                </FooterComponents>

                {/* <FlatList
                    data={availability?.availability}
                    renderItem={({ item }) => {
                        return (
                            <Container>
                                {item.day_off == 0 ?
                                    <Container mpContainer={{ mt: 10, mh: 20 }}>
                                        <Container containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Label labelSize={16} style={{ fontFamily: fonts.regular }}>Date:- {item.date}</Label>
                                            <Label labelSize={16} style={{ fontFamily: fonts.regular }}>Start time:- {item.start_time}</Label>
                                            <Label labelSize={16} style={{ fontFamily: fonts.regular }}>End time:- {item.end_time}</Label>
                                        </Container>
                                    </Container>
                                    : null}
                            </Container>
                        )
                    }}
                    contentContainerStyle={{ paddingBottom: vs(20) }}
                    showsVerticalScrollIndicator={false}
                /> */}
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