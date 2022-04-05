import React from "react";
import styled from "styled-components";
import Button from "@mui/material/Button";
import ToastState from "../../recoil/toast";
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import DeviceState from "../../recoil/device";
import { apis } from "../../lib/axios";
import UserState from "../../recoil/user";

const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #f4f4f4;

  p {
    flex: 1.5;
    font-size: 16px;
    color: #000;
  }

  .option-list {
    flex: 2.5;
    display: flex;
    gap: 10px;
  }
`;

const ControlDevice = () => {
  const user = useRecoilValue(UserState);
  const setToast = useSetRecoilState(ToastState);
  const [deviceList, setDeviceList] = useRecoilState(DeviceState);

  const handleClick = async (key: string, value: any) => {
    if (!user) return;
    
    let temp = deviceList.map(d => ({ ...d }));

    for (let i = 0; i < temp.length; i++) {

      if (temp[i][key] === 99 || temp[i][key] === value) {
        continue;
      }
      
      await apis.controlDevice(temp[i].id, user.id, { [key]: value }).then(({ data }) => {
        if (data.includes(key)) temp[i][key] = 99;
      });
    }
    
    setDeviceList(temp);
    setToast({ open: true, message: '전체 디바이스에 명령이 전달되었습니다.', type: 'info' })
  };

  return (
    <Box>
      <Row>
        <p>전원</p>
        <div className="option-list">
          <Button onClick={() => handleClick("power", 1)}>ON</Button>
          <Button onClick={() => handleClick("power", 0)}>OFF</Button>
        </div>
      </Row>
      <Row>
        <p>모드 선택</p>
        <div className="option-list">
          <Button onClick={() => handleClick("mode", 1)}>제균</Button>
          <Button onClick={() => handleClick("mode", 2)}>해충</Button>
        </div>
      </Row>
      <Row>
        <p>모드 시간 선택</p>
        <div className="option-list">
          <Button onClick={() => handleClick("mode_time", 0)}>
            연속
          </Button>
          <Button onClick={() => handleClick("mode_time", 1)}>1</Button>
          <Button onClick={() => handleClick("mode_time", 2)}>2</Button>
        </div>
      </Row>
      <Row style={{ border: "none" }}>
        <p>동작 제어</p>
        <div className="option-list">
          <Button onClick={() => handleClick("is_working", 1)}>
            Start
          </Button>
          <Button onClick={() => handleClick("is_working", 0)}>
            Stop
          </Button>
        </div>
      </Row>
    </Box>
  );
};

export default ControlDevice;
