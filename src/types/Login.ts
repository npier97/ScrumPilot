import { Control } from 'react-hook-form';
import { LoginFormType } from 'zod.schemas';

export type ForgotPasswordFormType = {
  email: string;
};

export type RenderFieldProps = {
  control: Control<LoginFormType> | Control<ForgotPasswordFormType>;
  name: 'email' | 'password';
  type: string;
  placeholder: string;
  label: string;
  autoComplete?: string;
};
