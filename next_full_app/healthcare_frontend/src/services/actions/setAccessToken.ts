'use server';

import { AUTH_KEY } from '@/constant/authKey';
import { cookies } from 'next/headers';


import { redirect } from 'next/navigation';

const setAccessToken = (token: string, option?: any) => {
   cookies().set(AUTH_KEY, token);
   if (option && option.passwordChangeRequired) {
      redirect('/dashboard/change-password');
   }
   if (option && !option.passwordChangeRequired && option.redirect) {
      redirect(option.redirect);
   }
};

export default setAccessToken;