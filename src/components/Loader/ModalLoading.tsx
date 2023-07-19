import React from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';

import Modal from 'react-native-modal';
import { hs } from '../../utils/styleUtils';
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
            backdropOpacity={0.6}
            useNativeDriverForBackdrop={true}
            useNativeDriver={true}
            animationIn="fadeIn"
            animationOut="fadeOut"
            deviceHeight={999999999}
        >
            <View style={{
                // backgroundColor: "white",
                // width: "80%",
                marginHorizontal: 20,
                height: 60,
                borderRadius: 2,
                justifyContent: "center",
                alignItems: 'center'
                // paddingLeft: 40
            }}>
                <View style={{ flexDirection: "row", flex: 1, justifyContent: 'center', alignItems: 'center' }} >
                    <ActivityIndicator
                        // animating={true}
                        color={colors.light_pink} size={25}
                    />
                    {/* <Text style={styles.text1} >{loadingLabel || "Loading..."}</Text> */}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    text1: {
        fontSize: hs(15),
        color: "black",
        marginLeft: 10,
        // letterSpacing: 0.5
    },
});

export default ModalLoading;