import RoomPage from '@/components/Room';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/join/$roomId')({
  component: RoomPage
});
