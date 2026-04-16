export type CategoryId = 'premiers-pas' | 'junior' | 'ado';

export interface Category {
  id: CategoryId;
  label: string;
  icon: string;
  ageRange: string;
}

export const categories: Category[] = [
  { id: 'premiers-pas', label: 'Premiers pas', icon: 'baby.png',  ageRange: '0 – 3 ans' },
  { id: 'junior',       label: 'Junior',        icon: 'girl.png',  ageRange: '3 – 10 ans' },
  { id: 'ado',          label: 'Ado',            icon: 'boy.png',   ageRange: '10 – 16 ans' },
];

export const shoes: Record<CategoryId, string[]> = {
  'premiers-pas': [
    'premiers-pas-1.webp', 'premiers-pas-2.webp', 'premiers-pas-3.webp',
    'premiers-pas-4.webp', 'premiers-pas-5.webp', 'premiers-pas-6.webp',
  ],
  'junior': [
    'junior-1.webp', 'junior-2.webp', 'junior-3.webp', 'junior-4.webp',
    'junior-5.webp', 'junior-6.webp', 'junior-7.webp', 'junior-8.webp',
  ],
  'ado': [
    'ado-1.webp', 'ado-2.webp', 'ado-3.webp', 'ado-4.webp', 'ado-5.webp',
  ],
};
