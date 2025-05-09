import { DocumentData } from 'firebase/firestore';

export type NumericActionProps = 'increment' | 'decrement';

export type OnBoardingMessage = {
  stepTitle: string;
  stepDescription: string;
  stepShowcase: string;
};

export interface OnBoardingStepPropTypes {
  isLastStep: boolean;
  messages: OnBoardingMessage;
  incrementCurrentStepIndex: () => void;
  closeProcess: () => void;
  resetProcess: () => void;
}

export interface OnBoardingFooterProps {
  index: number;
  decrementStepIndex: () => void;
  closeDialog: () => void;
}

export interface ActiveRoomsProps {
  activeRooms: DocumentData[];
  error: string | null;
}

export type InvitationLinkType = Pick<ActiveRoomsProps, 'activeRooms'>;

export interface RoomSettingsProps {
  roomId: string;
  activeRoom: string | null;
  onToggle: (uid: string) => void;
}
