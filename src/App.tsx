import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useRoutes,
  useLocation,
} from "react-router-dom";
import { MainLayout, Toast } from "./components/base";
import {
  MainContainer,
  ManageContainer,
  MyPageContainer,
  DeviceContainer,
} from "./containers";
import {
  ChangePassword,
  Company,
  FindEmail,
  FindPassword,
  Login,
  Notice,
  NoticeDetail,
  Products,
  ProfileEdit,
  Register,
  Register2,
  Request,
  Settings,
  Usage,
} from "./pages";
import { Agree1 } from "./pages/agree";
import UserState from "./recoil/user";
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { apis } from "./lib/axios";
import DeviceState, { DeviceCurrentStatusState } from "./recoil/device";
import AppState from "./recoil/app";
import KakaoCallback from "./pages/KakaoCallback";
import axios from "axios";
import useReactNativeWebView from "./hooks/useReactNativeWebView";

declare global {
  interface Window {
    isRNWebView?: boolean,
    RNPlatform?: 'android'|'ios',
    ReactNativeWebView: any
  }
}

function App() {
  const [app, setApp] = useRecoilState(AppState);
  const [deviceList, setDeviceList] = useRecoilState(DeviceState);
  const [loadState, setLoadState] = useState(false);
  const setDeviceCurrentStatus = useSetRecoilState(DeviceCurrentStatusState);
  const user = useRecoilValue(UserState);
  const navigate = useNavigate();
  const location = useLocation();
  const { isRNWebView, sendMessage } = useReactNativeWebView();

  /* useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        axios({
          method: 'GET',
          url: `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${position.coords.longitude}&y=${position.coords.latitude}`,
          headers: {
            'Authorization': `KakaoAK a901df17d13f61c89a412946009caaec`
          }
        }).then(res => {
          setApp({
            ...app,
            location: res.data.documents[0].address.region_2depth_name
          });
        })
      });
    }
  }, []); */

  // RN -> 웹뷰 통신
  useEffect(() => {
    if (window.isRNWebView && window.RNPlatform) {
      if (window.RNPlatform === 'android') {
        document.addEventListener('message', handleMessage);
        return () => document.removeEventListener('message', handleMessage);
      } else if (window.RNPlatform === 'ios') {
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
      }
    } else {
      apis.getLocation().then(res => {
        setApp({
          ...app,
          location: `${res.data.location.city} ${res.data.location.localityName}`
        });
      })
    }
  }, []);

  const handleMessage = (e) => {
    const data = JSON.parse(e.data);
    if (data.type === 'GET_LOCATION') {
      const { longitude, latitude } = data.payload;
      axios({
        method: 'GET',
        url: `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
        headers: {
          'Authorization': `KakaoAK a901df17d13f61c89a412946009caaec`
        }
      }).then(res => {
        setApp({ ...app, location: res.data.documents[0].address.region_2depth_name });
      })
    }
  }

  useEffect(() => {
    if (user) {
      apis.getUserDevices(user.id).then(({ data }) => {
        setDeviceList(data);
        setLoadState(true);
      });

      if (isRNWebView) {
        sendMessage({ type: 'UserInfo', data: { userId: user.id } });
      }
    } else {
      if (location.pathname !== '/auth/kakao/callback')
        navigate('/login', { replace: true });
    }
  }, [user]);

  useEffect(() => {
    if (loadState && user) {
      const updateData = () => {
        // if (user && deviceList.length) {
          apis.getDeviceCurrentStatus(user.id).then(({ data }) => {
            // console.log(data);
            setDeviceCurrentStatus(data);
          });
          apis.getDeviceConfigs(user.id).then(({ data }) => {
            setDeviceList(data);
          });
        // }
      }

      updateData();
      const interval = setInterval(() => {
        /* apis.getDeviceCurrentStatus(user.id).then(({ data }) => {
          setDeviceCurrentStatus(data);
        }); */
        updateData();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [loadState, user, /* deviceList */]);

  return (
    <>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<MainContainer />} />
        <Route path="/devices/:id" element={<DeviceContainer />} />
        <Route path="/manage" element={<ManageContainer />} />
        <Route path="/mypage" element={<MyPageContainer />} />
        <Route path="/profile_edit" element={<ProfileEdit />} />
        <Route path="/change_password" element={<ChangePassword />} />
        <Route path="/company" element={<Company />} />
        <Route path="/products" element={<Products />} />
        <Route path="/notice">
          <Route index element={<Notice />} />
          <Route path=":notice_id" element={<NoticeDetail />} />
        </Route>
        <Route path="/usage" element={<Usage />} />
        <Route path="/request" element={<Request />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register2" element={<Register2 />} />
        <Route path="/find_email" element={<FindEmail />} />
        <Route path="/auth/kakao/callback" element={<KakaoCallback />} />
        <Route path="/find_password" element={<FindPassword />} />
        <Route path="register/agree1/:type" element={<Agree1 />} />
      </Route>
    </Routes>
    <Toast />
    </>
  );
}

export default App;
