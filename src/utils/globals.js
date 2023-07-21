import { Platform,StatusBar } from "react-native";
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import { screenHeight } from "./styleUtils";

export function getStatusBarHeight(val = 0){
    const insets = useSafeAreaInsets();
    return Platform.OS == "android" ? StatusBar.currentHeight + val : insets.top + val;
}

export const token = "";
export const fcmToken = "";

export const toastMsg = {
    success: '',
    error: ''
}

export const HEADER_MAX_HEIGHT = screenHeight * 0.45;
export const HEADER_MIN_HEIGHT = Platform.OS == 'ios' ? 85 + 40 : 85;

export const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;