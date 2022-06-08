import React, {useEffect, useMemo, useRef, useState} from "react";
import styled from "styled-components";
import Button from "../common/UIButton";
import {TextInput} from "../common";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import DeviceState from "../../recoil/device";
import {apis} from "../../lib/axios";
import ModalState from "../../recoil/modal";
import ToastState from "../../recoil/toast";
import UserState from "../../recoil/user";

export const Box = styled.div`
  font-size: 14px;
  word-break: break-all;
  line-height: 1.5;
  text-align: center;
  margin: 0;
  margin-bottom: 20px;
`;
export const InputContainer = styled.div`
  width: 95%;
`;
export const SubmitBtn = styled.button`
  width: 100%;
  border-radius: 15px;
  background-color: #007cba;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
  margin-top: 12px;
  height: 50px;
  border: none;
`;
const UpdateDevice = ({ device_id }: { device_id: string }) => {
    const device = useRecoilState(DeviceState);
    const deviceInfo = useMemo(() => {
        return device[0].filter((e,i) => e.id === device_id)
    },[device_id]);
    const [modal,setModal] = useRecoilState(ModalState);
    const setToast = useSetRecoilState(ToastState);
    const [name,setName] = useState(deviceInfo[0].name);

    const EditDevice = async () => {
        const update = await apis.updateDevice(device_id, name);
        if (update.status === 200 && update.data.isSuccess && update.data.affected === 1) {
            setModal({ ...modal, visible: false });
            setToast({ open: true, message: '제품 이름이 변경되었습니다.', type: 'success' })
        } else {
            setToast({ open: true, message: '제품 이름 변경에 실패했습니다.', type: 'error' })
        }
    };

    return<>
        <Box>수정하실 내용을 입력해주세요.</Box>
        <InputContainer>
            <TextInput type={'text'} label={'이름'} value={name} onChange={e => setName(e.target.value)}/>
        </InputContainer>
        <SubmitBtn type={'button'} onClick={EditDevice}>확인</SubmitBtn>
    </>
}

export default UpdateDevice;
