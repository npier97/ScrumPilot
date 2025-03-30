import { RenderFieldProps } from '@/types/login';
import { FormField, FormItem, FormLabel, FormControl } from '../ui/form';
import { Input } from '../ui/input';

export const RenderField = ({
  control,
  name,
  type,
  placeholder,
  label,
  autoComplete
}: RenderFieldProps) => (
  <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            {...field}
            value={field.value ?? ''}
          />
        </FormControl>
      </FormItem>
    )}
  />
);
