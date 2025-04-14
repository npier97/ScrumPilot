export interface ParticipantStore {
  participantId: string;
  vote: number | null;
  setParticipantId: (id: string) => void;
}

export interface UsersCardsStore {
  isRevealed: boolean;
  setIsRevealed: (bool: boolean) => void;
}
