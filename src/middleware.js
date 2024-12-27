
import { getToken } from 'next-auth/jwt';
import { PUBLIC_ROUTES, ADMIN_ROUTES, USER_ROUTES, LOGIN, ROOT } from './lib/routes';
import { NextResponse } from 'next/server';

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(request) {
    const token = await getToken({ req: request, secret });
    const { nextUrl } = request;
    const isAuthenticated = !!token;
    const isPublicRoute = PUBLIC_ROUTES.some(route => nextUrl.pathname.startsWith(route)) || nextUrl.pathname === ROOT;
    const isAuthRoute = nextUrl.pathname.startsWith(LOGIN);
    
    // If the user is authenticated
    if (isAuthenticated) {
        // If the user tries to access the login page, redirect based on their role
        if (isAuthRoute) {
            const userRole = token?.role?.name;

            if (userRole === 'Admin') {
                return NextResponse.redirect(new URL(ADMIN_ROUTES[0], nextUrl));
            } else if (userRole === 'User') {
                return NextResponse.redirect(new URL(USER_ROUTES[0], nextUrl));
            } else {
                return NextResponse.redirect(new URL(ROOT, nextUrl));
            }
        }
    }

    // If it's a public route, proceed normally
    if (isPublicRoute) {
        return NextResponse.next();
    }

    // If the user is not authenticated and not trying to access login
    if (!isAuthenticated) {
        if (!isAuthRoute) {
            return NextResponse.redirect(new URL(LOGIN, nextUrl));
        }
    }

    // If the user is logged in but not on their appropriate route, redirect based on their role
    const userRole = token?.role?.name; 

    if (userRole === 'Admin') {
        if (!ADMIN_ROUTES.includes(nextUrl.pathname)) {
            return NextResponse.redirect(new URL(ADMIN_ROUTES[0], nextUrl)); 
        }
    } else if (userRole === 'User') {
        if (!USER_ROUTES.includes(nextUrl.pathname)) {
            return NextResponse.redirect(new URL(USER_ROUTES[0], nextUrl));
        }
    } else {
        return NextResponse.redirect(new URL(ROOT, nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next|_next/image|_next/static|favicon.ico).*)", "/", "/(api|trpc)(.*)"]
};
