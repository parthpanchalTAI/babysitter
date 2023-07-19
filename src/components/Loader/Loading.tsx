import React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { View, ActivityIndicator } from 'react-native';
import { colors } from '../../assets/Colors/colors';

interface Props {
    absoluteLoading?: boolean,
    loaderTop?: number,
    style?: StyleProp<ViewStyle>,
}

const Loading: React.FC<Props> = ({ absoluteLoading, loaderTop, style: viewStyle }) => {
    let style
    if (absoluteLoading) {
        style = styles.absLoadingContainer
    }
    if (!absoluteLoading) {
        if (loaderTop) {
            style = styles.loaderTopStyle
        }
        style = styles.loadingContainer
    }

    // console.log('viewStyle', viewStyle)

    return (
        <View style={[style, {
            marginTop: loaderTop || 0,
            backgroundColor:'white'
        },viewStyle]}>
            <ActivityIndicator size="large" color={colors.light_pink} />
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    absLoadingContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.5)',
        zIndex: 100
    },
    loaderTopStyle: {
        marginTop: 100,
    }
});

export default Loading;