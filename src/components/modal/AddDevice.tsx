import React, { useState } from "react";
import ToastState from "../../recoil/toast";
import { TextInput, Button as BaseButton } from "../common";
import { useRecoilState, useSetRecoilState, useRecoilValue } from 'recoil';
import { apis } from "../../lib/axios";
import UserState from "../../recoil/user";
import ModalState from "../../recoil/modal";
import DeviceState from "../../recoil/device";

const AddDevice = () => {
  const [modal, setModal] = useRecoilState(ModalState);
  const setDeviceList = useSetRecoilState(DeviceState);
  const user = useRecoilValue(UserState);
  const setToast = useSetRecoilState(ToastState);
  const [error, setError] = React.useState(false);
  const [value, setValue] = useState('');
  
  const handleConfirm = () => {
    if (!value) {
      setToast({ open: true, message: '제품번호 미입력', type: 'error' })
    } else {
      if (!user) {
        setToast({ open: true, message: '유저정보 확인 불가', type: 'error' })
      } else {
        apis.registerDevice(value, user.id).then(res => {
          if (res.data.isSuccess && res.data.affected > 0) {
            apis.getUserDevices(user.id).then(({ data }) => setDeviceList(data));
            setModal({ ...modal, visible: false });
            setToast({ open: true, message: '제품등록 완료', type: 'success' })
          } else {
            setToast({ open: true, message: '제품등록에 실패했습니다.', type: 'error' })
          }
        });
      }
    }
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      {error && (
        <>
          <p style={{ fontSize: 16, textAlign: "center" }}>
            Wifi의 접속을 통해 제품이
            <br />
            등록되어야 합니다.
            <br />
            아래의 설명자료를 확인하시고
            <br />
            다시 한번 진행해주시기 바랍니다
          </p>
          <BaseButton>WIFI 연동 메뉴얼</BaseButton>
        </>
      )}
      <p style={{ fontSize: 16, textAlign: "center" }}>
        신규제품을 등록하기 위해서는
        <br />
        WIFI에 제품을 연동한 후<br />
        진행해주셔야 합니다
      </p>
      <TextInput type="text" label="제품번호" value={value} onChange={e => setValue(e.target.value)} />
      <BaseButton onClick={handleConfirm}>확인</BaseButton>
    </div>
  );
};

export default AddDevice;
