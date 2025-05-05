import { Button } from '@/components/ui/button';
import { InvitationLinkType } from '@/types/Room';
import { Copy } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

const InvitationLink = ({ activeRooms }: InvitationLinkType) => {
  const { t } = useTranslation();
  const link = `${window.location.origin}/join/${activeRooms[0]?.uid}`;

  const handleInviteOnClick = () => {
    navigator.clipboard.writeText(link);
    toast.success(t('room.copied'));
  };

  return (
    <section className='mt-8 p-6 rounded-xl border shadow-lg'>
      <h2 className='mb-4 font-bold'>{t('dashboard.invitationLink.title')}</h2>
      <p className='mb-2 font-semibold text-gray-500'>
        {t('dashboard.invitationLink.description')}
      </p>
      <div className='flex flex-col gap-2 md:flex-row md:justify-between'>
        <input
          type='text'
          value={link}
          className='w-full border p-2 rounded-lg bg-gray-100 text-sm'
          aria-label='Invitation link'
          readOnly
        />
        <Button
          className='w-full px-20 bg-blue-600 cursor-pointer hover:bg-blue-500  md:max-w-[150px]'
          onClick={handleInviteOnClick}
          disabled={!activeRooms?.length}
          aria-label='Copy invitation link'
        >
          <Copy />
          {t('dashboard.invitationLink.buttonText')}
        </Button>
      </div>
    </section>
  );
};

export default InvitationLink;
