import { Router } from 'express'
import passport from 'passport'

import {
  createMovie,
  deleteMovie,
  genres,
  getMovie,
  getMovies,
  names,
  updateMovie,
} from '../controllers/movie.controller'
import {
  createQuote,
  deleteQuote,
  getQuote,
  getQuotes,
  updateQuote,
} from '../controllers/quote.controller'
import {
  emailVerify,
  passwordReset,
  passwordVerify,
  register,
} from '../controllers/auth.controller'
import { getProfile, updateProfile } from '../controllers/profile.controller'
import {
  addEmail,
  deleteEmail,
  makeEmailPrimary,
} from '../controllers/email.controller'
import { createComment } from '../controllers/comment.controller'
import {
  getNotifications,
  updateNotification,
} from '../controllers/notification.controller'
import { storeOrDestroyLike } from '../controllers/like.controller'
import {
  loginRequest,
  newPasswordRequest,
  passwordResetRequest,
  refreshTokenRequest,
  registerRequest,
} from '../requests/auth.requests'
import { validateRequest } from '../middleware/validator.middleware'
import { storeOrDestroyLikeRequest } from '../requests/like.requests'
import { commentStoreRequest } from '../requests/comment.requests'
import {
  addAdditionalEmailRequest,
  emailVerificationRequest,
} from '../requests/email.requests'
import {
  movieStoreRequest,
  movieUpdateRequest,
} from '../requests/movie.requests'
import { notificationUpdateRequest } from '../requests/notification.requests'
import { profileUpdateRequest } from '../requests/profile.requests'
import {
  quoteStoreRequest,
  quoteUpdateRequest,
} from '../requests/quote.requests'
import { authMiddleware } from '../middleware/auth.middleware'
import {
  login,
  logoOut,
  refreshToken,
  userInfo,
} from '../controllers/userState.controller'
import upload from '../utils/upload'

import {
  googleCallback,
  googleRedirect,
} from '../controllers/google.controller'

const userRouter = Router()
const guestRouter = Router()

userRouter.use(authMiddleware)

guestRouter
  .post('/login', loginRequest, validateRequest, login)
  .get('/verify-email', emailVerificationRequest, validateRequest, emailVerify)
  .post('/refresh-token', refreshTokenRequest, validateRequest, refreshToken)

guestRouter
  .post('/register', registerRequest, validateRequest, register)
  .post('/password-reset', passwordResetRequest, validateRequest, passwordReset)
  .post('/password-verify', newPasswordRequest, validateRequest, passwordVerify)

guestRouter.get('/auth/google/redirect/:locale', googleRedirect)

guestRouter.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  }),
  googleCallback
)

userRouter.post('/log-out', logoOut).get('/user-info', userInfo)

userRouter
  .get('/movies', getMovies)
  .get('/movies/:id', getMovie)
  .get('/movie-genres', genres)
  .get('/movie-names', names)
  .post(
    '/movies',
    upload.single('image'),
    movieStoreRequest,
    validateRequest,
    createMovie
  )
  // .put('/movies/:id', movieUpdateRequest, validateRequest, updateMovie)
  .delete('/movies/:id', deleteMovie)

userRouter
  .get('/quotes', getQuotes)
  .get('/quotes/:id', getQuote)
  .post(
    '/quotes',
    upload.single('image'),
    quoteStoreRequest,
    validateRequest,
    createQuote
  )
  // .put('/quotes/:id', quoteUpdateRequest, validateRequest, updateQuote)
  .delete('/quotes/:id', deleteQuote)

userRouter.post(
  '/comments',
  commentStoreRequest,
  validateRequest,
  createComment
)

userRouter
  .get('/notifications', getNotifications)
  .put(
    '/notifications',
    notificationUpdateRequest,
    validateRequest,
    updateNotification
  )

userRouter.post(
  '/store-or-destroy-like/:id',
  storeOrDestroyLikeRequest,
  validateRequest,
  storeOrDestroyLike
)

userRouter.get('/profile', getProfile)
// .put('/profile', profileUpdateRequest, validateRequest, updateProfile)

userRouter
  .post('/email', addAdditionalEmailRequest, validateRequest, addEmail)
  .post('/make-email-primary/:id', makeEmailPrimary)
  .delete('/email/:id', deleteEmail)

export { userRouter, guestRouter }
