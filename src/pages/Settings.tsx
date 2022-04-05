import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ContentHeader } from "../components/base";
import UserState from "../recoil/user";
import { useRecoilState, useSetRecoilState } from 'recoil';

import { ReactComponent as DepthIcon } from "../static/icons/icon-depth.svg";
import DeviceState, { DeviceCurrentStatusState } from "../recoil/device";
import useKakaoLogin from "../hooks/useKakaoLogin";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding-top: 40px;
  padding-bottom: 40px;

  @media (min-width: 768px) {
    width: 335px;
    margin: 0 auto;
  }
`;

const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #f4f4f4;
`;

const SwitchBox = styled.div`
  display: flex;
`;

const Switch = styled.button<{ active?: boolean }>`
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background: ${({ active }) => (active ? "#007cba" : "none")};
  color: ${({ active }) => (active ? "#fff" : "#007ba8")};
  padding: 10px;
`;

const Settings = () => {
  const { onClickLogout:KakaoLogout } = useKakaoLogin({ baseUri: window.location.origin });
  const [user, setUser] = useRecoilState(UserState);
  const setDeviceList = useSetRecoilState(DeviceState);
  const setDeviceCurrentStatus = useSetRecoilState(DeviceCurrentStatusState);
  const [input, setInput] = React.useState({ push: true, auto_login: true });
  const navigation = useNavigate();

  const logout = () => {
    if (user.loginType === 'KAKAO') {
      KakaoLogout();
    }
    setUser(null);
    setDeviceList([]);
    setDeviceCurrentStatus({});

    navigation("/login", { replace: true });
  }

  return (
    <>
      <ContentHeader title="설정" />
      <Box>
        <Col>
          <Row>
            <p>푸시 받기</p>
            <SwitchBox>
              <Switch
                active={input.push}
                onClick={() => setInput((state) => ({ ...state, push: true }))}
              >
                켜기
              </Switch>
              <Switch
                active={!input.push}
                onClick={() => setInput((state) => ({ ...state, push: false }))}
              >
                끄기
              </Switch>
            </SwitchBox>
          </Row>
          <Row>
            <p>자동 로그인</p>
            <SwitchBox>
              <Switch
                active={input.auto_login}
                onClick={() => setInput((state) => ({ ...state, auto_login: true }))}
              >
                켜기
              </Switch>
              <Switch
                active={!input.auto_login}
                onClick={() => setInput((state) => ({ ...state, auto_login: false }))}
              >
                끄기
              </Switch>
            </SwitchBox>
          </Row>
        </Col>
        <Col>
          <Row>
            <p>이용약관</p>
            <DepthIcon />
          </Row>
          <Row>
            <p>개인정보 보호정책</p>
            <DepthIcon />
          </Row>
          <Row>
            <p>오픈소스 라이선스</p>
            <DepthIcon />
          </Row>
        </Col>
        <Col>
          <Row>
            <p>버전 정보</p>
            <p>1.1.1.0</p>
          </Row>
          <Row style={{ border: "none" }}>
            <p style={{ color: "red" }}>회원탈퇴</p>
            <button style={{ color: "#007ba8" }} onClick={logout}>
              로그아웃
            </button>
          </Row>
        </Col>
      </Box>
    </>
  );
};

export default Settings;
