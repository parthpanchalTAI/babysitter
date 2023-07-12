import React from "react";
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'
import Img from "../Img";
import { images } from "../../assets/Images";
import { fonts } from "../../assets/Fonts/fonts";
import Label from "../Label";
import { hs, vs } from "../../utils/styleUtils";

const ChatActionsMenu = ({
    headerHeight,
}) => {
    return (
        <Menu
            style={{
                marginTop: vs(45),
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
                    <Label
                        labelSize={14}
                        style={{ fontFamily: fonts.regular }}
                    >{'Block'}</Label>
                </MenuOption>
                
                <MenuOption>
                    <Label
                        labelSize={14}
                        style={{ fontFamily: fonts.regular }}
                    >{'Report'}</Label>
                </MenuOption>
            </MenuOptions>
        </Menu>
    )
}

export default ChatActionsMenu;