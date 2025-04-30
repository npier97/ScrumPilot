import { create } from 'zustand';
import { ParticipantStore, RoomStore, UsersCardsStore } from './types/Store';
import { UserStore } from './types/User';

export const useParticipantStore = create<ParticipantStore>((set) => ({
  participantId: '',
  vote: null,
  setParticipantId: (id: string) => set({ participantId: id })
}));

export const useUsersCardsStore = create<UsersCardsStore>((set) => ({
  isRevealed: false,
  setIsRevealed: (bool: boolean) => set({ isRevealed: bool })
}));

export const useRoomStore = create<RoomStore>((set) => ({
  roomId: '',
  setRoomId: (id: string) => set({ roomId: id })
}));

export const useUserStore = create<UserStore>((set) => ({
  userInfos: null,
  setUserInfos: (datas) => set({ userInfos: datas }),
  signOutUser: () => set({ userInfos: null })
}));
