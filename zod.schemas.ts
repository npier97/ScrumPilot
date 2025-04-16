import { z } from 'zod';

export const createLoginFormSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string({ required_error: t('forms.email.required') })
      .email(t('forms.email.invalid'))
      .min(5, t('forms.email.minLength')),
    password: z
      .string({ required_error: t('forms.password.required') })
      .min(12, t('forms.password.minLength'))
      .regex(/[A-Z]/, 'Au moins une majuscule')
      .regex(/\d/, 'Au moins un chiffre')
      .regex(/[^A-Za-z0-9]/, 'Au moins un caractère spécial')
  });

export type LoginFormType = z.infer<ReturnType<typeof createLoginFormSchema>>;
