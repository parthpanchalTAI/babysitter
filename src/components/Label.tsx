import React from "react";
import { Text, StyleProp, TextStyle, TextProps } from 'react-native'
import { fs, mpStyle } from "../utils/styleUtils";
import { fonts } from "../assets/Fonts/fonts";

interface Props {
    onPress?: () => void,
    style?: StyleProp<TextStyle>,
    labelSize?: number,
    mpLabel?: mpStyle,
    textColor?: string,
}

const Label: React.FC<Props & TextProps> = ({
    style,
    children,
    labelSize,
    mpLabel,
    onPress,
    textColor,
    ...restProps
}) => {
    return (
        <Text
            style={[{
                fontSize: fs(labelSize || 12),
                ...mpStyle({ ...mpLabel }),
                color: textColor || 'black',
                fontFamily: fonts.regular
            }, style]}
            {...restProps}
            onPress={onPress}
        >
            {children}
        </Text>
    )
}

export default Label;