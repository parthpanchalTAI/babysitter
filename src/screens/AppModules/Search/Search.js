import React, { useEffect, useLayoutEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import Img from "../../../components/Img";
import Container from "../../../components/Container";
import Label from "../../../components/Label";
import { useNavigation } from "@react-navigation/native";
import { images } from "../../../assets/Images";
import { fonts } from "../../../assets/Fonts/fonts";
import InputBox from "../../../components/InputBox";
import { colors } from "../../../assets/Colors/colors";
import { useSelector } from "react-redux";
import { vs } from "../../../utils/styleUtils";
import SearchNameLists from "../../../components/ListsViews/SearchNameLists/SearchNameLists";

const Search = () => {

    const navigation = useNavigation();

    const [search, setSearch] = useState('');
    const [nameLists, setNameLists] = useState([]);
    const [loading, setLoading] = useState(false);

    const { token } = useSelector((state) => state?.whiteLists);

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => {
                return renderHeader();
            }
        });
    }, []);

    const renderHeader = () => {
        return (
            <Container onPress={() => navigation.goBack()} containerStyle={{ backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                <Img
                    imgSrc={images.back_img}
                    mpImage={{ mt: 45, mh: 15 }}
                    imgStyle={styles.back_img}
                />
                <Label labelSize={18} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }} mpLabel={{ mt: 45 }}>Search</Label>
            </Container>
        )
    }

    useEffect(() => {
        // if (search) {
        //     searchHandler();
        // }
        searchHandler();
    }, [search]);

    const searchHandler = async () => {
        setLoading(true);
        const response = await fetch(`https://chessmafia.com/php/D-2104/BabySitter/api/babysitter/search-name?search=${search}`, {
            method: 'GET',
            headers: {
                'custom-token': token || ''
            }
        })
        const searchData = await response.json();
        console.log("searchData", searchData);
        setNameLists(searchData.data);
        setLoading(false);
    }

    const handleTextInputChange = (text) => {
        setSearch(text);
        console.log('text', text);

        if (text === '') {
            searchHandler();
        } else {
            setNameLists([]);
        }
    };

    const _renderNameLists = ({ item }) => {
        return <SearchNameLists {...item} />
    }

    return (
        <Container containerStyle={styles.container}>
            <InputBox
                placeholder={'Search here...'}
                containerStyle={styles.inputStyle}
                height={50}
                mpContainer={{ mt: 25, mh: 20 }}
                mpInput={{ ph: 10 }}
                inputStyle={{ color: colors.Black }}
                value={search}
                onChangeText={handleTextInputChange}
                rightIcon={() => {
                    return (
                        <Img
                            imgSrc={images.search_img}
                            imgStyle={styles.search_img}
                        />
                    )
                }}
            />

            {loading ? <ActivityIndicator size="large" color={colors.light_pink} style={{ marginTop: vs(50) }} /> : null}

            <FlatList
                data={nameLists}
                renderItem={_renderNameLists}
                keyExtractor={(_, id) => id.toString()}
                contentContainerStyle={{
                    paddingBottom: vs(20)
                }}
                showsVerticalScrollIndicator={false}
            />
        </Container>
    )
};

const styles = StyleSheet.create({
    back_img: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    },
    container: {
        flex: 1, backgroundColor: 'white'
    },
    inputStyle: {
        backgroundColor: '#fff',
        borderColor: '#f2f2f2',
        borderWidth: 1,
        borderRadius: 40,
    },
    search_img: {
        width: 18,
        height: 18,
        resizeMode: 'contain',
        tintColor: '#b2b2b2',
        position: 'absolute',
        right: 15,
    }
})

export default Search;