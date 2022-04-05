import React, { useMemo } from "react";
import { Button } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { apis } from "../../lib/axios";
import DeviceState from "../../recoil/device";
import ModalState from "../../recoil/modal";
import UserState from "../../recoil/user";
// import useStore from "../../stores";
// import { useObserver } from "mobx-react";
// import { toJS } from "mobx";

const ControlMode = ({ device_id }: { device_id: string }) => {
  const [modal, setModal] = useRecoilState(ModalState);
  const user = useRecoilValue(UserState);
  const [deviceList, setDeviceList] = useRecoilState(DeviceState);

  const device = useMemo(() => {
    const target = deviceList.filter(d => d.id === device_id);
    if (target.length)
      return target[0];
    return null;
  }, [device_id, deviceList]);

  const handleMode = (mode: number) => {
    if (!user) return;
    apis.controlDevice(device_id, user.id, { mode }).then(({ data }) => {
      if (data.includes('mode')) {
        setModal({ ...modal, visible: false });
        setDeviceList(deviceList.map(d => {
          return { ...d, ...(d.id === device_id && { mode: 99 }) };
        }));
      }
    });
  }

    return (
      <>
        <Button
          style={{
            width: "100%",
            color: (device && device.mode === 1) ? "#007cba" : "rgba(0,0,0,0.4)",
            borderBottom: "1px solid #f4f4f4",
          }}
          onClick={() => handleMode(1)}
        >
          공간 제균
        </Button>
        <Button
          style={{
            width: "100%",
            color: (device && device.mode === 2) ? "#007cba" : "rgba(0,0,0,0.4)",
          }}
          onClick={() => handleMode(2)}
        >
          해충 방제
        </Button>
      </>
    );
  // });
};

export default ControlMode;
