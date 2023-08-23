import { Platform,StatusBar } from "react-native";
import {useSafeAreaInsets} from 'react-native-safe-area-context'

export function getStatusBarHeight(){
    const insets = useSafeAreaInsets();
    return Platform.OS == "android" ? StatusBar.currentHeight : insets.top
}

export const token = "";
export const fcmToken = "";

export const map_api_key = "AIzaSyCcpWzpQZiLj_7OBeFpxK8SlYkcy1njEH8";

export const firebase_server_key = 'AAAAGxsxsKs:APA91bF6ITIrWxnMvMu9lGhCzmz7hGHPfQnSh-mAWQGz4yRYinxLahgjJb94tgx6cPV39g60EMief7gq01ZlAti5NcVp-kEcvkPlxikSQI36qatDREdK9ua_grXKxmXJwjQjNx84XZa2';

// export const toastMsg = {
//     success: '',
//     error: ''
// }

// export const HEADER_MAX_HEIGHT = screenHeight * 0.45;
// export const HEADER_MIN_HEIGHT = Platform.OS == 'ios' ? 85 + 40 : 85;

// export const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;