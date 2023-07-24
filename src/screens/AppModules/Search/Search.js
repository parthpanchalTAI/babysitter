import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import Img from "../../../components/Img";
import Container from "../../../components/Container";
import Label from "../../../components/Label";
import { useNavigation } from "@react-navigation/native";
import { images } from "../../../assets/Images";
import { fonts } from "../../../assets/Fonts/fonts";
import InputBox from "../../../components/InputBox";
import { colors } from "../../../assets/Colors/colors";
import { Arrays } from "../../../../Arrays";
import SearchNameLists from "../../../components/ListsViews/SearchNameLists/SearchNameLists";

const Search = () => {

    const navigation = useNavigation();

    const [search, setSearch] = useState('');
    const [nameLists, setNameLists] = useState([]);

    useEffect(() => {
        setNameLists(nameLists);
    }, []);

    useEffect(() => {
        if (search) {
            searchHandler();
        }
    }, [search]);

    const searchHandler = () => {
        let text = search.toLowerCase();
        let names = nameLists.filter((item, index) => {
            return item?.name?.toLowerCase().includes(text);
        });
        setNameLists(names);
    }

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
                <Label labelSize={18} style={{ fontFamily: fonts.bold }} mpLabel={{ mt: 45 }}>Search</Label>
            </Container>
        )
    }

    const _renderNamesLists = ({ item }) => {
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
                onChangeText={setSearch}
                rightIcon={() => {
                    return (
                        <Img
                            imgSrc={images.search_img}
                            imgStyle={styles.search_img}
                        />
                    )
                }}
            />

            <FlatList
                data={nameLists}
                renderItem={_renderNamesLists}
                keyExtractor={(_, index) => index.toString()}
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


// import React, { useState, useEffect } from 'react';
// import { View, TextInput, FlatList, Text } from 'react-native';
// import axios from 'axios';

// const SearchScreen = () => {
//   const [searchText, setSearchText] = useState('');
//   const [searchResults, setSearchResults] = useState([]);

//   const fetchSearchResults = async (query) => {
//     try {
//       const response = await axios.get(`your_search_api_url?q=${query}`);
//       setSearchResults(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     if (searchText) {
//       fetchSearchResults(searchText);
//     } else {
//       setSearchResults([]); // Clear search results when the search text is empty
//     }
//   }, [searchText]);

//   const renderItem = ({ item }) => (
//     <View>
//       <Text>{item.name}</Text>
//     </View>
//   );

//   return (
//     <View>
//       <TextInput
//         value={searchText}
//         onChangeText={setSearchText}
//         placeholder="Search by name"
//       />
//       <FlatList
//         data={searchResults}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//       />
//     </View>
//   );
// };

// export default SearchScreen;
