import React, { useMemo } from "react";
import { Button } from "@mui/material";
import { apis } from "../../lib/axios";
import UserState from "../../recoil/user";
import { useRecoilValue, useRecoilState } from 'recoil';
import ModalState from "../../recoil/modal";
import DeviceState from "../../recoil/device";

const ControlPower = ({ device_id }: { device_id: string }) => {
  const [modal, setModal] = useRecoilState(ModalState);
  const user = useRecoilValue(UserState);
  const [deviceList, setDeviceList] = useRecoilState(DeviceState);

  const device = useMemo(() => {
    const target = deviceList.filter(d => d.id === device_id);
    if (target.length)
      return target[0];
    return null;
  }, [device_id, deviceList]);

  const handlePower = (power: number) => {
    if (!user) return;
    apis.controlDevice(device_id, user.id, { power }).then(({ data }) => {
      if (data.includes('power')) {
        setModal({ ...modal, visible: false });
        setDeviceList(deviceList.map(d => {
          return { ...d, ...(d.id === device_id && { power: 99 }) };
        }));
      }
    });
  }

  return (
    <>
      <Button
        variant="text"
        style={{
          width: "100%",
          color: (device && device.power === 1) ? "#007cba" : "rgba(0,0,0,0.4)",
          borderBottom: "1px solid #f4f4f4",
        }}
        onClick={() => handlePower(1)}
      >
        ON
      </Button>
      <Button
        variant="text"
        style={{
          width: "100%",
          color: (device && device.power === 0) ? "#007cba" : "rgba(0,0,0,0.4)",
        }}
        onClick={() => handlePower(0)}
      >OFF</Button>
    </>
  );
};

export default ControlPower;