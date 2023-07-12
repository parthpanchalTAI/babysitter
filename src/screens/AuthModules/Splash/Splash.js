import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { images } from "../../../assets/Images";
import { screenWidth } from "../../../utils/styleUtils";
import useStatusBar from "../../../hooks/useStatusbar";

export const Splash = () => {

    useStatusBar({ barStyle: 'dark-content', backgroundColor: 'transparent' });

    return (
        <View style={styles.container}>
            <Image
                source={images.bgImg}
                style={styles.splashImage}
            />
            <Image
                source={images.logo}
                style={styles.splashInner}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    splashImage: {
        width: '100%',
        height: '100%',
    },
    splashInner: {
        position: "absolute",
        width: screenWidth * 0.60,
        height: screenHeight * 0.60,
        resizeMode: "contain"
    }
})