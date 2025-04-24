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
  roomUid: string;
}

export type ModalFooterProps = Pick<ModalProps, 'room' | 'roomUid'> & {
  isAdmin: boolean;
  roomName: string;
  participantName: string;
  setModalVisibility: (bool: boolean) => void;
};

export type RoomType = RoomProps | null;
export type ParticipantsType = {
  uid: string;
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

export type VotingPanelType = Pick<ModalProps, 'roomUid'>;

export interface CardProps {
  number: number;
  selectedNumber: number | null;
  onClick: (number: number) => void;
}

export interface EditProfileProps {
  isOpen: boolean;
  toggleVisibility: (bool: boolean) => void;
}

export interface ActiveRoomProps {
  roomData: RoomProps;
}
