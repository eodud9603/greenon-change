import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Division } from '../components/common';
import {
  DeviceChart,
  DeviceIndex,
  DeviceInfo,
  DeviceStatus,
} from '../components/device';
import { MainControlBar } from '../components/main';
import Loading from '../components/base/Loading';
import DeviceState, { DeviceCurrentStatusState, DeviceStatusType } from '../recoil/device';
import { useRecoilState, useRecoilValue } from 'recoil';
import { apis } from '../lib/axios';
import UserState from '../recoil/user';
import AppState from '../recoil/app';
import { Link } from 'react-router-dom';
import MobileBackground from '../static/images/mobile-background.png';
import ModalState from '../recoil/modal';
import { ContentHeader } from '../components/base';

const Container = styled.div`
  width: 100%;
  padding: 20px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    padding: 20px;
    box-shadow: 0px 5px 10px 2px rgba(0, 124, 186, 0.2);
    border-radius: 20px;
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    width: 350px;
  }
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 768px) {
    min-width: calc(100% - 350px - 20px);
    justify-content: flex-end;
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

const DeviceContainer = () => {
  const { id } = useParams();
  const { loading } = useRecoilValue(AppState);
  const user = useRecoilValue(UserState);
  const location = useLocation();
  const deviceList = useRecoilValue(DeviceState);
  const [status, setStatus] = useState<DeviceStatusType[]>([]);
  const [modal, setModal] = useRecoilState(ModalState);


  // useEffect(() => {
  //   if (id) {
        //기존 api
  //     // apis.getDeviceStatus(id, user.id).then(({ data }) => {
  //     //     console.log('status :: ',data)
  //     //   setStatus(data.filter(d => d.id === id)[0].status);
  //     // })
  //     apis.getCumulativeData(id,'week').then(({ data }) => {
  //         console.log('status :: ',data)
  //         setStatus(data);
  //     })
  //   }
  // }, [id]);

  const deviceStatusList = useRecoilValue(DeviceCurrentStatusState);

  const deviceStatusData = useMemo(() => {
    if (Object.keys(deviceStatusList).includes(id)) {
      return deviceStatusList[id];
    } else return null;
  }, [deviceStatusList, id]);

  const targetDevice = useMemo(() => {
    const index = deviceList.findIndex(d => d.id === id);

    if (index === -1) return null;
    return deviceList[index];
  }, [deviceList, id]);

  return targetDevice ? (
    <>
      <ContentHeader title='공기질 및 감염예방 모니터링' />
      {/* <MainControlBar /> */}
      <Container>
        <Box>
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
                active={false}
              >
                제품관리
              </Button>
            </Link>
          </ButtonGroup>
          <Left>
            <DeviceInfo
              title={targetDevice.name || '-'}
              name={targetDevice.serial || '-'}
              type={targetDevice.type || '-'}
              serial={targetDevice.serial || '-'}
            />
            <DeviceIndex
              data={deviceStatusData || {
                bio_aerosol: 0,
                air_quality: 0,
                food_poisoning: 0,
                particulate_matter: 0,
                voc: 0,
                co2: 0,
                temperature: 0,
                humidity: 0,
                ammonia: 0,
                hydrogen_sulfide: 0,
                createdAt: '',
              }}
            />
            {/* <Division /> */}
            <DeviceStatus user={user} deviceId={targetDevice.id} /* data={targetDevice} */ />
          </Left>
          {/* <Right>
            <DeviceChart id={id} />
          </Right> */}
        </Box>
      </Container>
      <Loading isLoading={loading} />
    </>
  ) : (
    <>
      <MainControlBar />
      <Container>Empty</Container>
    </>
  );
};

export default DeviceContainer;
