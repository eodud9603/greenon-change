import { atom }  from 'recoil';

type ToastStateType = {
   open: boolean;
   message: string;
   type: 'error' | 'info' | 'success' | 'warning'
};
const ToastState = atom<ToastStateType>({
   key: 'ToastState',
   default: {
      open: false,
      message: '',
      type: 'success'
   }
});

export default ToastState;