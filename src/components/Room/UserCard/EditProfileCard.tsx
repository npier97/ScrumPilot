import { FilePenLine } from 'lucide-react';
import { useState } from 'react';
import EditProfileModal from './EditProfileModal';

const EditProfileCard = () => {
  const [isModalVisible, setModalVisibility] = useState(false);

  return (
    <>
      <div
        className='relative inline-block cursor-pointer transition-all duration-200 hover:scale-110 hover:grayscale'
        onClick={() => setModalVisibility(true)}
      >
        <img
          className='w-20 h-20 mb-3 rounded-full shadow-sm'
          src='/hacker.png'
          alt='Random image'
        />
        <FilePenLine className='absolute top-0 right-0 bg-white rounded-full p-1 w-5 h-5' />
      </div>
      <EditProfileModal
        isOpen={isModalVisible}
        toggleVisibility={setModalVisibility}
      />
    </>
  );
};

export default EditProfileCard;
