import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { DeviceInfo, DeviceCardGrid } from ".";
import { DeviceType } from "../../recoil/device";

const DeviceCardBox = styled(Link)`
  display: inline-flex;
  flex-direction: column;
  gap: 20px;
  background: #fff;
  border-radius: 20px;
  padding: 10px;
  box-shadow: 0px 5px 10px 2px rgba(0, 124, 186, 0.2);
`;

const Space = styled.div`
  display: flex;
  align-items: center;

  label {
    color: #989898;
  }
`;

const DeviceCard = ({ device }: { device: DeviceType }) => {

  const getLevel = useCallback((value?:number) => {
    switch (value) {
      case 1: return '낮음';
      case 2: return '보통';
      case 3: return '높음';
      default: return '-';
    }
  }, []);
  
  return (
    <DeviceCardBox to={`/devices/${device.id}`}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          paddingLeft: 10,
        }}
      >
        <DeviceInfo
          title={/* device.name || '-' */device.id}
          name={device.serial || '-'}
          type={device.type || '-'}
        />
        <Space>
          <Space style={{ marginRight: 20 }}>
            <label>수위</label>
            <p style={{ marginLeft: 10 }}>{getLevel(device.water_level)}</p>
          </Space>
          <Space>
            <label>약품</label>
            <p style={{ marginLeft: 10 }}>{getLevel(device.chemical_level)}</p>
          </Space>
        </Space>
      </div>
      <DeviceCardGrid device={device} />
    </DeviceCardBox>
  );
};

export default DeviceCard;
