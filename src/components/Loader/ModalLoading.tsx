import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Platform,
    ActivityIndicator,
    StatusBar
} from 'react-native';

import Modal from 'react-native-modal';
import { fs, hs, vs } from '../../utils/styleUtils';
import { colors } from '../../assets/Colors/colors';

interface Props {
    absoluteModalLoading?: boolean,
    loadingLabel?: string,
}

const ModalLoading: React.FC<Props> = ({
    absoluteModalLoading,
    loadingLabel,
    ...props
}) => {
    return (
        <Modal
            isVisible={true}
            statusBarTranslucent={true}
            backdropOpacity={0.5}
            useNativeDriverForBackdrop={true}
            useNativeDriver={true}
            animationIn="fadeIn"
            animationOut="fadeOut"
            deviceHeight={999999999}
        >
            <View style={{
                backgroundColor: "white",
                width: "90%",
                height: 65,
                borderRadius: 2,
                justifyContent: "center",
                alignItems: 'center',
                alignSelf: 'center',
                elevation: 20
            }}>
                <View style={{ flexDirection: "row", alignItems: 'center' }} >
                    <ActivityIndicator
                        animating={true}
                        color={colors.light_pink} size={25}
                    />
                    <Text style={styles.text1} >{loadingLabel || "Loading..."}</Text>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent"
    },
    modalView: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor: "#00000080",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    AnroidActivityIndicatorWrapper: {
        justifyContent: "center",
        width: "80%",
        height: vs(100),
        borderRadius: 2,
        backgroundColor: "white"
    },
    text1: {
        fontSize: fs(14),
        color: "black",
        marginHorizontal: 20,
        letterSpacing: 0.5
    },
    IOSActivityIndicatorWrapper: {
        justifyContent: "center",
        alignItems: "center",
        width: hs(120),
        height: vs(120),
        borderRadius: 10,
        backgroundColor: "white"
    }
});

export default ModalLoading;