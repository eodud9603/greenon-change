import { atom } from 'recoil';

export type AppStateType = {
   loading: boolean;
   location: string;
   particulate_matter: [string, string]
};

const AppState = atom<AppStateType>({
   key: 'AppState',
   default: {
      loading: false,
      location: '',
      particulate_matter: ['맑음', '2.5PM']
   }
});

export default AppState;