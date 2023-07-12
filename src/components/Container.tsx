import React, { ReactNode } from "react";
import { StyleSheet, View, StyleProp, ViewStyle, Pressable, PressableProps } from "react-native";
import { hs,vs,mpStyle } from "../utils/styleUtils";

interface Props {
    loading?: boolean,
    absoluteLoading?: boolean,
    loaderTop?: number,
    modalLoading?: boolean,
    style?: StyleProp<ViewStyle>,
    absoluteModalLoading?: boolean,
    loadingLabel?: string,
    statusBarHeight?: boolean,
    errorMessage?: string,
    successMessage?: string,
    topEdge?: boolean,
    disableSafeAreaView?: boolean,
    onPress?: () => void,
    height?: number,
    width?: number,
    mpContainer?: mpStyle,
    containerStyle?: StyleProp<ViewStyle>,
    children?: ReactNode
}

const Container: React.FC<Props & PressableProps> = ({
    onPress,
    containerStyle,
    children,
    height,
    mpContainer,
    width,
    ...props
}) => {
    const styles = StyleSheet.create({
        containerStyle: {
            height: height && vs(height),
            width: width && hs(width),
            ...mpStyle({ ...mpContainer })
        }
    })

    if (onPress) {
        return (
            <Pressable
                onPress={onPress}
                style={[styles.containerStyle, containerStyle]}
                {...props}
            >
                {children}
            </Pressable>
        )
    }
    return (
        <View style={[styles.containerStyle, containerStyle]}>
            {children}
        </View>
    )
}

export default Container;