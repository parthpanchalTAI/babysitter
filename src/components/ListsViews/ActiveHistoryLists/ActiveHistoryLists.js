import React from "react";
import Container from "../../Container";
import Img from "../../Img";
import Label from "../../Label";
import { fonts } from "../../../assets/Fonts/fonts";
import { colors } from "../../../assets/Colors/colors";
import { images } from "../../../assets/Images";
import { useNavigation } from "@react-navigation/native";
import { hs, vs } from "../../../utils/styleUtils";
import { imageBaseUrl } from "../../../utils/apiEndPoints";

const ActiveHistoryLists = ({
    id,
    start_date,
    end_date,
    start_time,
    end_time,
    booked_by_details
}) => {

    const navigation = useNavigation();

    const activeHistoryDetails = {
        id,
        start_date,
        end_date,
        start_time,
        end_time,
        booked_by_details
    }

    return (
        <Container onPress={() => navigation.navigate('ActiveHistoryDetails', { activeHistoryDetails: activeHistoryDetails })} containerStyle={{ borderWidth: 0, borderRadius: 10, borderColor: '#f2f2f2' }} mpContainer={{ mt: 15 }}>
            <Container containerStyle={{ flexDirection: 'row', justifyContent: 'space-between' }} mpContainer={{ mh: 15 }}>
                <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }}>
                    {booked_by_details?.profile_image ?
                        <Img
                            imgSrc={{ uri: `${imageBaseUrl}${booked_by_details?.profile_image}` }}
                            imgStyle={{
                                width: hs(90),
                                height: vs(90),
                                borderRadius: 10,
                                resizeMode: 'contain'
                            }}
                        />
                        :
                        <Container containerStyle={{ borderWidth: 1, borderRadius: 10, borderColor: '#f2f2f2' }} height={vs(90)} width={hs(90)} />
                    }
                    <Container mpContainer={{ mh: 10, mb: 5 }}>
                        <Label labelSize={16} style={{ fontFamily: fonts.bold, fontWeight: 'bold' }}>{booked_by_details?.first_name} {booked_by_details?.last_name}</Label>
                        <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }} mpContainer={{ mt: 5 }}>
                            <Img
                                imgSrc={images.calender_img}
                                imgStyle={{
                                    width: 18,
                                    height: 18,
                                    resizeMode: 'contain',
                                    tintColor: colors.Input_Gray_text
                                }}
                                mpImage={{ mt: 2 }}
                            />
                            <Label labelSize={14} mpLabel={{ ml: 10, mt: 2 }} style={{ fontFamily: fonts.regular, color: colors.Input_Gray_text }}>{start_date} to {end_date}</Label>
                        </Container>

                        <Container containerStyle={{ flexDirection: 'row', alignItems: 'center' }} mpContainer={{ mt: 6 }}>
                            <Img
                                imgSrc={images.time_img}
                                imgStyle={{
                                    width: 18,
                                    height: 18,
                                    resizeMode: 'contain',
                                    tintColor: colors.Input_Gray_text
                                }}
                                mpImage={{ mt: 2 }}
                            />
                            <Label labelSize={14} mpLabel={{ ml: 10, mt: 2 }} style={{ fontFamily: fonts.regular, color: colors.Input_Gray_text }}>{start_time} to {end_time}</Label>
                        </Container>
                    </Container>
                </Container>
            </Container>
        </Container>
    )
}

export default ActiveHistoryLists;