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
import FooterComponents from "../../../components/FooterComponents";

const Availability = () => {

    const navigation = useNavigation();
    const setAvailabileRef = useRef();

    const [selected, setSelected] = useState('');
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
            <Container onPress={() => navigation.goBack()} containerStyle={{ backgroundColor: 'white' }}>
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
            />

            {/* <FooterComponents>
                <Btn
                    title='Continue'
                    btnStyle={styles.btn_style}
                    btnHeight={50}
                    mpBtn={{ mt: 50,mb: 10 }}
                    textColor={'white'}
                    textSize={16}
                    onPress={() => navigation.navigate('HourlyRate')}
                />
            </FooterComponents> */}

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
        width: "96%"
    }
})

export default Availability;