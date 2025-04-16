import { t } from 'i18next';

export type ValidationCriteria = {
  label: string;
  test: (val: string) => boolean;
};

// These validation criterias must match with zod validation schema linked with RHForm
// from 'zod.schemas' file
export const emailCriterias: ValidationCriteria[] = [
  {
    label: t('forms.email.invalid'),
    test: (val: string) =>
      val.trim() !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
  }
];

export const passwordCriterias: ValidationCriteria[] = [
  {
    label: t('forms.password.minLength'),
    test: (val) => val.length >= 12
  },
  {
    label: t('forms.password.capital'),
    test: (val) => /[A-Z]/.test(val)
  },
  {
    label: t('forms.password.number'),
    test: (val) => /\d/.test(val)
  },
  {
    label: t('forms.password.special'),
    test: (val) => /[^A-Za-z0-9]/.test(val)
  }
];

export const authFieldsCriterias: Record<string, ValidationCriteria[]> = {
  email: emailCriterias,
  password: passwordCriterias
};
