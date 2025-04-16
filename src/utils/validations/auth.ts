export type ValidationCriteria = {
  label: string;
  test: (val: string) => boolean;
};

// These validation criterias must match with zod validation schema linked with RHForm
// from 'zod.schemas' file
export const emailCriterias: ValidationCriteria[] = [
  {
    label: 'Format email valide',
    test: (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
  },
  {
    label: '5 caractères minimum',
    test: (val: string) => val.length >= 5
  }
];

export const passwordCriterias: ValidationCriteria[] = [
  {
    label: '12 caractères minimum',
    test: (val) => val.length >= 12
  },
  {
    label: '1 lettre majuscule',
    test: (val) => /[A-Z]/.test(val)
  },
  {
    label: '1 chiffre',
    test: (val) => /\d/.test(val)
  },
  {
    label: '1 caractère spécial',
    test: (val) => /[^A-Za-z0-9]/.test(val)
  }
];

export const authFieldsCriterias: Record<string, ValidationCriteria[]> = {
  email: emailCriterias,
  password: passwordCriterias
};
