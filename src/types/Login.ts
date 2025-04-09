import { Control } from 'react-hook-form';
import { LoginFormType } from 'zod.schemas';

export type ForgotPasswordFormType = {
  email: string;
};

export interface RenderFieldProps {
  name: 'email' | 'password';
  type: string;
  placeholder: string;
  label: string;
  autoComplete?: string;
}

export type SubmitErrorType = {
  status: boolean;
  message?: string | null;
};
