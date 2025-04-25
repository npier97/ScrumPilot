import { RoomProps } from './Room';
import { Timestamp } from 'firebase/firestore';

export type UserInfos = {
  email: string;
  uid: string;
  createdAt: Timestamp;
  LastUpdateTime: Timestamp;
  rooms: RoomProps[];
  isNewUser: boolean;
} | null;

export type UserStore = {
  userInfos: UserInfos;
  setUserInfos: (datas: UserInfos) => void;
  checkoutUser: () => void;
};
