import React from "react";
import Container from "../../Container";
import Label from "../../Label";
import Img from "../../Img";
import { fonts } from "../../../assets/Fonts/fonts";
import { imageBaseUrl } from "../../../utils/apiEndPoints";
import { hs, vs } from "../../../utils/styleUtils";
import { useNavigation } from "@react-navigation/native";

const SearchNameLists = ({
    booked_by_details,
    id
}) => {

    const navigation = useNavigation();

    return (
        <Container
            mpContainer={{ mt: 20, mh: 20 }}
            onPress={() => navigation.navigate('JobRequestDetails', { id: id })}
        >
            <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                {booked_by_details?.profile_image ?
                    <Img
                        imgSrc={{ uri: `${imageBaseUrl}${booked_by_details?.profile_image}` }}
                        imgStyle={{
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                            resizeMode: 'stretch'
                        }}
                    />
                    :
                    <Container containerStyle={{ borderWidth: 1, borderRadius: 100, borderColor: '#f2f2f2' }} height={vs(50)} width={hs(50)} />
                }
                <Label mpLabel={{ ml: 15 }} labelSize={16} style={{ fontFamily: fonts.regular }}>{booked_by_details?.first_name} {booked_by_details?.last_name}</Label>
            </Container>
        </Container>
    )
}

export default SearchNameLists;