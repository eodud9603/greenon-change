import React, { useMemo } from "react";
import "react-responsive-modal/styles.css";
import "./ResponsiveModal.scss";
import { Modal } from "react-responsive-modal";
import { ReactComponent as CloseIcon } from "../../static/icons/icon-close.svg";
import styled from "styled-components";
import {
  AddDevice,
  ControlDevice,
  ControlMode,
  ControlMove,
  ControlPower,
  ControlTime,
  SortDevice,
  InfoDevice,
  UpdateDevice
} from ".";
// import useStore from "../../stores";
// import { useObserver } from "mobx-react";
import ModalState from "../../recoil/modal";
import { useRecoilValue, useRecoilState } from 'recoil';
// import { ModalType } from "../../stores/modal";

const ModalHeader = styled.div`
  height: 50px;
  line-height: 50px;
  text-align: center;
  box-shadow: 0px 3px 5px 1px rgba(0, 0, 0, 0.05);
  position: relative;
`;

const CloseButton = styled(CloseIcon)`
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 0;
  bottom: 0;
  margin: auto;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const Box = styled.div`
  width: 100%;
  text-align: center;
  padding: 10px;
  border-bottom: 1px solid #f4f4f4;
  font-size: 16px;
`;

export const ColBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  border-bottom: 1px solid #f4f4f4;
  font-size: 16px;

  .option-list {
    display: flex;
    gap: 10px;
  }
`;

const ResponsiveModal = () => {
  // const { modal } = useStore();
  const [modal, setModal] = useRecoilState(ModalState);

  const modalTitle = useMemo(() => {
    switch (modal.type) {
      case "addDevice": return "확인사항";
      case "sortDevice": return "정렬";
      case "controlDevice": case "controlMove": return "동작 제어";
      case "controlPower": return "전원";
      case "controlMode": return "모드";
      case "controlTime": return "시간";
      case "infoDevice": return modal.infoDevice.title;
      case "updateDevice": return '제품정보 수정';
      case "error": return "제품번호가 확인되지 않습니다";
      default: return "";
    }
  }, [modal.type,modal.infoDevice.title]);

  const onClose = () => setModal({ ...modal, visible: false });

  return /* useObserver(() => */ (
    <Modal
      open={modal.visible}
      onClose={onClose}
      center
      closeOnEsc
      closeOnOverlayClick
    >
      <ModalHeader>
        <p>{modalTitle}</p>
        <CloseButton onClick={onClose} />
      </ModalHeader>
      <Content>
        <ModalContent type={modal.type} />
      </Content>
    </Modal>
  )/* ); */
};

const ModalContent = ({ type }: { type: /* ModalType */any }) => {
  // const { modal } = useStore();
  const modal = useRecoilValue(ModalState);

  switch (type) {
    case "addDevice":
      return <AddDevice />;
    case "sortDevice":
      return <SortDevice />;
    case "controlDevice":
      return <ControlDevice />;
    case "controlMove":
      return <ControlMove />;
    case "controlPower":
      return <ControlPower device_id={modal.targetDeviceId} />;
    case "controlMode":
      return <ControlMode device_id={modal.targetDeviceId} />;
    case "controlTime":
      return <ControlTime device_id={modal.targetDeviceId} />;
    case "infoDevice":
      return <InfoDevice title={modal.infoDevice.title}/>;
    case "updateDevice":
      return <UpdateDevice device_id={modal.targetDeviceId}/>;
    default:
      return <></>;
  }
};

export default ResponsiveModal;
