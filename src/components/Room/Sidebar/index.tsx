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
import { tasks } from './constants';
import { PenLine } from 'lucide-react';

const RoomSidebar = () => (
  <>
    <Sidebar side='right' className='absolute'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Task Management</SidebarGroupLabel>
          <SidebarGroupContent className='mt-10'>
            <SidebarMenu>
              {tasks.map((task) => (
                <SidebarMenuItem key={task.title} className='group/tasks'>
                  <SidebarMenuButton>
                    <span>{task.title}</span>
                    <PenLine className='opacity-0 group-hover/tasks:opacity-100 transition-opacity duration-200' />
                  </SidebarMenuButton>
                  <SidebarMenuBadge>8</SidebarMenuBadge>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  </>
);

export default RoomSidebar;
