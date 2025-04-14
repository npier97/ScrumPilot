import { create } from 'zustand';
import { ParticipantStore } from './types/Store';

export const useParticipantStore = create<ParticipantStore>((set) => ({
  participantId: '',
  setParticipantId: (id: string) => set({ participantId: id })
}));
