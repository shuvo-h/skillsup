
import { AUTH_KEY } from '@/constant/authKey';
import { deleteCookies } from './deleteCookies';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const logoutUser = (router: AppRouterInstance) => {
   localStorage.removeItem(AUTH_KEY);
   deleteCookies([AUTH_KEY, 'refreshToken']);
   router.push('/');
   router.refresh();
};