import { atom, selector, selectorFamily } from 'recoil';

export type ModalType =
"addDevice"
| "sortDevice"
| "controlDevice"
| "controlMove"
| "controlPower"
| "controlMode"
| "controlTime"
| "controlOption"
| "error";

export type ModalStateType = {
   visible: boolean,
   type: ModalType,
   targetDeviceId: string;
};
const ModalState = atom<ModalStateType>({
   key: 'ModalState',
   default: {
      visible: false,
      type: 'addDevice',
      targetDeviceId: ''
   }
});

export default ModalState;