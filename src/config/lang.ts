export const LANG = {
  en: {
    direction: 'ltr',
    labels: {
      firstName: 'First Name',
      lastName: 'Last Name',
      age: 'Age',
      education: 'Education',
      birthDate: 'Birth Date',
      nationalId: 'National ID',
      upload: 'Upload your file(s)',
      save: 'Save',
      cancel: 'Cancel',
    },
  },
  fa: {
    direction: 'rtl',
    labels: {
      firstName: 'نام',
      lastName: 'نام خانوادگی',
      age: 'سن',
      education: 'تحصیلات',
      birthDate: 'تاریخ تولد',
      nationalId: 'کد ملی',
      upload: 'فایل خود را بارگذاری کنید',
      save: 'ذخیره',
      cancel: 'لغو',
    },
  },
} as const;

export type LangType = keyof typeof LANG;
