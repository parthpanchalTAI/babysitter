import React from "react";
import { images } from "../../../assets/Images";
import Img from "../../../components/Img";
import Label from "../../../components/Label";
import Container from "../../../components/Container";
import styles from "./styles";

const FirstScreen = ({

}) => {
    return (
        <>
            <Img
                imgSrc={images.intro1_img}
                imgStyle={styles.introScreenImgs}
            />
            <Container containerStyle={styles.introScreensContainer} mpContainer={{ mb: 125 }}>
                <Label
                    style={styles.introScreenTitleText}
                    labelSize={35}
                >Discover</Label>

                <Container mpContainer={{ mh: 10 }}>
                    <Label
                        style={styles.introScreenDescTexts}
                        labelSize={16}
                        mpLabel={{ mt: 15 }}
                    >Discover service near you lorem ipsum dolor</Label>

                    <Label
                        style={styles.introScreenDescTexts}
                        labelSize={16}
                        mpLabel={{ mt: 0 }}
                    >is amet near you lorem discover service.</Label>

                    <Label
                        style={styles.introScreenDescTexts}
                        labelSize={16}
                        mpLabel={{ mt: 0 }}
                    >near you.</Label>
                </Container>
            </Container>
        </>
    )
}

export default FirstScreen;