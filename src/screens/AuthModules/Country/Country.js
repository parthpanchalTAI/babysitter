import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import CountryArray from '../../../../CountryArray.json';
import Container from '../../../components/Container';
import InputBox from '../../../components/InputBox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useAppDispatch } from '../../../store';
import CountryLists from '../../../components/ListsViews/CountryLists/CountryLists';
import { screenWidth } from '../../../utils/styleUtils';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../../assets/Colors/colors';
import { setCountryCode } from '../../../features/authSlice';

const Country = ({
    route
}) => {

    const navigation = useNavigation();
    const dispatch = useAppDispatch();

    const [search, setSearch] = useState('');
    const [searchedCountry, setSearchedCountry] = useState([]);

    useEffect(() => { setSearchedCountry(CountryArray); }, []);

    useEffect(() => {
        if (search) {
            searchHandler();
        }
    }, [search]);

    const searchHandler = () => {
        let text = search.toLowerCase();
        let country = CountryArray.filter((item, index) => {
            return item.name.includes(search) || item.name.toLowerCase().includes(text);
            // return item.name.toLowerCase().includes( text ) || item.code == search;
        });
        setSearchedCountry(country);
    };

    const _renderCountry = ({ item, index }) => {
        return <CountryLists
            {...item}
            goToCountry={() => {
                dispatch(setCountryCode(item.flag));
                navigation.navigate({
                    name: route?.params?.fromSignup == true ? 'SignUp' :
                        null,
                    params: { country_flag: item.flag, country_code: item.dial_code, country_name: item.name, countryCode: item.dial_code, navigate: route?.params?.fromSendMoney == true },
                    merge: true
                });
            }}
        />;
    };

    const renderHeader = () => {
        return (
            <Container containerStyle={{
                backgroundColor: 'white',
                height: 90,
                flexDirection: 'row',
                alignItems: 'flex-end'
            }}
                mpContainer={{ ph: 10, pb: 10 }}
            >
                <Ionicons
                    name='ios-close'
                    size={30}
                    color='grey'
                    onPress={() => { navigation.goBack(); }}
                />
                <InputBox
                    placeholder='Search with country,code etc..'
                    placeholderTextColor={'#000'}
                    containerStyle={{
                        borderWidth: 0,
                        borderBottomWidth: 1,
                        width: screenWidth * 0.80
                    }}
                    inputStyle={{ color: colors.Black }}
                    mpContainer={{ mh: 10, mt: -10 }}
                    value={search}
                    onChangeText={setSearch}
                />
            </Container>
        );
    };

    return (
        <Container containerStyle={{ flex: 1, backgroundColor: 'white' }}>
            {renderHeader()}
            <FlatList
                data={searchedCountry}
                renderItem={_renderCountry}
                initialNumToRender={15}
                removeClippedSubviews={true}
                keyExtractor={(_, index) => index.toString()}
                getItemLayout={(data, index) => (
                    { length: 50, offset: 50 * index, index }
                )}
            />
        </Container>
    );
};

export default Country;