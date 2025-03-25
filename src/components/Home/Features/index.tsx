import features from '@/ressources/datas/featuresSectionMessages';

const Feature = () => {
  return (
    <section className='container mx-auto w-full flex max-lg:flex-col max-lg:space-y-5 lg:space-x-7 pb-14'>
      {features?.map(({ title, icon: Icon, description }, idx) => (
        <div
          key={idx}
          className=' shadow rounded flex-1 flex flex-col items-start px-5 py-5 '
        >
          <Icon strokeWidth={'3px'} className='text-blue-500' />
          <p className='mt-1 font-bold'>{title}</p>
          <p className='mt-3 text-sm'>{description}</p>
        </div>
      ))}
    </section>
  );
};

export default Feature;
