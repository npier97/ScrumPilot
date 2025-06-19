import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel
} from '@/components/ui/sidebar';
import TaskInputs from './TaskInputs';

const TaskSidebar = () => (
  <Sidebar side='right' className='z-60'>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Task</SidebarGroupLabel>
        <TaskInputs />
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
);

export default TaskSidebar;
