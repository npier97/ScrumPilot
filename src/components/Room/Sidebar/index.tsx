import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { PenLine } from 'lucide-react';
import { useCurrentSidebar, useRoomStore, useTaskStore } from '@/store';
import { Button } from '@/components/ui/button';
import { TaskProps } from '@/types/Room';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/firebase-config';
import { useTranslation } from 'react-i18next';

const RoomSidebar = ({ tasks }: { tasks: TaskProps[] }) => {
  const { t } = useTranslation();
  const { setTaskUid } = useTaskStore();
  const { openTaskSidebar } = useCurrentSidebar();
  const roomId = useRoomStore((state) => state.roomUid);

  const handleOpenTask = (taskId: string) => {
    setTaskUid(taskId);
    openTaskSidebar();
  };

  const handleAddTask = async () => {
    try {
      const tasksCollectionRef = collection(db, 'rooms', roomId, 'tasks');
      const docRef = await addDoc(tasksCollectionRef, {
        title: '',
        description: '',
        storyPoints: ''
      });
      setTaskUid(docRef.id);
    } catch (error) {
      console.error('Error adding task:', error);
    }
    openTaskSidebar();
  };

  return (
    <>
      <Sidebar side='right' className='z-50'>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>{t('room.sidebar.title')}</SidebarGroupLabel>
            <SidebarGroupContent className='mt-10'>
              <SidebarMenu>
                {tasks.map((task) => (
                  <SidebarMenuItem key={task.title} className='group/tasks'>
                    <SidebarMenuButton onClick={() => handleOpenTask(task.id)}>
                      <span>{task.title}</span>
                      <PenLine className='opacity-0 group-hover/tasks:opacity-100 transition-opacity duration-200' />
                    </SidebarMenuButton>
                    <SidebarMenuBadge>{task.storyPoints}</SidebarMenuBadge>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
            <Button onClick={handleAddTask}>{t('room.sidebar.addTask')}</Button>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
};

export default RoomSidebar;
