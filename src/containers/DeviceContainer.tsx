import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { Division } from "../components/common";
import {
  DeviceChart,
  DeviceIndex,
  DeviceInfo,
  DeviceStatus,
} from "../components/device";
import { MainControlBar } from "../components/main";
import Loading from "../components/base/Loading";
import DeviceState, { DeviceCurrentStatusState, DeviceStatusType } from "../recoil/device";
import { useRecoilValue } from 'recoil';
import { apis } from "../lib/axios";
import UserState from "../recoil/user";
import AppState from "../recoil/app";

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

const DeviceContainer = () => {
  const { id } = useParams();
  const { loading } = useRecoilValue(AppState);
  const user = useRecoilValue(UserState);
  const deviceList = useRecoilValue(DeviceState);
  const [status, setStatus] = useState<DeviceStatusType[]>([]);

  useEffect(() => {
    if (id && user) {
      apis.getDeviceStatus(id, user.id).then(({ data }) => {
        setStatus(data.filter(d => d.id === id)[0].status);
      })
    }
  }, [id]);

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
      <MainControlBar />
      <Container>
        <Box>
          <Left>
            <DeviceInfo
              title={targetDevice.name || '-'}
              name={targetDevice.serial || '-'}
              type={targetDevice.type || '-'}
            />
            <DeviceIndex
              data={deviceStatusData || {
                particulate_matter: 0,
                temperature: 0,
                humidity: 0,
                bio_aerosol: 0,
                air_quality: 0,
                food_poisoning: 0,
                hydrogen_sulfide: 0,
                ammonia: 0,
                voc: 0,
                co2: 0,
                createdAt: '',
              }}
            />
            <Division />
            <DeviceStatus user={user} deviceId={targetDevice.id} /* data={targetDevice} */ />
          </Left>
          <Right>
            <DeviceChart chartData={status} />
          </Right>
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
