import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Img from "../../../components/Img";
import { images } from "../../../assets/Images";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { colors } from "../../../assets/Colors/colors";
import Geolocation from 'react-native-geolocation-service'
import Container from "../../../components/Container";

const AddLocation = () => {

    const navigation = useNavigation();
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);

    useEffect(() => {
        getCurrentLocation();
    }, []);

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setCurrentLocation({ latitude, longitude });
            },
            (error) => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => {
                return renderHeader();
            }
        });
    }, []);

    const renderHeader = () => {
        return (
            <Container containerStyle={{ backgroundColor: null }}>
                <Img
                    imgSrc={images.back_img}
                    mpImage={{ mt: 45, mh: 15 }}
                    imgStyle={styles.back_img}
                    onPress={() => navigation.goBack()}
                />
            </Container>
        )
    }

    const handleMapPress = (event) => {
        const { coordinate } = event.nativeEvent;
        setSelectedLocation(coordinate);
    };

    const handleCurrentLocationPress = () => {
        getCurrentLocation();
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                onPress={handleMapPress}
            >
                {selectedLocation && <Marker coordinate={selectedLocation} />}
            </MapView>

            <Container containerStyle={styles.button} onPress={handleCurrentLocationPress}>
                <Img
                    imgSrc={images.current_img}
                    imgStyle={{
                        width: 60,
                        height: 60,
                        resizeMode: 'contain'
                    }}
                />
            </Container>

            <Container containerStyle={styles.backBtn}>
                <Img
                    imgSrc={images.back_img}
                    imgStyle={styles.back_img}
                    onPress={() => navigation.goBack()}
                />
            </Container>

            <TouchableOpacity style={styles.saveButton}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    back_img: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    btn_style: {
        backgroundColor: colors.light_pink,
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        width: "100%"
    },
    saveButton: {
        position: 'absolute',
        bottom: 16,
        alignSelf: 'center',
        backgroundColor: colors.light_pink,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 10,
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    backBtn: {
        position: 'absolute',
        top: 25,
        left: 0,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    button: {
        position: 'absolute',
        bottom: 80,
        right: 0,
        // backgroundColor: '#2B8EFF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
})

export default AddLocation;