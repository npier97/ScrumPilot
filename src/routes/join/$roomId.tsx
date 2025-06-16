import RoomPage from '@/components/Room';
import { SidebarProvider } from '@/components/ui/sidebar';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/join/$roomId')({
  component: RoomComponent
});

function RoomComponent() {
  const [open, setOpen] = useState(false);
  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <RoomPage open={open} />
    </SidebarProvider>
  );
}
