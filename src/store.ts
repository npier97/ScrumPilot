import { create } from 'zustand';
import {
  GuestStore,
  ParticipantStore,
  RoomStore,
  SidebarStore,
  TaskStore,
  UsersCardsStore
} from './types/Store';
import { UserStore } from './types/User';
import { persist } from 'zustand/middleware';

export const useParticipantStore = create<ParticipantStore>()(
  persist(
    (set) => ({
      participantUid: '',
      vote: null,
      setParticipantUid: (uid: string) => set({ participantUid: uid })
    }),
    {
      name: 'sp-participant'
    }
  )
);

export const useUsersCardsStore = create<UsersCardsStore>((set) => ({
  isRevealed: false,
  setIsRevealed: (bool: boolean) => set({ isRevealed: bool })
}));

export const useRoomStore = create<RoomStore>((set) => ({
  roomUid: '',
  setRoomUid: (uid: string) => set({ roomUid: uid })
}));

export const useGuestStore = create<GuestStore>((set) => ({
  guestUid: '',
  setGuestUid: (uid: string) => set({ guestUid: uid })
}));

export const useUserStore = create<UserStore>((set) => ({
  userInfos: null,
  setUserInfos: (datas) => set({ userInfos: datas }),
  signOutUser: () => set({ userInfos: null })
}));

export const useCurrentSidebar = create<SidebarStore>((set, get) => ({
  activeSidebar: null,
  toggleActiveSidebar: () => {
    const current = get().activeSidebar;
    set({ activeSidebar: current === null ? 'room' : null });
  },
  openRoomSidebar: () => set({ activeSidebar: 'room' }),
  openTaskSidebar: () => set({ activeSidebar: 'task' }),
  closeSidebar: () => set({ activeSidebar: null })
}));

export const useTaskStore = create<TaskStore>((set) => ({
  taskUid: '',
  setTaskUid: (uid: string) => set({ taskUid: uid })
}));
