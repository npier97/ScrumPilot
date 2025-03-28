import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputProps } from '@/types/Room';
import { useTranslation } from 'react-i18next';

const InputField = ({
  isVisible,
  label,
  id,
  value,
  placeholder,
  setValue
}: InputProps) => {
  const { t } = useTranslation();

  if (!isVisible) return null;

  return (
    <>
      <Label htmlFor={id} className='text-right'>
        {t(label)}
      </Label>
      <Input
        id={id}
        className='col-span-3'
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
    </>
  );
};

export default InputField;
