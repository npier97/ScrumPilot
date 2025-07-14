import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel
} from '@/components/ui/sidebar';
import TaskInputs from './TaskInputs';
import { useTranslation } from 'react-i18next';

const TaskSidebar = () => {
  const { t } = useTranslation();

  return (
    <Sidebar side='right' className='z-60'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('room.sidebar.task.title')}</SidebarGroupLabel>
          <TaskInputs />
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default TaskSidebar;
