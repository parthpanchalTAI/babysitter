import React from 'react';
import { StyleSheet } from 'react-native';
import Label from './Label';
import Container from './Container';
import { fonts } from '../assets/Fonts/fonts';
import Img from './Img';
import { images } from '../assets/Images';

const CustomRadioButton = ({ label, selected, onPress }) => {
    return (
        <Container onPress={onPress} mpContainer={{ mt: 20, mh: 20 }} containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Label labelSize={16} style={{ fontFamily: fonts.regular }}>{label}</Label>
            {selected == true ?
                <Img
                    imgSrc={images.radio_select}
                    imgStyle={{
                        width: 20,
                        height: 20,
                        resizeMode: 'contain',
                    }}
                />
                :
                <Img
                    imgSrc={images.radio_unselect}
                    imgStyle={{
                        width: 20,
                        height: 20,
                        resizeMode: 'contain',
                    }}
                />
            }
        </Container>
    );
};

const styles = StyleSheet.create({
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    radio: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#000',
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRadio: {
        borderColor: '#00f',
        backgroundColor: '#00f',
    },
    label: {
        fontSize: 16,
    },
});

export default CustomRadioButton;
