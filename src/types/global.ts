import { AuthenticateOptionsGoogle } from 'passport-google-oauth20'

declare global {
  namespace Express {
    interface Request {
      user?: User | undefined
    }
  }
}

export interface ExtendedAuthenticateOptionsGoogle
  extends AuthenticateOptionsGoogle {
  callbackURL: string
}
