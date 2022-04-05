import axios from 'axios';
import qs from 'qs';
import React, { useEffect, useMemo, useState } from 'react'

declare global {
   interface Window {
      Kakao: any
   }
}

const KAKAO_API_KEY = 'a901df17d13f61c89a412946009caaec';
const KAKAO_JAVASCRIPT_KEY = '7635b3273725388aea02be7bafbe9df2';

const useKakaoLogin = (options: { baseUri: string }) => {

   const REDIRECT_URI = useMemo(() => options.baseUri + '/auth/kakao/callback', [options.baseUri]);
   
   // init
   useEffect(() => {
      if (!window.Kakao.isInitialized()) {
         window.Kakao.init(KAKAO_JAVASCRIPT_KEY);
      }
   }, []);

   const getProfile = async (code:string) => {
      try {
         if (window.Kakao.isInitialized()) {

            const payload = qs.stringify({
               grant_type: "authorization_code",
               client_id: KAKAO_API_KEY,
               redirect_uri: REDIRECT_URI,
               code: code,
            })

            const res = await axios.post(
               "https://kauth.kakao.com/oauth/token",
               payload
            );

            window.Kakao.Auth.setAccessToken(res.data.access_token);
            
            // // 액세스 토큰 설정
            // await window.Kakao.Auth.login().then(async () => {
            //    // await window.Kakao.Auth.setAccessToken(authObj.access_token);
            //       let data = await window.Kakao.API.request({ url: "/v2/user/me" });
            //       setProfile({
            //          id: data.id,
            //          nickname: data.kakao_account.profile.nickname,
            //          email: data.kakao_account.email
            //       });
            // });

            // /* // Kakao SDK API를 이용해 사용자 정보 획득
            let data = await window.Kakao.API.request({ url: "/v2/user/me" });

            return {
               id: data.id,
               nickname: data.kakao_account.profile.nickname,
               email: data.kakao_account.email
            };
            // return null;
         } else return null;

      } catch (err) {
         console.log(err);
      }
   };

   const onClickLogin = () => {
      if (window.Kakao.isInitialized()) {
         window.Kakao.Auth.authorize({
            redirectUri: REDIRECT_URI
         });
      }
   };

   const onClickLogout = () => {
      if (window.Kakao.isInitialized()) {
         window.Kakao.Auth.logout();
      }
   }

   return {
      getProfile,
      onClickLogin,
      onClickLogout
   };
}

export default useKakaoLogin;