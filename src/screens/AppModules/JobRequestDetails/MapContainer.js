import React from 'react';
import { StyleSheet, Dimensions, Linking, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Container from '../../../components/Container';
import Img from '../../../components/Img';
import { images } from '../../../assets/Images';
// import { images } from '../../../assets/images';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.1;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MapContainer = ({
    // route
    latitude,
    longitude,
}) => {

    const initialRegion = {
        latitude,
        longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    };

    const goToMap = () => {
        {
            Platform.OS == "android" ?
                Linking.openURL(`google.navigation:q=${initialRegion?.latitude}+${initialRegion?.longitude}`)
                :
                Linking.openURL(`maps://app?saddr=${initialRegion?.latitude}+101&daddr=${initialRegion?.longitude}`);
        }
    };

    return (
        <Container containerStyle={{
            overflow: 'hidden',
            borderRadius: 10,
            backgroundColor: 'lightgrey'
        }}
            mpContainer={{ mt: 15, mh: 0 }}
            height={180}
            onPress={goToMap}
        >
            {Platform.OS == "ios" ?
                <MapView
                    // provider={Platform.OS == "android" ? PROVIDER_GOOGLE : null}
                    style={{
                        ...StyleSheet.absoluteFillObject,
                    }}
                    pitchEnabled={true}
                    showsMyLocationButton={false}
                    zoomControlEnabled={false}
                    scrollEnabled={false}
                    followsUserLocation={false}
                    zoomEnabled={false}
                    showsScale={false}
                    initialRegion={initialRegion}
                    moveOnMarkerPress={false}
                >
                    <Marker
                        coordinate={initialRegion}
                    />
                </MapView>
                :
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{
                        ...StyleSheet.absoluteFillObject,
                    }}
                    pitchEnabled={true}
                    showsMyLocationButton={false}
                    zoomControlEnabled={false}
                    scrollEnabled={false}
                    followsUserLocation={false}
                    zoomEnabled={false}
                    showsScale={false}
                    initialRegion={initialRegion}
                    moveOnMarkerPress={false}
                >
                    <Marker
                        coordinate={initialRegion}
                    />
                </MapView>
            }
            <Container containerStyle={{
                position: 'absolute',
                bottom: 20,
                right: 20,
                backgroundColor: "white",
                justifyContent: 'center',
                alignItems: "center",
                borderRadius: 5,
                elevation: 2
            }}
                width={40} height={40}
                onPress={goToMap}
            >
                <Img
                    imgSrc={images.location_pin}
                    imgStyle={{
                        resizeMode: 'contain'
                    }}
                    width={20} height={20}
                />
            </Container>
        </Container>
    );
};
export default MapContainer;