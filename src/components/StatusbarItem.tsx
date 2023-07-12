import React, { useCallback, useEffect } from "react";
import { Platform, StatusBar, StatusBarProps, StatusBarStyle } from "react-native";

const StatusBarUtil: React.FC<StatusBarProps> = ({ ...props }) => {
    if (Platform.OS === 'ios') {
        return <StatusBar
            barStyle='dark-content'
            backgroundColor='transparent'
        />
    } else {
        return <StatusBar
            barStyle='dark-content'
            translucent={true}
            backgroundColor='transparent'
            {...props}
        />
    }
}

export default StatusBarUtil;