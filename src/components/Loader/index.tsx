import React, { ComponentType, ReactNode } from "react";
import { StyleProp, ViewStyle } from 'react-native'
import Loading from "./Loading";
import ModalLoading from "./ModalLoading";
import { useToastMsg } from "../../hooks/useToastMsg";

interface Props {
    children: ReactNode,
    loading?: boolean,
    absoluteLoading?: boolean,
    loaderTop?: number,
    modalLoading?: boolean,
    style?: StyleProp<ViewStyle>,
    absoluteModalLoading?: boolean,
    loadingLabel?: string,
    statusBarHeight?: boolean,
    errorMessage?: {
        data: {
            message: string
        },
        status: string
    } | any,
    successMessage?: string,
    topEdge?: boolean,
    disableSafeAreaView?: boolean
}

const Loader = (WrapperComponent: ComponentType<Props>) => (props: Props) => {
    const {
        children,
        loading,
        absoluteLoading,
        loaderTop,
        modalLoading,
        absoluteModalLoading,
        loadingLabel,
        style
    } = props;

    useToastMsg();

    const absoluteLoadingContainer = () => {
        if (absoluteModalLoading) return <ModalLoading  {...props} />;
        if (absoluteLoading) return <Loading {...props} />;
    };
    const loadingContainer = () => {
        if (modalLoading) return <ModalLoading {...props} />;
        if (loading) return <Loading {...props} />;
        return children;
    };

    if (loading || modalLoading) {
        return loadingContainer();
    } else {
        return (
            <>
                <WrapperComponent {...props} />
                {absoluteLoadingContainer()}
            </>
        );
    }
};

export default Loader;