import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import PagerView from "react-native-pager-view";
import { colors } from "../../../assets/Colors/colors";
import Container from "../../../components/Container";
import { hs, vs } from "../../../utils/styleUtils";
import FirstScreen from "./FirstScreen";
import SecondScreen from "./SecondScreen";
import ThirdScreen from "./ThirdScreen";
import Label from "../../../components/Label";
import { fonts } from "../../../assets/Fonts/fonts";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

const AppIntro = () => {

    const navigation = useNavigation();

    const [pagePosition, setPagePosition] = useState(0);
    const viewPagerRef = useRef(null);

    console.log('pagepos', pagePosition);

    return (
        <Container containerStyle={styles.appIntroContainer}>
            <PagerView
                style={{ flex: 1 }}
                initialPage={pagePosition}
                onPageSelected={(e) => {
                    setPagePosition(e.nativeEvent.position)
                }}
                ref={viewPagerRef}
            >
                <View key='1'>
                    <FirstScreen />
                </View>

                <View key='2' >
                    <SecondScreen />
                </View>

                <View key='3' >
                    <ThirdScreen />
                </View>
            </PagerView>

            <Container containerStyle={styles.indicatosStyles}>
                <Container
                    containerStyle={{
                        borderWidth: 1,
                        height: vs(10),
                        borderRadius: 10,
                        width: hs(10),
                        borderColor: pagePosition == 0 ? colors.light_pink : '#b2b2b2',
                        backgroundColor: pagePosition == 0 ? colors.light_pink : 'white',
                        marginLeft: hs(5),
                    }}
                />

                <Container containerStyle={{
                    borderWidth: 1,
                    height: vs(10),
                    borderRadius: 10,
                    width: hs(10),
                    borderColor: pagePosition == 1 ? colors.light_pink : "#b2b2b2",
                    backgroundColor: pagePosition == 1 ? colors.light_pink : "white",
                    marginLeft: hs(5)
                }}
                />

                <Container containerStyle={{
                    borderWidth: 1,
                    height: vs(10),
                    borderRadius: 10,
                    width: hs(10),
                    borderColor: pagePosition == 2 ? colors.light_pink : "#b2b2b2",
                    backgroundColor: pagePosition == 2 ? colors.light_pink : "white",
                    marginLeft: hs(5)
                }}
                />
            </Container>

            <Container containerStyle={styles.headingStyles}>
                <Label
                    labelSize={20}
                    textColor={pagePosition == 2 ? colors.light_pink : colors.Input_Gray_text}
                    style={{ fontFamily: fonts.regular }}
                    onPress={() => {
                        if (pagePosition == 2) {
                            navigation.navigate('LoginOptions');
                        } else {
                            viewPagerRef.current?.setPage(pagePosition + 1)
                        }
                    }}
                >{pagePosition == 2 ? 'Get started' : 'Skip'}</Label>
            </Container>
        </Container>
    )
}

export default AppIntro;