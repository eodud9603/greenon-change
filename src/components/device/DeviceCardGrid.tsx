import React, { useEffect, useMemo } from "react";
import styled from "styled-components";
// import { IDevice } from "../../stores/device";
// import useStore from "../../stores";
import { Button as MuiButton } from "@mui/material";
import { DeviceCurrentStatusState, DeviceType } from "../../recoil/device";
import { useRecoilState, useRecoilValue } from 'recoil';
import ModalState, { ModalType } from "../../recoil/modal";

const Grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
`;

const GridItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  label {
    color: #989898;
  }
`;

const Button = styled(MuiButton)<{ red?: string }>`
  width: 100%;
  background-color: ${(props) =>
    props.red === "true" ? "#f7f7f7" : "#e5f2f8"} !important;
  color: ${(props) =>
    props.red === "true" ? "#8b8b8b" : "#007cba"} !important;
  padding-top: 15px !important;
  padding-bottom: 15px !important;
  border-radius: 10px !important;
  box-shadow: none !important;
`;

const DeviceCardGrid = ({ device }: { device: DeviceType }) => {
  // const { modal } = useStore();
  const [modal, setModal] = useRecoilState(ModalState);
  const deviceStatusList = useRecoilValue(DeviceCurrentStatusState);

  const deviceStatus = useMemo(() => {
    if (deviceStatusList[device.id])
      return deviceStatusList[device.id];
    else return null;
  }, [device, deviceStatusList]);

  function formatMode(mode:number) {
    switch (mode) {
      case 1: return "공간제균";
      case 2: return "해충방제";
    }
  }

  function formatModeTime(mode_time:number) {
    switch (mode_time) {
      case -1: return "수동";
      case 0: return "연속";
      case 1: return "1시간";
      case 2: return "2시간";
    }
  }

  const handleOpenModal = (type:ModalType, currentValue:number) => {
    if (currentValue !== 99)
      setModal({ ...modal, targetDeviceId: device.id, visible: true, type });
  }

  return (
    <Grid>
      <GridItem style={{ marginBottom: 20 }}>
        <label>바이오에어로졸</label>
        <p style={{ marginTop: 5 }}>{deviceStatus ? deviceStatus.bio_aerosol : '-'}</p>
      </GridItem>
      <GridItem style={{ marginBottom: 20 }}>
        <label>공기질</label>
        <p style={{ marginTop: 5 }}>{deviceStatus ? deviceStatus.air_quality : '-'}</p>
      </GridItem>
      <GridItem style={{ marginBottom: 20 }}>
        <label>미세먼지</label>
        <p style={{ marginTop: 5 }}>{deviceStatus ? deviceStatus.particulate_matter + 'PM' : '-'}</p>
      </GridItem>
      <GridItem style={{ marginBottom: 20 }}>
        <label>식중독지수</label>
        <p style={{ marginTop: 5 }}>{deviceStatus ? deviceStatus.food_poisoning : '-'}</p>
      </GridItem>
      <GridItem style={{ marginBottom: 20 }}>
        <label>온도</label>
        <p style={{ marginTop: 5 }}>{deviceStatus ? deviceStatus.temperature + '°C' : '-'}</p>
      </GridItem>
      <GridItem style={{ marginBottom: 20 }}>
        <label>습도</label>
        <p style={{ marginTop: 5 }}>{deviceStatus ? deviceStatus.humidity + '%' : '-'}</p>
      </GridItem>
      <GridItem style={{ marginRight: 8 }}>
        <label>전원</label>
        <Button
          name="controlPower"
          onClick={(e) => { e.preventDefault(); handleOpenModal('controlPower', device.power); }}
          red={device.power === 1 ? "false" : "true"}
        >
          {device.power === 99 ? 'pending...' : device.power === 1 ? "켜짐" : "꺼짐"}
        </Button>
      </GridItem>
      <GridItem>
        <label>모드</label>
        <Button
          name="controlMode"
          onClick={(e) => { e.preventDefault(); handleOpenModal('controlMode', device.mode); }}
          red={device.power === 1 ? "false" : "true"}
        >
          {device.mode === 99 ? 'pending...' : formatMode(device.mode)}
        </Button>
      </GridItem>
      <GridItem style={{ marginLeft: 8 }}>
        <label>시간</label>
        <Button
          name="controlTime"
          onClick={(e) => { e.preventDefault(); handleOpenModal('controlTime', device.mode_time); }}
          red={device.power === 1 ? "false" : "true"}
        >
          {device.mode_time === 99 ? 'pending...' : formatModeTime(device.mode_time)}
        </Button>
      </GridItem>
    </Grid>
  );
};

export default DeviceCardGrid;
