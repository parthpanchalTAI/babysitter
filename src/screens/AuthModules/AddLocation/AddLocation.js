// import React, { useEffect, useLayoutEffect, useState } from "react";
// import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
// import Img from "../../../components/Img";
// import { images } from "../../../assets/Images";
// import { useNavigation } from "@react-navigation/native";
// import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
// import { colors } from "../../../assets/Colors/colors";
// import Geolocation from 'react-native-geolocation-service'
// import Container from "../../../components/Container";

// const AddLocation = () => {

//     const navigation = useNavigation();
//     const [selectedLocation, setSelectedLocation] = useState(null);
//     const [currentLocation, setCurrentLocation] = useState(null);

//     useEffect(() => {
//         getCurrentLocation();
//     }, []);

//     const getCurrentLocation = () => {
//         Geolocation.getCurrentPosition(
//             (position) => {
//                 const { latitude, longitude } = position.coords;
//                 setCurrentLocation({ latitude, longitude });
//             },
//             (error) => console.log(error),
//             { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
//         );
//     };

//     useLayoutEffect(() => {
//         navigation.setOptions({
//             header: () => {
//                 return renderHeader();
//             }
//         });
//     }, []);

//     const renderHeader = () => {
//         return (
//             <Container containerStyle={{ backgroundColor: null }}>
//                 <Img
//                     imgSrc={images.back_img}
//                     mpImage={{ mt: 45, mh: 15 }}
//                     imgStyle={styles.back_img}
//                     onPress={() => navigation.goBack()}
//                 />
//             </Container>
//         )
//     }

//     const handleMapPress = (event) => {
//         const { coordinate } = event.nativeEvent;
//         setSelectedLocation(coordinate);
//     };

//     const handleCurrentLocationPress = () => {
//         getCurrentLocation();
//     };

//     return (
//         <View style={styles.container}>
//             <MapView
//                 style={styles.map}
//                 provider={PROVIDER_GOOGLE}
//                 onPress={handleMapPress}
//             >
//                 {selectedLocation && <Marker coordinate={selectedLocation} />}
//             </MapView>

//             <Container containerStyle={styles.button} onPress={handleCurrentLocationPress}>
//                 <Img
//                     imgSrc={images.current_img}
//                     imgStyle={{
//                         width: 60,
//                         height: 60,
//                         resizeMode: 'contain'
//                     }}
//                 />
//             </Container>

//             <Container containerStyle={styles.backBtn}>
//                 <Img
//                     imgSrc={images.back_img}
//                     imgStyle={styles.back_img}
//                     onPress={() => navigation.goBack()}
//                 />
//             </Container>

//             <TouchableOpacity style={styles.saveButton}>
//                 <Text style={styles.saveButtonText}>Save</Text>
//             </TouchableOpacity>
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     back_img: {
//         width: 20,
//         height: 20,
//         resizeMode: 'contain'
//     },
//     container: {
//         flex: 1,
//     },
//     map: {
//         flex: 1,
//     },
//     btn_style: {
//         backgroundColor: colors.light_pink,
//         borderRadius: 10,
//         justifyContent: 'center',
//         alignSelf: 'center',
//         width: "100%"
//     },
//     saveButton: {
//         position: 'absolute',
//         bottom: 16,
//         alignSelf: 'center',
//         backgroundColor: colors.light_pink,
//         paddingHorizontal: 16,
//         paddingVertical: 8,
//         borderRadius: 10,
//         width: '95%',
//         justifyContent: 'center',
//         alignItems: 'center',
//         height: 50
//     },
//     saveButtonText: {
//         color: '#FFFFFF',
//         fontSize: 16,
//     },
//     backBtn: {
//         position: 'absolute',
//         top: 25,
//         left: 0,
//         paddingHorizontal: 16,
//         paddingVertical: 8,
//         borderRadius: 20,
//     },
//     button: {
//         position: 'absolute',
//         bottom: 80,
//         right: 0,
//         // backgroundColor: '#2B8EFF',
//         paddingHorizontal: 16,
//         paddingVertical: 8,
//         borderRadius: 20,
//     },
//     buttonText: {
//         color: '#FFFFFF',
//         fontSize: 16,
//     },
// })

// export default AddLocation;

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Dimensions, PermissionsAndroid, Platform, View } from 'react-native';
import MapView, { Animated, AnimatedRegion, MarkerAnimated, Circle } from 'react-native-maps';
import { fonts } from "../../../assets/Fonts/fonts";
import Container from "../../../components/Container";
import Label from "../../../components/Label";
import { screenHeight } from "../../../utils/styleUtils";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from "../../../assets/Colors/colors";
import Btn from "../../../components/Btn";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Geolocation from 'react-native-geolocation-service';
import { useDispatch, useSelector } from "react-redux";
import MainContainer from "../../../components/MainContainer";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.5;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const getAddress = {
    latitude: 37.78825,
    longitude: -122.4324,
    address: '',
    area: '',
    city: '',
    country: '',
    postal_code: '',
    state: '',
    house_no: '',
};

const AddLocation = ({
    navigation,
    route
}) => {
    const dispatch = useDispatch();

    const markerRef = useRef(null);
    const mapRef = useRef(null);
    const addressModalRef= useRef(null);

    const [mapAddress, setMapAddress] = useState({ ...getAddress });
    const [addressAvailable, setAddressAvailable] = useState(true);

    const initialRegion = {
        latitude: getAddress.latitude,
        longitude: getAddress.longitude,
        // latitude: 37.78825,
        // longitude: -122.4324,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    };

    const region = new AnimatedRegion({ ...initialRegion });

    useEffect(() => {
        if (mapRef.current) {
            let { latitude, longitude } = getAddress;
            setTimeout(() => {
                mapRef.current?.animateCamera({ center: { latitude, longitude, }, zoom: 18 }, { duration: 500 });
                animateMarkerHandler({ latitude, longitude });
                getAddressFromLatLong(getAddress);
            }, 500);
        }
        // 
    }, [getAddress, mapRef, markerRef]);

    const animateMarkerHandler = (coordinate) => {
        console.log('coordingate', coordinate);
        if (Platform.OS === 'android') {
            if (markerRef.current) {
                markerRef.current.animateMarkerToCoordinate(
                    coordinate,
                    500
                );
            }
        } else {
            region.timing({
                ...coordinate,
                useNativeDriver: false, // defaults to false if not passed explicitly
                duration: 500
            }).start();
        }
    };

    const onPressMapPress = (coordinate) => {
        animateMarkerHandler(coordinate);
        mapRef.current.animateCamera({
            center: {
                latitude: Number(coordinate.latitude),
                longitude: Number(coordinate.longitude),
            },
            // zoom: 12,
        }, { duration: 500 });
        getAddressFromLatLong(coordinate);
    };

    const requestLocationPermission = async () => {
        if (Platform.OS === "android") {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        'title': 'BabySitter',
                        'message': "BabySitter App access to your location"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    getUserCurrentLocation();
                } else {
                    console.log("location permission denied");
                    Alert.alert('BabySitter App', "Location permission denied");
                }
            } catch (err) {
                console.warn(err);
            }
        } else {
            getIosPermission();
        }
    };

    const getIosPermission = () => {
        Geolocation.requestAuthorization('always').then((res) => {
            console.log('res -->', res);
            if (res == 'granted') {
                getUserCurrentLocation();
            } else {
                Alert.alert("Permission not granted");
            }
        });
    };

    const getUserCurrentLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                let { latitude, longitude } = position.coords;
                mapRef.current?.animateCamera({ center: { latitude, longitude, }, zoom: 18 }, { duration: 500 });
                animateMarkerHandler(position.coords);
                getAddressFromLatLong(position.coords);
                // setMarkerPosition( { latitude, longitude } );
            },
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    const getAddressFromLatLong = ({ latitude, longitude }) => {
        mapRef.current?.addressForCoordinate({ latitude, longitude }).then((res) => {
            console.log('res', res);
            let addressArray = [res?.subAdministrativeArea, res?.administrativeArea, res?.country, res?.postalCode].filter((item, index) => item != null);
            // let filteredArray = addressArray.filter
            setAddressAvailable(true);
            setMapAddress({
                area: res?.subLocality || res?.locality || addressArray[0],
                address: addressArray.join(", "),
                latitude: latitude,
                longitude: longitude,
                country: res?.country || '',
                postal_code: res?.postalCode || '',
                city: res?.subAdministrativeArea || '',
                state: res?.administrativeArea || ''
            });
        }).catch((err) => {
            setAddressAvailable(false);
            setMapAddress({ ...defaultAddress });
            // console.log('error',err)
        });
    };

    const onRegionChange = useCallback( ( updatedRegion ) => {
        region.setValue( updatedRegion );
    }, [ region ] );

    const confirmAddress = () => {
        addressModalRef.current?.snapToIndex( 0 );
    };

    console.log("addressAvai", mapAddress);

    return (
        <MainContainer style={ {
            flex: 1,
            backgroundColor: 'white'
        } }
        >
            <View>
                <Animated
                    ref={ mapRef }
                    initialRegion={ region }
                    onRegionChange={ onRegionChange }
                    // provider={ PROVIDER_GOOGLE }
                    style={ {
                        height: screenHeight * 0.65,
                        // ...StyleSheet.absoluteFillObject
                    } }
                    onPress={ ( event ) => {
                        // setMarkerPosition( event.nativeEvent.coordinate );
                        onPressMapPress( event.nativeEvent.coordinate );
                    } }
                    showsUserLocation={ true }
                    showsCompass={ false }
                    showsMyLocationButton={ false }
                    moveOnMarkerPress={ false }
                >
                    <MarkerAnimated
                        ref={ markerRef }
                        coordinate={ region }
                    // anchor={ { x: 0.50, y: 0.50 } }
                    >
                    </MarkerAnimated>
                </Animated>
                <Container
                    containerStyle={ {
                        backgroundColor: 'white',
                        elevation: 1.5,
                        position: 'absolute',
                        justifyContent: "center",
                        alignItems: 'center',
                        borderRadius: 45,
                        bottom: 15,
                        right: 10,
                    } }
                    width={ 45 } height={ 45 }
                    onPress={ requestLocationPermission }
                >
                    <MaterialIcons
                        name="my-location"
                        size={ 25 }
                        color="black"
                    />
                </Container>
            </View>
            <Container containerStyle={ {
                backgroundColor: 'white',
                elevation: 2,
                height: screenHeight * 0.35,
            } } >
                <Label
                    textColor='black'
                    mpLabel={ { pv: 15, ph: 15 } }
                    style={ { fontFamily: fonts.semiBold } }
                    labelSize={ 16 }
                >Select your save location</Label>

                <Container containerStyle={ {
                    height: 75,
                    flexDirection: 'row',
                    borderTopWidth: 1,
                    borderColor: 'lightgrey'
                } }
                    mpContainer={ { pv: 15, mh: 10 } }
                >
                    {
                        addressAvailable ?
                            <>
                                <Ionicons
                                    name='ios-location'
                                    size={ 30 }
                                    color={ colors.primary_green }
                                />
                                <Container containerStyle={ {
                                    flex: 1
                                } }
                                    mpContainer={ { ph: 10 } }
                                >
                                    <Label
                                        labelSize={ 16 }
                                        textColor='black'
                                        style={ { fontFamily: fonts.semiBold } }
                                    >{ mapAddress.area }</Label>
                                    <Label
                                        labelSize={ 14 }
                                        mpLabel={ { mt: 4 } }
                                        numberOfLines={ 1 }
                                        textColor='grey'
                                    >{ mapAddress.address }</Label>
                                </Container>
                            </>
                            :
                            <Label
                                labelSize={ 16 }
                                textColor={ colors.primary_orange }
                                mpLabel={ { mh: 20 } }
                                style={ { textAlign: 'center' } }
                            >Sorry!, We are not able to do delivery at this location.</Label>
                    }
                </Container>
                <Btn
                    title='Confirm location and proceed'
                    textSize={ 14 }
                    btnStyle={ {
                        backgroundColor: colors.primary_green,
                        borderRadius: 4,
                        opacity: mapAddress?.address ? 1 : 0.5
                    } }
                    btnHeight={ 40 }
                    mpBtn={ { ph: 10, mh: 15, mt: 5 } }
                    textColor='white'
                    labelStyle={ { fontFamily: fonts.regular } }
                    disabled={ !mapAddress?.address }
                    onPress={ confirmAddress }
                />
            </Container>
        </MainContainer >
    );

}

export default AddLocation;