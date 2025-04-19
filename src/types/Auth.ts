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

export type FieldType = RenderFieldProps['name'];
export type FieldValidationsMode = 'manual' | 'auto';

export interface AuthFormProps {
  isVisible?: boolean;
  toggleIsVisible?: () => void;
  authType: AuthFormType;
}
export interface FormFooterProps {
  authType: AuthFormType;
}
