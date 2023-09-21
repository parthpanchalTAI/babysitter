import React from "react";
import Container from "../../Container";
import Img from "../../Img";
import Label from "../../Label";
import { fonts } from "../../../assets/Fonts/fonts";
import { images } from "../../../assets/Images";
import { StyleSheet } from "react-native";
import { colors } from "../../../assets/Colors/colors";
import { useNavigation } from "@react-navigation/native";
import { hs, vs } from "../../../utils/styleUtils";
import { imageBaseUrl } from "../../../utils/apiEndPoints";

const JobRequestsLists = ({
    id,
    booked_by_details,
}) => {

    const navigation = useNavigation();

    return (
        <Container onPress={() => navigation.navigate('JobRequestDetails', { id: id })} containerStyle={{ borderWidth: 1, borderRadius: 15, borderColor: '#f2f2f2', backgroundColor: '#f2f2f2' }} mpContainer={{ pv: 20, mt: 15 }}>
            <Container>
                <Container mpContainer={{ mh: 15 }} containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                    {booked_by_details?.profile_image ?
                        <Img
                            imgSrc={{ uri: `${imageBaseUrl}${booked_by_details?.profile_image}` }}
                            imgStyle={{
                                width: hs(70),
                                height: vs(70),
                                borderRadius: 100,
                                resizeMode: 'stretch'
                            }}
                        />
                        :
                        <Container containerStyle={{ borderWidth: 1, borderRadius: 100, borderColor: '#b2b2b2', height: vs(70), width: hs(70) }} />
                    }

                    <Container mpContainer={{ mh: 15 }}>
                        <Label labelSize={16} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }}>{booked_by_details?.first_name} {booked_by_details?.last_name}</Label>
                        <Label labelSize={16} style={{ fontFamily: fonts.regular }}>{booked_by_details?.email}</Label>
                    </Container>
                </Container>

                <Container containerStyle={{ borderWidth: 1, borderColor: 'lightgrey' }} mpContainer={{ mh: 20, mt: 15 }} />

                <Container containerStyle={{ flexDirection: 'row', justifyContent: 'space-between' }} mpContainer={{ mh: 20, mt: 15 }}>
                    <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Img
                            imgSrc={images.pin4_img}
                            imgStyle={{
                                width: 15,
                                height: 15,
                                resizeMode: 'contain',
                            }}
                        />
                        <Label mpLabel={{ ml: 5 }} labelSize={14} style={{ fontFamily: fonts.regular }}>{booked_by_details?.address}</Label>
                    </Container>

                    {/* <Container>
                        <Label mpLabel={{ ml: 5 }} labelSize={14} style={{ fontFamily: fonts.regular }}>{'ETA'}</Label>
                        <Label mpLabel={{ ml: 5 }} labelSize={14} style={{ fontFamily: fonts.regular }}>{'10-15 min'}</Label>
                    </Container> */}
                </Container>
            </Container>

            {/* <Container mpContainer={{ mh: 20 }} containerStyle={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Btn
                    title='Decline'
                    btnStyle={styles.btn_style}
                    btnHeight={45}
                    mpBtn={{ mt: 15 }}
                    textColor={'black'}
                    textSize={16}
                />

                <Btn
                    title='Accept'
                    btnStyle={styles.accept_btn_style}
                    btnHeight={45}
                    mpBtn={{ mt: 15 }}
                    textColor={'white'}
                    textSize={16}
                />
            </Container> */}
        </Container>
    )
}

const styles = StyleSheet.create({
    btn_style: {
        backgroundColor: 'lightgrey',
        borderRadius: 5,
        justifyContent: 'center',
        width: "48%"
    },
    accept_btn_style: {
        backgroundColor: colors.light_pink,
        borderRadius: 5,
        justifyContent: 'center',
        width: "48%"
    }
})

export default JobRequestsLists;