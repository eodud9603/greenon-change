import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import useKakaoLogin from '../../hooks/useKakaoLogin';
import { apis } from '../../lib/axios';
import ToastState from '../../recoil/toast';
import UserState from '../../recoil/user';

const KakaoCallback = () => {
   const setUserState = useSetRecoilState(UserState);
   const { getProfile } = useKakaoLogin({ baseUri: window.location.origin });
   const toast = useSetRecoilState(ToastState);
   const navigate = useNavigate();
   
   useEffect(() => {
      const code = new URL(window.location.href).searchParams.get("code");

      getProfile(code).then(profile => {
         if (!profile) return;

         apis.signupWithKakao(profile).then((res) => {
            if (res.status === 201) {
               apis.SignInWithKakao(profile.id).then(({ data }) => {
                  if (data.user) {
                     setUserState({
                       id: data.user.id,
                       isAdmin: data.user.isAdmin,
                       email: data.user.email || null,
                       name: data.user.name || '',
                       loginType: 'KAKAO'
                     });
                     navigate("/", { replace: true });
                  }
               });
            } else {
               toast({ open: true, message: '가입에 실패했습니다.', type: 'warning' });
            }
         });
      });
   }, []);

   return null;
}

export default KakaoCallback;