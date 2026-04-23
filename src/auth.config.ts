import type { NextAuthConfig } from 'next-auth'

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const pathname = nextUrl.pathname

      const isPublicPath =
        pathname === '/login' ||
        pathname.startsWith('/login/') ||
        pathname.startsWith('/api/auth/')

      if (isPublicPath) return true

      if (!isLoggedIn) {
        const loginUrl = new URL('/login', nextUrl)
        loginUrl.searchParams.set('callbackUrl', pathname)
        return Response.redirect(loginUrl)
      }

      return true
    },
  },
  providers: [],
} satisfies NextAuthConfig
