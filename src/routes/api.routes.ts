import { Router } from 'express'
import passport from 'passport'

import {
  createBook,
  deleteBook,
  genres,
  getBook,
  getBooks,
  names,
  updateBook,
} from '../controllers/book.controller'
import {
  createQuote,
  deleteQuote,
  getQuote,
  getQuotes,
  updateQuote,
} from '../controllers/quote.controller'
import {
  additionalEmailVerify,
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
  additionalEmailVerifyRequest,
  emailVerificationRequest,
} from '../requests/email.requests'
import { bookStoreRequest, bookUpdateRequest } from '../requests/book.requests'
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
  .post(
    '/verify-additional-email',
    additionalEmailVerifyRequest,
    validateRequest,
    additionalEmailVerify
  )

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
  .get('/books', getBooks)
  .get('/books/:id', getBook)
  .get('/book-genres', genres)
  .get('/book-names', names)
  .post(
    '/books',
    upload.single('image'),
    bookStoreRequest,
    validateRequest,
    createBook
  )
  .put(
    '/books/:id',
    upload.single('image'),
    bookUpdateRequest,
    validateRequest,
    updateBook
  )
  .delete('/books/:id', deleteBook)

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
  .put(
    '/quotes/:id',
    upload.single('image'),
    quoteUpdateRequest,
    validateRequest,
    updateQuote
  )
  .delete('/quotes/:id', deleteQuote)

userRouter
  .post('/comments', commentStoreRequest, validateRequest, createComment)
  .delete('/comments')

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

userRouter
  .get('/profile', getProfile)
  .put(
    '/profile',
    upload.single('image'),
    profileUpdateRequest,
    validateRequest,
    updateProfile
  )

userRouter
  .post('/email', addAdditionalEmailRequest, validateRequest, addEmail)
  .post('/make-email-primary/:id', makeEmailPrimary)
  .delete('/email/:id', deleteEmail)

export { userRouter, guestRouter }
