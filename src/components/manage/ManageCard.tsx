import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { apis } from "../../lib/axios";
import DeviceState, { DeviceType } from "../../recoil/device";
import ModalState from "../../recoil/modal";
import ToastState from "../../recoil/toast";
import UserState from "../../recoil/user";
import { ReactComponent as AirPuriIcon } from "../../static/icons/icon-airpuri.svg";
// import useStore from "../../stores";
// import { IDevice } from "../../stores/device";

const ManageCardBox = styled(Link)`
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 20px;
  box-shadow: 0px 5px 10px 2px rgba(0, 124, 186, 0.2);
  padding: 20px;
  gap: 10px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NameBox = styled.h5`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 150px;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  color: #007cba;
`;

const CardBottom = styled.div`
  display: flex;
  gap: 20px;
`;

const Button = styled.div<{ background: string; color: string }>`
  flex: 1;
  border-radius: 10px;
  padding: 10px;
  background: ${({ background }) => background};
  color: ${({ color }) => color};
  text-align: center;
  font-size: 14px;
`;

const ManageCard = ({ data }: { data: DeviceType }) => {
  const user = useRecoilValue(UserState);
  const setDeviceList = useSetRecoilState(DeviceState);
  const [modal, setModal] = useRecoilState(ModalState);
  const setToast = useSetRecoilState(ToastState);

  const handleEdit = (e:any) => {
    e.preventDefault();
    setModal({...modal,visible:true,type:'updateDevice',targetDeviceId:data.id});
  }

  const handleOnDelete = (e: any) => {
    e.preventDefault();

    if (!user) return;

    apis.unregisterDevice(data.id, user.id).then(({ data }) => {
      if (data.isSuccess && data.affected > 0) {
        apis.getUserDevices(user.id).then(({ data }) => setDeviceList(data));
        setModal({ ...modal, visible: false });
        setToast({ open: true, message: '제품 삭제 완료', type: 'success' })
      } else {
        setToast({ open: true, message: '제품 삭제에 실패했습니다.', type: 'error' })
      }
    });

    // device.deleteDevice(data.id);
  };

  return (
    <ManageCardBox to={`/devices/${data.id}`}>
      <CardHeader>
        <NameBox>{data.name}</NameBox>
        <InfoBox>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "right",
            }}
          >
            <small>{data.serial}</small>
            <small>{data.type}</small>
          </div>
          <AirPuriIcon />
        </InfoBox>
      </CardHeader>
      <CardBottom>
        <Button background="#e5f2f8" color="#007cba" onClick={handleEdit}>
          정보 수정
        </Button>
        <Button background="#ffebf3" color="#ff0062" onClick={handleOnDelete}>
          삭제
        </Button>
      </CardBottom>
    </ManageCardBox>
  );
};

export default ManageCard;
