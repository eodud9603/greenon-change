import React from "react";
import { useObserver } from "mobx-react";
import styled from "styled-components";
import { Pagenation } from "../components/common";
import { MainControlBar, MainGrid } from "../components/main";
// import useStore from "../stores";
import Loading from "../components/base/Loading";
import DeviceState from "../recoil/device";
import { useRecoilState, useRecoilValue } from 'recoil';
import AppState from "../recoil/app";
import ModalState from "../recoil/modal";
import AddIcon from '../static/icons/icon-add-dark.svg';
import useReactNativeWebView from "../hooks/useReactNativeWebView";

const Box = styled.div`
  padding: 20px;
  padding-bottom: 90px;
`;

const FlexCenter = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MessageBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 375px) {
    width: 100%;
    padding: 0 20px;
  }
`;

const NoDeviceText = styled.div`
  margin-bottom: 20px;
  width: 160px;
  text-align: center;
`;

const Button = styled.a`
  display: block;
  width: 335px;
  height: 50px;
  border-radius: 10px;
  background-color: rgb(229, 242, 248);
  font-size: 16px;
  color: rgb(0, 124, 186);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media (max-width: 375px) {
    width: 100%;
  }

  img {
    position: absolute;
    left: 10px;
    top: 10px;
  }
`;

const MainContainer = () => {
  const { sendMessage } = useReactNativeWebView();

  const { loading } = useRecoilValue(AppState);
  const deviceList = useRecoilValue(DeviceState);
  const [modal, setModal] = useRecoilState(ModalState);
  

  return (
    <>
      <MainControlBar />
      {deviceList.length ?
        <Box>
          <MainGrid data={deviceList} />
        </Box>
        :
        <FlexCenter>
          <MessageBlock>
            <NoDeviceText>
              등록된 제품이 없습니다!<br/>
              제품을 추가해주세요
            </NoDeviceText>
            <Button onClick={() => sendMessage({ type: 'DeviceRegister' })} /* onClick={() => setModal({ ...modal, type: 'addDevice', visible: true })} */>
              <img src={AddIcon} />
              신규 제품 추가
            </Button>
          </MessageBlock>
        </FlexCenter>
      }
      <Loading isLoading={loading} />
      <Pagenation />
    </>
  );
};

export default MainContainer;
