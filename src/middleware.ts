import { defineMiddleware } from 'astro:middleware';
//import { getSession } from 'auth-astro/server';

const notAuthenticatedRoutes = ['/login', '/register'];

export const onRequest = defineMiddleware(
  async ({ url, locals, redirect }, next) => {
    const isLoggedIn = false;

    // TODO:
    locals.isLoggedIn = isLoggedIn;
    locals.user = null;

    if (locals.user) {
      // TODO:
      // locals.user = {
      //   avatar: UserActivation.photoURL ?? '',
      //   email: user.email!,
      //   name: user.name!,
      //   emailVerified: user.emailVerified,
      // };
    }

    // TODO: Eventualmente tenemos que controlar el acceso por roles
    if (!locals.isAdmin && url.pathname.startsWith('/dashboard')) {
      return redirect('/');
    }

    if (isLoggedIn && notAuthenticatedRoutes.includes(url.pathname)) {
      return redirect('/');
    }

    return next();
  }
);
