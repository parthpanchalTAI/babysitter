import React, { useCallback, useEffect } from "react";
import { Platform, StatusBar, StatusBarProps, StatusBarStyle } from 'react-native';

const useStatusBar = (props: StatusBarProps) => {
    return useEffect(() => {
        StatusBar.setBackgroundColor(props?.backgroundColor || 'transparent')
        if (Platform.OS == 'ios') {
            StatusBar.setBarStyle(props?.barStyle || 'dark-content')
        } else {
            StatusBar.setBarStyle(props?.barStyle || 'dark-content');
            StatusBar.setTranslucent(props?.translucent || true)
        }
        return () => {
            StatusBar.setBarStyle('dark-content');
        }
    }, []);
}

export default useStatusBar;