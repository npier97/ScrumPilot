export interface ParticipantStore {
  participantId: string;
  setParticipantId: (id: string) => void;
}

export interface UsersCardsStore {
  isRevealed: boolean;
  setIsRevealed: (bool: boolean) => void;
}
