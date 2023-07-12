import { StyleSheet } from "react-native";
import { screenHeight, screenWidth, vs } from "../../../utils/styleUtils";
import { colors } from "../../../assets/Colors/colors";
import { fonts } from "../../../assets/Fonts/fonts";

const styles = StyleSheet.create({
    appIntroContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    appIntroIndicateAndBtnContain: {

    },
    indicatosStyles: {
        flexDirection: 'row', position: 'absolute', bottom: 90, alignSelf: 'center'
    },
    headingStyles: {
        flexDirection: 'row', position: 'absolute', bottom: 20, alignSelf: 'center'
    },
    appIntroBtn: {
        backgroundColor: colors.light_pink,
        borderRadius: 50,
        justifyContent: 'center',
        width: '33%',
        right: 0,
        position: 'absolute',
        bottom: vs(15)
    },
    rightArrowImg: {
        width: 15,
        height: 15,
        resizeMode: 'contain',
    },
    introScreenImgs: {
        width: "100%",
        height: screenHeight * 0.60,
        resizeMode: 'stretch',
    },
    introScreensContainer: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
    },
    introScreenTitleText: {
        fontFamily: fonts.bold,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    introScreenDescTexts: {
        fontFamily: fonts.bold,
        textAlign: 'center'
    }
})

export default styles;