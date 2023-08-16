import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect } from "react";
import { StyleSheet } from "react-native";
import { images } from "../../../assets/Images";
import Img from "../../../components/Img";
import { screenHeight, screenWidth } from "../../../utils/styleUtils";
import Label from "../../../components/Label";
import { fonts } from "../../../assets/Fonts/fonts";
import { colors } from "../../../assets/Colors/colors";
import Container from "../../../components/Container";
import Btn from "../../../components/Btn";
import { useDispatch, useSelector } from "react-redux";
import { addLocationApi } from "../../../features/authSlice";
import { saveUser } from "../../../features/whiteLists";
import MainContainer from "../../../components/MainContainer";

const SetLocation = ({
    route
}) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const { loading: addLocationLoading } = useSelector((state) => state.auth.addLocation);

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => {
                return renderHeader();
            }
        });
    }, []);

    const renderHeader = () => {
        return (
            <Container containerStyle={{ backgroundColor: 'white' }}>
                <Img
                    imgSrc={images.back_img}
                    mpImage={{ mt: 45, mh: 15 }}
                    imgStyle={styles.back_img}
                    onPress={() => navigation.goBack()}
                />
            </Container>
        )
    }

    const setLocationHandler = async () => {
        let formData = new FormData();
        formData.append('latitude', route?.params?.mapAddress?.latitude)
        formData.append('longitude', route?.params?.mapAddress?.longitude)
        formData.append('address', route?.params?.mapAddress?.name + "," + route?.params?.mapAddress?.area + "," + route?.params?.mapAddress?.address);

        const response = await dispatch(addLocationApi({ data: formData })).unwrap();

        if (response?.status == 'Success') {
            dispatch(saveUser({ ...response?.data }));
            navigation.navigate('CompleteProfile');
        }
    }

    return (
        <MainContainer absoluteLoading={addLocationLoading}>
            <Container containerStyle={styles.container}>
                <Img
                    imgSrc={images.location_pin}
                    imgStyle={styles.location_pin}
                    mpImage={{ mt: 10 }}
                />

                <Label
                    labelSize={30}
                    mpLabel={{ mt: 10 }}
                    style={styles.heading_text}>Hello, nice to meet you!</Label>

                <Label
                    labelSize={16}
                    style={styles.desc_text}
                    mpLabel={{ mt: 10 }}
                >Set your location to start find nannies around you.</Label>

                <Container
                    mpContainer={{ mt: 20, mh: 20 }}
                    height={130}
                    containerStyle={styles.select_map_container}
                    onPress={() => navigation.navigate('AddLocation')}
                >
                    {route?.params?.fromAddLoc == true ?
                        <Label labelSize={14} style={styles.select_map_text}>{route?.params?.mapAddress?.name}, {route?.params?.mapAddress?.area}, {route?.params?.mapAddress?.address}</Label>
                        :
                        <Label labelSize={16} style={styles.select_map_text}>Select address on map</Label>
                    }
                </Container>

                <Btn
                    title='Done'
                    btnStyle={{
                        backgroundColor: route?.params?.fromAddLoc == true ? colors.light_pink : colors.grey,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignSelf: 'center',
                        width: "92%"
                    }}
                    btnHeight={50}
                    mpBtn={{ mt: 55 }}
                    textColor={'white'}
                    textSize={16}
                    onPress={setLocationHandler}
                />
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
    container: {
        flex: 1, backgroundColor: 'white'
    },
    location_pin: {
        width: screenWidth * 0.25,
        height: screenHeight * 0.25,
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    heading_text: {
        fontFamily: fonts.bold,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    desc_text: {
        fontFamily: fonts.regular,
        alignSelf: 'center'
    },
    select_map_container: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#f2f2f2',
        backgroundColor: '#f2f2f2',
        justifyContent: 'center',
        alignItems: 'center'
    },
    select_map_text: {
        fontFamily: fonts.regular, color: 'black'
    },
    btn_style: {
        backgroundColor: colors.light_pink,
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        width: "92%"
    },
})

export default SetLocation;