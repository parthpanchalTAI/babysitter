import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loader from './Loader'

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
    disableSafeAreaView?: boolean
}

const MainContainer: React.FC<Props> = ({
    children,
    style,
    topEdge,
    disableSafeAreaView
}) => {

    if (disableSafeAreaView) {
        return <View style={[{
            flex: 1,
            backgroundColor: "white",
        }, style]} >
            {children}
        </View>
    } else {
        return (
            <SafeAreaView
                style={[{
                    flex: 1,
                    backgroundColor: "white",
                }, style]}
                edges={
                    topEdge ?
                        ['bottom', 'left', 'right', 'top']
                        :
                        ['bottom', 'left', 'right']
                }
            >
                {children}
            </SafeAreaView>
        );
    }
};

export default Loader(MainContainer)