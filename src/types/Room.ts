export interface Room {
  name: string;
  createdAt: Date;
  createdBy: string;
  members: string[];
}

export interface ModalProps {
  room: RoomType;
  roomId: string;
  isOpen: boolean;
  toggleVisibility: (bool: boolean) => void;
}

export type RoomType = Room | null;
