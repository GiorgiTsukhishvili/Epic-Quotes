import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { prisma } from '../config/prisma'
import { HttpRequests } from '../enums/httpRequests.enum'

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: `${process.env.GOOGLE_REDIRECT_URI}/:locale`,
    },
    async (_, __, profile, done) => {
      const email = profile!.emails![0].value
      try {
        // Check if the email exists
        let emailEntry = await prisma.email.findUnique({
          where: { email },
          include: { user: true },
        })

        if (emailEntry) {
          // Check if the user has a password set
          if (emailEntry.user.password) {
            return done(null, {
              error: 'User already exists',
              statusCode: HttpRequests.HTTP_NOT_FOUND,
            })
          }
          return done(null, emailEntry.user)
        }

        // Create a new user
        const newUser = await prisma.user.create({
          data: {
            name: profile.displayName.toLowerCase().replace(/\s+/g, ''),
            googleId: profile.id,
            image:
              profile.photos?.[0].value ??
              `${process.env.APP_URL}/imgs/default.png`,
          },
        })

        await prisma.email.create({
          data: {
            email,
            userId: newUser.id,
            emailVerifiedAt: new Date().toISOString(),
            isPrimary: true,
          },
        })

        return done(null, newUser)
      } catch (error) {
        return done(error, undefined)
      }
    }
  )
)

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user: Express.User, done) => done(null, user))
