import React from 'react';
import { useSetRecoilState } from 'recoil';
import ToastState from '../recoil/toast';

const useReactNativeWebView = () => {
    const sendToast = useSetRecoilState(ToastState);
    const isRNWebView = !!window.isRNWebView;

    const sendMessage = (payload:{ type: string, data?:any }) => {
        if (window.isRNWebView) {
            // window.RNPlatform
            window.ReactNativeWebView.postMessage(JSON.stringify(payload));
        } else {
            sendToast({
                open: true,
                message: '제품 등록은 모바일 앱으로만 가능합니다.',
                type: 'error'
            });
        }
    }

    return { isRNWebView, sendMessage };
}

export default useReactNativeWebView;