import React, { useLayoutEffect, useRef, useState, useEffect, useCallback } from 'react'
import { Alert, Dimensions, PermissionsAndroid, Platform, ScrollView, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { screenHeight, vs } from '../../../utils/styleUtils'
import Geolocation from "react-native-geolocation-service"
import { Animated, AnimatedRegion, MarkerAnimated } from 'react-native-maps'
import MainContainer from '../../../components/MainContainer'
import { useHeaderHeight } from '@react-navigation/elements'
import { getStatusBarHeight } from '../../../utils/globals'
import Img from '../../../components/Img'
import { fonts } from '../../../assets/Fonts/fonts'
import { colors } from '../../../assets/Colors/colors'
import { images } from '../../../assets/Images'
import Container from '../../../components/Container';
import Label from '../../../components/Label';
import Btn from '../../../components/Btn';
import { addLocationApi } from '../../../features/authSlice';
import { getCityAddress, saveUser } from '../../../features/whiteLists';
import { useDispatch, useSelector } from 'react-redux';

// const { width, height } = Dimensions.get('window');
// const ASPECT_RATIO = width / height;
// const LATITUDE_DELTA = 0.5;
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = 0.0421

const getAddress = {
    latitude: 14.7167,
    longitude: -17.4677,
    // latitudeDelta: 0.0922,
    // longitudeDelta: 0.0421,
    address: '',
    area: '',
    city: '',
    country: '',
    postal_code: '',
    state: ''
};

const EditLocation = ({
    route
}) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const headerHeight = useHeaderHeight();
    const statusBarHeight = getStatusBarHeight();

    const markerRef = useRef(null);
    const mapRef = useRef(null);

    const [markerPosition, setMarkerPosition] = useState({
        latitude: 14.7167,
        longitude: -17.4677,
    });

    const [mapAddress, setMapAddress] = useState({ ...getAddress });
    const [addressAvailable, setAddressAvailable] = useState(true);

    const { city } = mapAddress;

    const { loading: editLocationLoading } = useSelector((state) => state.auth.addLocation);

    const initialRegion = {
        latitude: getAddress.latitude,
        longitude: getAddress.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    };

    const region = new AnimatedRegion({ ...initialRegion });

    useLayoutEffect(() => {
        navigation.setOptions(({
            header: () => {
                return renderHeader();
            }
        }))
    }, []);

    const renderHeader = () => {
        return (
            <View style={{ backgroundColor: colors.light_pink }}>
                <Container
                    mpContainer={{ ph: 15 }}
                    height={headerHeight}
                    containerStyle={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        paddingTop: statusBarHeight
                    }}>
                    <Container onPress={() => navigation.goBack()} containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Img
                            imgSrc={images.back_img}
                            imgStyle={{
                                width: 20,
                                height: 20,
                                resizeMode: 'contain',
                                tintColor: 'white'
                            }}
                            onPress={() => navigation.goBack()}
                        />
                        <Label
                            mpLabel={{ ml: 20 }}
                            labelSize={18}
                            style={{ fontFamily: fonts.regular, color: 'white' }}
                        >{''}</Label>
                    </Container>
                </Container>
            </View>
        )
    }

    useEffect(() => {
        if (route.params?.fromEdit) {
            requestLocationPermission();
        } else {
            if (mapRef.current) {
                let { latitude, longitude } = getAddress;
                setTimeout(() => {
                    mapRef.current?.animateCamera({ center: { latitude, longitude, }, zoom: 18 }, { duration: 500 });
                    animateMarkerHandler({ latitude, longitude });
                    getAddressFromLatLong(getAddress);
                }, 500);
            }
        }
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
        // setMarkerPosition(coordinate);
        getAddressFromLatLong(coordinate);
    };

    const requestLocationPermission = async () => {
        if (Platform.OS === "android") {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        'title': 'BabySitter App',
                        'message': "BabySitter App access to your location"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("grant", granted);
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
                mapRef.current?.animateCamera({ center: { latitude, longitude, }, zoom: 20 }, { duration: 500 });
                animateMarkerHandler(position.coords);
                getAddressFromLatLong(position.coords);
                // setMarkerPosition({ latitude, longitude });
            },
            (error) => {
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    const getAddressFromLatLong = ({ latitude, longitude }) => {
        mapRef.current?.addressForCoordinate({ latitude, longitude }).then((res) => {
            console.log('res --0', res);
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
                route: res?.thoroughfare || '',
                state: res?.administrativeArea || '',
                name: res?.name || ''
            });
        }).catch((err) => {
            setAddressAvailable(false);
            setMapAddress({ ...defaultAddress });
            // console.log('error',err)
        });
    };

    const onRegionChange = useCallback((updatedRegion) => {
        region.setValue(updatedRegion);
    }, [region]);

    const editLocationHandler = async () => {
        let formData = new FormData();
        formData.append('latitude', mapAddress?.latitude)
        formData.append('longitude', mapAddress?.longitude)
        formData.append('address', mapAddress?.name + "," + mapAddress?.area + "," + mapAddress?.address);

        const response = await dispatch(addLocationApi({ data: formData })).unwrap();

        if (response?.status == 'Success') {
            dispatch(getCityAddress(city));
            dispatch(saveUser(response?.data));
            navigation.navigate('EditProfile');
        }
    }

    return (
        <MainContainer
            style={{
                flex: 1,
                backgroundColor: 'white'
            }}
            absoluteLoading={editLocationLoading}
        >
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: vs(20) }}>
                <View>
                    <Animated
                        ref={mapRef}
                        initialRegion={region}
                        onRegionChange={onRegionChange}
                        style={{
                            height: screenHeight * 0.65,
                        }}
                        onPress={(event) => {
                            // setMarkerPosition( event.nativeEvent.coordinate );
                            onPressMapPress(event.nativeEvent.coordinate);
                        }}
                        showsUserLocation={true}
                        showsCompass={false}
                        showsMyLocationButton={false}
                        moveOnMarkerPress={false}
                    >
                        <MarkerAnimated
                            ref={markerRef}
                            coordinate={region}
                        // coordinate={markerPosition}
                        // anchor={{ x: 0.80, y: 0.80 }}
                        >
                        </MarkerAnimated>
                    </Animated>

                    <Container
                        containerStyle={{
                            backgroundColor: 'white',
                            elevation: 1.5,
                            position: 'absolute',
                            justifyContent: "center",
                            alignItems: 'center',
                            borderRadius: 45,
                            bottom: 15,
                            right: 10,
                        }}
                        width={45} height={45}
                        onPress={requestLocationPermission}
                    >
                        <MaterialIcons
                            name="my-location"
                            size={25}
                            color="black"
                        />
                    </Container>
                </View>
                <Container containerStyle={{ backgroundColor: 'white', height: screenHeight * 0.35 }}>
                    <Container containerStyle={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Label
                            textColor='black'
                            mpLabel={{ pv: 15, ph: 15 }}
                            style={{ fontFamily: fonts.semiBold }}
                            labelSize={16}
                        >{'Choose your location'}</Label>
                    </Container>

                    <Container containerStyle={{
                        height: 75,
                        flexDirection: 'row',
                        borderTopWidth: 1,
                        borderColor: 'lightgrey'
                    }}
                        mpContainer={{ pv: 15, mh: 10 }}
                    >
                        {
                            addressAvailable ?
                                <>
                                    <Ionicons
                                        name='ios-location'
                                        size={30}
                                        color={colors.light_pink}
                                    />
                                    <Container containerStyle={{ flex: 1 }}
                                        mpContainer={{ ph: 10 }}
                                    >
                                        {mapAddress?.area == null ?
                                            <Label
                                                labelSize={16}
                                                textColor='black'
                                                style={{ fontFamily: fonts.regular }}
                                            >{mapAddress?.city}</Label>
                                            :
                                            <Label
                                                labelSize={16}
                                                textColor='black'
                                                style={{ fontFamily: fonts.regular }}
                                            >{mapAddress?.area}</Label>
                                        }

                                        <Label
                                            labelSize={14}
                                            mpLabel={{ mt: 4 }}
                                            numberOfLines={1}
                                            textColor='grey'
                                        >{mapAddress?.address}</Label>
                                    </Container>
                                </>
                                :
                                <Label
                                    labelSize={16}
                                    textColor={colors.Black}
                                    mpLabel={{ mh: 20 }}
                                    style={{ textAlign: 'center' }}
                                >{"Sorry!, We can't able to get this location."}</Label>
                        }
                    </Container>
                    <Btn
                        title={'Confirm'}
                        textSize={14}
                        btnStyle={{
                            backgroundColor: colors.light_pink,
                            borderRadius: 4,
                            opacity: mapAddress?.address ? 1 : 0.5
                        }}
                        btnHeight={40}
                        mpBtn={{ ph: 10, mh: 15, mt: 15 }}
                        textColor='white'
                        labelStyle={{ fontFamily: fonts.regular }}
                        disabled={!mapAddress?.address}
                        onPress={editLocationHandler}
                    />
                </Container>
            </ScrollView>
        </MainContainer>
    )
}

export default EditLocation;