import React from "react";
import Container from "../../Container";
import Label from "../../Label";
import Img from "../../Img";
import { fonts } from "../../../assets/Fonts/fonts";
import { imageBaseUrl } from "../../../utils/apiEndPoints";
import { hs, vs } from "../../../utils/styleUtils";

const SearchNameLists = ({
    first_name,
    last_name,
    profile_image,
}) => {

    return (
        <Container mpContainer={{ mt: 20, mh: 20 }}>
            <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                {profile_image ?
                    <Img
                        imgSrc={{ uri: `${imageBaseUrl}${profile_image}` }}
                        imgStyle={{
                            width: 50,
                            height: 50,
                            borderRadius: 100,
                            resizeMode: 'contain'
                        }}
                    />
                    :
                    <Container containerStyle={{ borderWidth: 1, borderRadius: 100, borderColor: '#f2f2f2' }} height={vs(50)} width={hs(50)} />
                }
                <Label mpLabel={{ ml: 15 }} labelSize={16} style={{ fontFamily: fonts.regular }}>{first_name} {last_name}</Label>
            </Container>
        </Container>
    )
}

export default SearchNameLists;