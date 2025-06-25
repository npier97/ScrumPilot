const TaskField = ({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div>
    <label className='font-medium'>{label}</label>
    {children}
  </div>
);

export default TaskField;
