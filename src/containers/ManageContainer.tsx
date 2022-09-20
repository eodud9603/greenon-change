import React, { useMemo } from "react";
import styled from "styled-components";
import { ManageGrid } from "../components/manage";
import { AddIcon } from "../components/icons";

import { Pagenation } from "../components/common";
// import useStore from "../stores";
import { useRecoilState, useRecoilValue } from 'recoil';
// import { useObserver } from "mobx-react";
import DeviceState from "../recoil/device";
import ModalState from "../recoil/modal";
import useReactNativeWebView from "../hooks/useReactNativeWebView";
import { ContentHeader } from "../components/base";
import { Link, useLocation, useParams } from "react-router-dom";
import { MainControlBar } from "../components/main";

const Box = styled.div`
  padding: 20px;
  padding-bottom: 90px;
`;

const GridWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 26px;

  @media (min-width: 1024px) {
    background: #fff;
    box-shadow: 0px 5px 10px 2px rgba(0, 124, 186, 0.2);
    border-radius: 20px;
    padding: 20px;
  }
`;

const AddButton = styled.button`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e5f2f8;
  color: #1ca5c7;
  border: none;
  border-radius: 10px;
  position: relative;

  svg {
    position: absolute;
    left: 10px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  //white-space: nowrap;
  overflow-x: scroll;
  width: calc(100vw - 40px);

  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    width: 100%;
    &>* {margin-right: 10px; }
  }
`;

const Button = styled.button<{ active?: boolean }>`
  flex-shrink: 0;
  cursor: pointer;
  border: none;
  padding: 10px;
  color: ${({ active }) => (active ? '#1ca5c7' : '#778d98')};
  font-size: 14px;
  border-bottom: solid 2px ${props => props.active ? '#1ca5c7' : 'transparent'};
`;

const ManageContainer = () => {
  const { id } = useParams();
  const [modal, setModal] = useRecoilState(ModalState);
  const deviceList = useRecoilValue(DeviceState);
  // const { device, modal } = useStore();
  const { sendMessage } = useReactNativeWebView();
  const location = useLocation();

  const targetDevice = useMemo(() => {
    const index = deviceList.findIndex(d => d.id === id);

    if (index === -1) return null;
    return deviceList[index];
  }, [deviceList, id]);

  // if (!targetDevice) {
  //   return (
  //     <>
  //       <MainControlBar />
  //       <div style={{
  //         width: '100%',
  //         padding: 20,
  //       }}>Empty</div>
  //     </>
  //   );
  // }

  return /* useObserver(() =>  */(
    <>
      <ContentHeader title='제품관리' />
      <Box>
        { targetDevice &&
          <ButtonGroup>
            <Link to={`/`}>
              <Button
                  active={false}
              >
                홈
              </Button>
            </Link>
            {/* TODO: 모달 띄우기 */}
            <Button
              active={false}
              onClick={() => setModal({ ...modal, visible: true, type: 'sortDevice' })}
            >
              정렬
            </Button>
            <Link to={`/report/${targetDevice.id}`}>
              <Button
                active={false}
              >
                리포트
              </Button>
            </Link>
            {/* TODO: 제어버튼은 일단 onPress는 비어있게 작업하기로 함 */}
            <Link to={`/devices/${targetDevice.id}`}>
              <Button
                  active={location.pathname === `/devices/${targetDevice.id}`}
              >
                제어
              </Button>
            </Link>
            {/* TODO: 알림 기능은 아직 미완 */}
            <Link to={`/devices/${targetDevice.id}`}>
              <Button
                active={false}
              >
                알림
              </Button>
            </Link>
            <Link to={`/manage/${targetDevice.id}`}>
              <Button
                active={location.pathname === `/manage/${targetDevice.id}`}
              >
                제품관리
              </Button>
            </Link>
          </ButtonGroup>
        }
        <GridWrapper>
          <AddButton onClick={() => sendMessage({ type: 'DeviceRegister' })} /* onClick={() => setModal({ ...modal, type: 'addDevice', visible: true })} */>
            <AddIcon />
            <p>신규 제품 추가</p>
            <div />
          </AddButton>
          <ManageGrid data={deviceList} />
        </GridWrapper>
      </Box>
      <Pagenation />
    </>
  )/* ); */
};

export default ManageContainer;
