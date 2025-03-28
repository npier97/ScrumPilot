export interface Room {
  name: string;
  createdAt: Date;
  createdBy: string;
  members: string[];
}

export interface ModalProps {
  path: string;
  room: RoomType;
  roomId: string;
  isOpen: boolean;
  toggleVisibility: (bool: boolean) => void;
}

export type RoomType = Room | null;

export interface InputProps {
  isVisible: boolean;
  label: string;
  id: string;
  value: string;
  placeholder: string;
  setValue: (value: string) => void;
}
