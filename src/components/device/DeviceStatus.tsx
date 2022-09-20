import React, { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { DeviceStatusOption } from ".";
import { apis } from "../../lib/axios";
import AppState from "../../recoil/app";
import DeviceState, { DeviceStatusType, DeviceType } from "../../recoil/device";
import { UserType } from "../../recoil/user";

import { ReactComponent as PowerInactive } from "../../static/icons/power-inactive.svg";
import { ReactComponent as PowerActive } from "../../static/icons/power-active.svg";
import { ReactComponent as AirQualityButtonInactive } from "../../static/icons/air-quality-button-inactive.svg";
import { ReactComponent as AirQualityButtonActive } from "../../static/icons/air-quality-button-active.svg";
import { ReactComponent as GermInactive } from "../../static/icons/germ-inactive.svg";
import { ReactComponent as GermActive } from "../../static/icons/germ-active.svg";
import { ReactComponent as WindInactive } from "../../static/icons/wind-inactive.svg";
import { ReactComponent as WindActive } from "../../static/icons/wind-active.svg";

const Box = styled.div<{ align: "row" | "column" }>`
  display: flex;
  flex-direction: ${(props) => props.align};
  align-items: ${(props) => (props.align === "row" ? "center" : "flex-start")};
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #f4f4f4;

  label {
    flex: ${(props) => (props.align === "row" ? 1.5 : 1)};
    font-size: 16px;
    color: #fff;
    margin-bottom: ${(props) => (props.align === "row" ? 0 : "10px")};
  }

  .option-list {
    width: 100%;
    flex: ${(props) => (props.align === "row" ? 2.5 : 1)};
    display: flex;
  }
`;

const Controller = styled.div`
padding: 10px 36px;
border-radius: 10px;
box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.15);
background-color: white;
font-size: 10px;
display: flex;
justify-content: space-between;
align-items: center;
margin-top: 45px;
`;

const ControllerItem = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 4px;
cursor: pointer;
`;

const DeviceStatus = ({ /* data, */deviceId, user }: { /* data: DeviceType, */deviceId: string, user: UserType | null }) => {
  const [app, setApp] = useRecoilState(AppState);
  const [deviceList, setDeviceList] = useRecoilState(DeviceState);

  const data = useMemo(() => {
    return deviceList.filter(d => d.id === deviceId)[0]
  }, [deviceList, deviceId]);

  const onClickPower = (power: number) => {
    if (!user || data.power === 99) return;
    apis.controlDevice(data.id, user.id, { power }).then(({ data }) => {
      if (data.includes('power')) {
        setDeviceList(deviceList.map(d => {
          return { ...d, ...(d.id === deviceId && { power: 99 }) };
        }));
      }
    });
  }
  const onClickMode = (mode: number) => {
    if (!user || data.mode === 99 || data.power === 0) return;
    apis.controlDevice(data.id, user.id, { mode }).then(({ data }) => {
      if (data.includes('mode')) {
        setDeviceList(deviceList.map(d => {
          return { ...d, ...(d.id === deviceId && { mode: 99 }) };
        }));
      }
    });
  }
  const onClickModeTime = (mode_time: number) => {
    if (!user || data.mode_time === 99) return;
    apis.controlDevice(data.id, user.id, { mode_time }).then(({ data }) => {
      if (data.includes('mode_time')) {
        setDeviceList(deviceList.map(d => {
          return { ...d, ...(d.id === deviceId && { mode_time: 99 }) };
        }));
      }
    });
  }
  const onClickIsWorking = (is_working: number) => {
    if (!user || data.is_working === 99) return;
    apis.controlDevice(data.id, user.id, { is_working }).then(({ data }) => {
      if (data.includes('is_working')) {
        setDeviceList(deviceList.map(d => {
          return { ...d, ...(d.id === deviceId && { is_working: 99 }) };
        }));
      }
    });
  }
  const onClickRmAreaBacteria = (mode_time: number) => {
    if (!user || data.mode === 99 || data.mode_time === 99) return;
    apis.controlDevice(data.id, user.id, { mode: 1, mode_time }).then(({ data }) => {
      if (data.includes('mode') && data.includes('mode_time')) {
        setDeviceList(deviceList.map(d => {
          return { ...d, ...(d.id === deviceId && { mode: 99, mode_time: 99 }) };
        }));
      }
    });
  }
  const onClickPestControl = (mode_time: number) => {
    if (!user || data.mode === 99 || data.mode_time === 99) return;
    apis.controlDevice(data.id, user.id, { mode: 2, mode_time }).then(({ data }) => {
      if (data.includes('mode') && data.includes('mode_time')) {
        setDeviceList(deviceList.map(d => {
          return { ...d, ...(d.id === deviceId && { mode: 99, mode_time: 99 }) };
        }));
      }
    });
  }

  return (
    <div>
      <Controller>
        <ControllerItem>
          { true ? <PowerActive /> : <PowerInactive /> }
          <div style={{}}>전원</div>
        </ControllerItem>
        <ControllerItem>
          { true ? <AirQualityButtonActive /> : <AirQualityButtonInactive /> }
          <div style={{}}>공기질</div>
        </ControllerItem>
        <ControllerItem>
          { false ? <GermActive /> : <GermInactive /> }
          <div style={{ color: '#c2c2c2' }}>제균</div>
        </ControllerItem>
        <ControllerItem>
          { false ? <WindActive /> : <WindInactive /> }
          <div style={{ color: '#c2c2c2' }}>풍량</div>
        </ControllerItem>
      </Controller>
      <Box align="row">
        <label>전원</label>
        <div className="option-list">
          <DeviceStatusOption
            active={data.power === 1}
            text={data.power === 99 ? 'pending...' : 'ON'}
            onClick={() => onClickPower(1)}
          />
          {data.power !== 99 &&
            <DeviceStatusOption
              active={data.power === 0}
              text={data.power === 99 ? 'pending...' : 'OFF'}
              onClick={() => onClickPower(0)}
            />
          }
        </div>
      </Box>
      <Box align="row">
        <label>모드 선택</label>
        <div className="option-list">
          <DeviceStatusOption
            {...(data.power !== 1) && { noPower: true }}
            active={data.mode === 1 && data.power === 1}
            text={data.mode === 99 ? 'pending...' : '제균'}
            onClick={() => onClickMode(1)}
          />
          {data.mode !== 99 &&
            <DeviceStatusOption
              {...(data.power !== 1) && { noPower: true }}
              active={data.mode === 2}
              text={data.mode === 99 ? 'pending...' : '해충'}
              onClick={() => onClickMode(2)}
            />
          }
        </div>
      </Box>
      <Box align="row">
        <label>모드 시간 선택</label>
        <div className="option-list">
          <DeviceStatusOption
            {...(data.power !== 1) && { noPower: true }}
            active={data.mode_time === 0 && data.power === 1}
            text={data.mode_time === 99 ? 'pending...' : '연속'}
            onClick={() => onClickModeTime(0)}
          />
          {data.mode_time !== 99 && <>
            <DeviceStatusOption
              {...(data.power !== 1) && { noPower: true }}
              active={data.mode_time === 1 && data.power === 1}
              text={data.mode_time === 99 ? 'pending...' : '1'}
              onClick={() => onClickModeTime(1)}
            />
            <DeviceStatusOption
              {...(data.power !== 1) && { noPower: true }}
              active={data.mode_time === 2 && data.power === 1}
              text={data.mode_time === 99 ? 'pending...' : '2'}
              onClick={() => onClickModeTime(2)}
            />
          </>}
        </div>
      </Box>
      <Box align="row">
        <label>동작 제어</label>
        <div className="option-list">
          <DeviceStatusOption
            {...(data.power !== 1) && { noPower: true }}
            active={data.is_working === 1 && data.power === 1}
            text={data.is_working === 99 ? 'pending...' : 'Start'}
            onClick={() => onClickIsWorking(1)}
          />
          {data.is_working !== 99 &&
            <DeviceStatusOption
              {...(data.power !== 1) && { noPower: true }}
              active={data.is_working === 0 && data.power === 1}
              text={data.is_working === 99 ? 'pending...' : 'Stop'}
              onClick={() => onClickIsWorking(0)}
            />
          }
        </div>
      </Box>
      <Box align="column">
        <label>공간 제균</label>
        <div className="option-list">
          <DeviceStatusOption
            {...(data.power !== 1) && { noPower: true }}
            active={false}
            // text="1시간"
            text={(data.mode === 99 || data.mode_time === 99) ? 'pending...' : '1시간'}
            onClick={() => onClickRmAreaBacteria(1)}
          />
          {(data.mode !== 99 && data.mode_time !== 99) && <>
            <DeviceStatusOption
              {...(data.power !== 1) && { noPower: true }}
              active={false}
              text="2시간"
              onClick={() => onClickRmAreaBacteria(2)}
            />
            <DeviceStatusOption
              {...(data.power !== 1) && { noPower: true }}
              active={false}
              text="연속"
              onClick={() => onClickRmAreaBacteria(0)}
            />
            <DeviceStatusOption
              {...(data.power !== 1) && { noPower: true }}
              active={false}
              text="수동"
              onClick={() => onClickRmAreaBacteria(-1)}
            />
          </>}
        </div>
      </Box>
      <Box align="column">
        <label>해충방제</label>
        <div className="option-list">
          <DeviceStatusOption
            {...(data.power !== 1) && { noPower: true }}
            active={false}
            // text="1시간"
            text={(data.mode === 99 || data.mode_time === 99) ? 'pending...' : '1시간'}
            onClick={() => onClickPestControl(1)}
          />
          {(data.mode !== 99 && data.mode_time !== 99) && <>
            <DeviceStatusOption
              {...(data.power !== 1) && { noPower: true }}
              active={false}
              text="2시간"
              onClick={() => onClickPestControl(2)}
            />
            <DeviceStatusOption
              {...(data.power !== 1) && { noPower: true }}
              active={false}
              text="연속"
              onClick={() => onClickPestControl(0)}
            />
            <DeviceStatusOption
              {...(data.power !== 1) && { noPower: true }}
              active={false}
              text="수동"
              onClick={() => onClickPestControl(-1)}
            />
          </>}
        </div>
      </Box>
    </div>
  );
};

export default DeviceStatus;
