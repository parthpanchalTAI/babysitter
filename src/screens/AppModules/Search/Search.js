import React, { useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import Img from "../../../components/Img";
import Container from "../../../components/Container";
import Label from "../../../components/Label";
import { useNavigation } from "@react-navigation/native";
import { images } from "../../../assets/Images";
import { fonts } from "../../../assets/Fonts/fonts";
import InputBox from "../../../components/InputBox";
import { colors } from "../../../assets/Colors/colors";

const Search = () => {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => {
                return renderHeader();
            }
        });
    }, []);

    const renderHeader = () => {
        return (
            <Container containerStyle={{ backgroundColor: 'white', flexDirection: 'row', alignItems: 'center' }}>
                <Img
                    imgSrc={images.back_img}
                    mpImage={{ mt: 45, mh: 15 }}
                    imgStyle={styles.back_img}
                    onPress={() => navigation.goBack()}
                />
                <Label labelSize={18} style={{ fontFamily: fonts.bold }} mpLabel={{ mt: 45 }}>Search</Label>
            </Container>
        )
    }

    return (
        <View style={styles.container}>
            <InputBox
                placeholder={'Search here...'}
                containerStyle={styles.inputStyle}
                height={50}
                mpContainer={{ mt: 25, mh: 20 }}
                mpInput={{ ph: 10 }}
                inputStyle={{ color: colors.Black }}
                rightIcon={() => {
                    return (
                        <Img
                            imgSrc={images.search_img}
                            imgStyle={styles.search_img}
                        />
                    )
                }}
            />
        </View>
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