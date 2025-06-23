export interface ParticipantStore {
  participantUid: string;
  vote: number | null;
  setParticipantUid: (uid: string) => void;
}

export interface UsersCardsStore {
  isRevealed: boolean;
  setIsRevealed: (bool: boolean) => void;
}

export interface RoomStore {
  roomUid: string;
  setRoomUid: (uid: string) => void;
}

export interface GuestStore {
  guestUid: string;
  setGuestUid: (uid: string) => void;
}

export interface SidebarStore {
  activeSidebar: 'room' | 'task' | null;
  toggleActiveSidebar: () => void;
  openRoomSidebar: () => void;
  openTaskSidebar: () => void;
  closeSidebar: () => void;
}
