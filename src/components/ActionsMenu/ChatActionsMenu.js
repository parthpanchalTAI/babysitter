import React from "react";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'
import Img from "../Img";
import { images } from "../../assets/Images";
import { fonts } from "../../assets/Fonts/fonts";
import Label from "../Label";
import { hs, vs } from "../../utils/styleUtils";
import { useDispatch, useSelector } from "react-redux";
import { block_unBlock_OppUserApi } from "../../features/chatSlice";
import { chatActionHandler } from "../../features/whiteLists";
import { useNavigation } from "@react-navigation/native";

const ChatActionsMenu = ({
    headerHeight,
    user_id
}) => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { chatAction } = useSelector((state) => state?.whiteLists);

    const blockHandler = async () => {
        let formData = new FormData();
        formData.append('user_id', user_id);

        const response = await dispatch(block_unBlock_OppUserApi({ data: formData })).unwrap();
        console.log('res', response);

        if (response?.status == 'Success') {
            dispatch(chatActionHandler(true));
            navigation.navigate('Chat');
        }
    }

    const unBlockHandler = async () => {
        let formData = new FormData();
        formData.append('user_id', user_id);

        const response = await dispatch(block_unBlock_OppUserApi({ data: formData })).unwrap();
        console.log('res', response);

        if (response?.status == 'Success') {
            dispatch(chatActionHandler(false));
            navigation.navigate('Chat');
        }
    }

    return (
        <Menu
            style={{
                marginTop: vs(5),
                marginHorizontal: hs(10)
                // top: headerHeight / 4 - 5
            }}
        >
            <MenuTrigger>
                <Img
                    imgSrc={images.more_img}
                    imgStyle={{
                        width: 18,
                        height: 18,
                        resizeMode: 'contain',
                        tintColor: 'black'
                    }}
                />
            </MenuTrigger>
            <MenuOptions
                customStyles={{
                    optionWrapper: {
                        padding: 0,
                        paddingHorizontal: 15,
                        paddingVertical: 8
                    },
                    optionsContainer: {
                        marginTop: 40,
                        padding: 0,
                        paddingVertical: 5,
                        borderRadius: 5
                    }
                }}
            >
                <MenuOption>
                    {chatAction == false ?
                        <Label
                            labelSize={14}
                            style={{ fontFamily: fonts.regular }}
                            onPress={blockHandler}
                        >{chatAction == false ? 'Block' : 'UnBlock'}</Label>
                        :
                        <Label
                            labelSize={14}
                            style={{ fontFamily: fonts.regular }}
                            onPress={unBlockHandler}
                        >{'UnBlock'}</Label>
                    }
                </MenuOption>
            </MenuOptions>
        </Menu>
    )
}

export default ChatActionsMenu;