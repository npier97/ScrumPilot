import { z } from 'zod';

export const createLoginFormSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string({ required_error: t('forms.email.required') })
      .email(t('forms.email.invalid'))
      .min(5, t('forms.email.minLength'))
      .max(255, t('forms.email.maxLength')),
    password: z
      .string({ required_error: t('forms.password.required') })
      .min(12, t('forms.password.minLength'))
      .max(100, t('forms.password.maxLength'))
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/, // Doit contenir au moins une lettre minuscule, une lettre majuscule, un chiffre et au moins un caractère spécial
        t('forms.password.complexity')
      )
  });

export type LoginForm = z.infer<typeof loginFormSchema>;
