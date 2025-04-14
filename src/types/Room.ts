export interface RoomProps {
  createdAt: Date;
  createdBy: string;
  name: string;
  participants: ParticipantsType;
  isVoteRevealed: boolean;
}

export interface ModalProps {
  path: string;
  room: RoomType;
  roomId: string;
  isOpen: boolean;
  toggleVisibility: (bool: boolean) => void;
}

export type RoomType = RoomProps | null;
export type ParticipantsType = {
  id: string;
  name: string;
  avatar: string;
  vote: number;
};

export interface InputProps {
  isVisible: boolean;
  label: string;
  id: string;
  value: string;
  placeholder: string;
  setValue: (value: string) => void;
}

export type VotingPanelType = Pick<ModalProps, 'roomId'>;

export interface CardProps {
  number: number;
  selectedNumber: number | null;
  onClick: (number: number) => void;
}
