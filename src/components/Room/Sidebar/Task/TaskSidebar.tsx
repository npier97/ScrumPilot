import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel
} from '@/components/ui/sidebar';
import TaskForm from './TaskForm';

const TaskSidebar = () => (
  <>
    <Sidebar side='right' className='z-60'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Task</SidebarGroupLabel>
          <TaskForm />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  </>
);

export default TaskSidebar;
