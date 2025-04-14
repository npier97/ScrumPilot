import { create } from 'zustand';
import { ParticipantStore, UsersCardsStore } from './types/Store';

export const useParticipantStore = create<ParticipantStore>((set) => ({
  participantId: '',
  vote: null,
  setParticipantId: (id: string) => set({ participantId: id })
}));

export const useUsersCardsStore = create<UsersCardsStore>((set) => ({
  isRevealed: false,
  setIsRevealed: (bool: boolean) => set({ isRevealed: bool })
}));
