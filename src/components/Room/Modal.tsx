import { db } from '@/firebase-config';
import { ModalProps, RoomType } from '@/types/Room';
import { doc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';

const Modal = ({ room, roomId, isOpen, toggleVisibility }: ModalProps) => {
  const [newMemberName, setNewMemberName] = useState('');

  const handleJoinRoom = async (room: RoomType, newMemberName: string) => {
    if (!room) return;

    const roomRef = doc(db, 'rooms', roomId);

    await updateDoc(roomRef, {
      members: [...room.members, newMemberName]
    });
    toggleVisibility(false);
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Enter your name to join the room</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid grid-cols-4 items-center gap-4'>
          <Label htmlFor='name' className='text-right'>
            Name
          </Label>
          <Input
            id='name'
            className='col-span-3'
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
            placeholder='Your Name'
          />
        </div>
        <DialogFooter>
          <Button
            className='cursor-pointer'
            type='submit'
            onClick={() => handleJoinRoom(room, newMemberName)}
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
