import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

type Role = keyof typeof roleBasedPrivateRoutes;

const AuthRoutes = [
    '/login', 
    '/register'
];
const commonPrivateRoutes = [
   '/dashboard',
   '/dashboard/change-password',
   '/doctors',
];
const roleBasedPrivateRoutes = {
   PATIENT: [/^\/dashboard\/patient/],
   DOCTOR: [/^\/dashboard\/doctor/],
   ADMIN: [/^\/dashboard\/admin/],
   SUPER_ADMIN: [/^\/dashboard\/super-admin/],
};


// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    console.log(request.nextUrl);
    const {pathname} = request.nextUrl;
    const accessToken = cookies().get('accessToken')?.value;
    console.log({accessToken});

    // check authenticattion
    if (!accessToken) {
        if (AuthRoutes.includes(pathname)) {
           return NextResponse.next();
        } else {
           return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    if (accessToken && (commonPrivateRoutes.includes(pathname) || commonPrivateRoutes.some((route) => pathname.startsWith(route)))) {
        return NextResponse.next();
    }

    let decodedData = null;
    if (accessToken) {
        decodedData = jwtDecode(accessToken) as any;
    }

    const role = decodedData?.role;
    console.log({role});
    
    // if (role === 'ADMIN' && pathname.startsWith('/dashboard/admin')) {
        //    return NextResponse.next();
    // }

    if (role && roleBasedPrivateRoutes[role as Role]) {
        const routes = roleBasedPrivateRoutes[role as Role];
        if (routes.some((route) => pathname.match(route))) {
            return NextResponse.next();
        }
    }
    

    
  return NextResponse.redirect(new URL('/', request.url))
}
 
// See "Matching Paths" below to learn more
// which which page/routes this middleware will trigger
export const config = {
    //   matcher: '/dashboard/:path*',    // allow all routed under dashboard
    matcher: ['/login', '/register', '/dashboard/:page*', '/doctors/:page*'],
}