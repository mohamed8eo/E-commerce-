import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
  matcher: [
    // Exclude sign-in and sign-up (and their children)
    '/((?!_next|sign-in|sign-in/.*|sign-up|sign-up/.*|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    
    '/(api|trpc)(.*)',
  ],
}