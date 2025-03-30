export type ForgotPasswordFormType = {
  email: string;
};

export type RenderFieldProps = {
  control: Control<{ email: string; password?: string }>;
  name: 'email' | 'password';
  type: string;
  placeholder: string;
  label: string;
  autoComplete?: string;
};
