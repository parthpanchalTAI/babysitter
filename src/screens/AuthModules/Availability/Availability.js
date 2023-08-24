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
import Btn from "../../../components/Btn";
import SetAvailabileModal from "../../../modals/SetAvailableModal/SetAvailable";
import FooterComponents from "../../../components/FooterComponents";

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
        setSelected(day.dateString)
        setAvailabileRef?.current?.present();
    }

    return (
        <Container containerStyle={{ flex: 1, backgroundColor: 'white' }}>
            <Calendar
                onDayPress={(day) => openSetAvailableModal(day)}
                style={{ marginTop: 15 }}
                markedDates={{
                    [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: colors.light_pink }
                }}
                theme={{
                    arrowColor: colors.light_pink,
                    selectedDotColor: colors.light_pink,
                    selectedDayBackgroundColor: colors.light_pink,
                }}
            />

            <FooterComponents>
                <Btn
                    title='Continue'
                    btnStyle={styles.btn_style}
                    btnHeight={50}
                    mpBtn={{ mt: 50,mb: 10 }}
                    textColor={'white'}
                    textSize={16}
                    onPress={() => navigation.navigate('HourlyRate')}
                />
            </FooterComponents>

            <SetAvailabileModal modalizeRef={setAvailabileRef} selectedDate={selected} />
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