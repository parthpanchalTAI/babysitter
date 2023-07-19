import React from 'react';
import Container from '../../Container';
import Label from '../../Label';
import { colors } from '../../../assets/Colors/colors';
import { fonts } from '../../../assets/Fonts/fonts';

const CountryList = ({ flag, dial_code, name, goToCountry }) => {
    return (
        <Container containerStyle={{
            flexDirection: "row",
            alignItems: 'center',
            justifyContent: 'space-between'
        }}
            mpContainer={{ ph: 15 }}
            height={50}
            onPress={goToCountry}
        >
            <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                <Label
                    labelSize={20}
                >{flag}</Label>
                <Label
                    labelSize={16}
                    textColor={colors.Black}
                    style={{ fontFamily: fonts.regular }}
                    mpLabel={{ mh: 10 }}
                >{name} ({dial_code})</Label>
            </Container>
        </Container>
    );
};

export default React.memo(CountryList);