const UsersCard = ({ members }: { members: string[] }) => (
  <div className={'rounded-xl border py-12 px-20 shadow-lg text-center'}>
    <div className='flex flex-row justify-center gap-8 '>
      {members.map((member) => (
        <div className='flex flex-col items-center' key={`${member}`}>
          <img
            className='w-20 h-20 mb-3 rounded-full shadow-sm'
            src='/src/assets/react.svg'
            alt='Random image'
          />
          <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
            {member}
          </h5>
          <span className='text-sm text-gray-500 dark:text-gray-400'>
            Visual Designer
          </span>
        </div>
      ))}
    </div>
    <hr className='my-6 h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10' />
    Average estimate
  </div>
);

export default UsersCard;
