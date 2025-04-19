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

export type AuthFormType = 'login' | 'sign-up';
