import { atom } from 'recoil';

export type DeviceType = {
   id: string;
   name: string | null;
   serial: string | null;
   type: string | null;
   power: number;
   mode: number;
   mode_time: number;
   is_working: number;
   water_level: number | null;
   chemical_level: number | null;
   status: DeviceStatusType[]
};
export type DeviceStatusType = {
   particulate_matter: number; // 미세먼지
   temperature: number; // 온도
   humidity: number; // 습도
   bio_aerosol: number; // 바이오 에어로졸
   air_quality: number; // 공기질
   food_poisoning: number; // 식중독 지수
   hydrogen_sulfide: number;
   ammonia: number;
   voc: number;
   co2: number;
   createdAt: string;
};
const DeviceState = atom<DeviceType[]>({
   key: 'DeviceState',
   default: []
});

export const DeviceCurrentStatusState = atom<{ [key:string]: DeviceStatusType }>({
   key: 'DeviceStatusState',
   default: {}
});

export default DeviceState;