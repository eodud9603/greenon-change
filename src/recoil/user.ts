import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist()

export type UserType = {
   id: number;
   email?: string;
   name?: string;
   phone?: string;
   isAdmin: boolean;
   loginType?: string;
};
const UserState = atom<UserType|null>({
   key: 'UserState',
   default: null,
   effects: [persistAtom]
});

export default UserState;