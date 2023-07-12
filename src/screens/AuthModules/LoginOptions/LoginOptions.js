import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { images } from "../../../assets/Images";
import Container from "../../../components/Container";
import { screenHeight, screenWidth, vs } from "../../../utils/styleUtils";
import Img from "../../../components/Img";
import Btn from "../../../components/Btn";
import { colors } from "../../../assets/Colors/colors";
import Label from "../../../components/Label";
import { useNavigation } from "@react-navigation/native";

const LoginOptions = () => {

    const navigation = useNavigation();

    return (
        <ImageBackground
            source={images.login_options_bgImg}
            style={styles.img_bg}
            resizeMode="stretch"
        >
            <Container containerStyle={styles.container}>
                <Container containerStyle={{ alignItems: 'center' }} mpContainer={{ mh: 20 }}>
                    <Img
                        imgSrc={images.logo}
                        imgStyle={styles.img_logo}
                    />

                    <Btn
                        title='Need a Babysitter'
                        btnStyle={styles.login_options_btn}
                        btnHeight={50}
                        mpBtn={{ mb: 10 }}
                        textColor={'white'}
                        textSize={16}
                        onPress={() => navigation.navigate('SignUp')}
                    />

                    <Btn
                        title='Become a Babysitter'
                        btnStyle={styles.login_options_btn}
                        btnHeight={50}
                        mpBtn={{ mt: 5 }}
                        textColor={'white'}
                        textSize={16}
                        onPress={() => navigation.navigate('SignUp')}
                    />

                    <Container containerStyle={styles.containerOR} mpContainer={{ mt: 30 }}>
                        <Container width={screenWidth * 0.40} height={1} containerStyle={{ backgroundColor: '#b2b2b2' }} />
                        <Label mpLabel={{ mh: 10 }} labelSize={16} textColor={colors.Input_Gray_text}>Or</Label>
                        <Container width={screenWidth * 0.40} height={1} containerStyle={{ backgroundColor: '#b2b2b2' }} />
                    </Container>

                    <Btn
                        title='Sign in'
                        btnStyle={styles.sign_in_btn}
                        btnHeight={50}
                        mpBtn={{ mt: 25 }}
                        textColor={'white'}
                        textSize={16}
                        onPress={() => navigation.navigate('SignIn')}
                    />
                </Container>
            </Container>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    img_bg: {
        height: "100%",
        width: "100%",
    },
    container: {
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: vs(20),
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    img_logo: {
        width: screenWidth * 0.30,
        height: screenHeight * 0.25,
        resizeMode: "contain",
    },
    login_options_btn: {
        backgroundColor: colors.light_yellow,
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        width: "100%"
    },
    containerOR: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    sign_in_btn: {
        backgroundColor: colors.light_pink,
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        width: "100%"
    }
})

export default LoginOptions;