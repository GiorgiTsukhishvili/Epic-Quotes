import { Router } from 'express'

import {
  createMovie,
  deleteMovie,
  genres,
  getMovie,
  getMovies,
  names,
  updateMovie,
} from '../controllers/movieController'
import {
  createQuote,
  deleteQuote,
  getQuote,
  getQuotes,
  updateQuote,
} from '../controllers/quoteController'
import {
  emailVerify,
  passwordReset,
  passwordVerify,
  register,
} from '../controllers/authController'
import { getProfile, updateProfile } from '../controllers/profileController'
import {
  addEmail,
  deleteEmail,
  makeEmailPrimary,
  verifyAdditionalEmail,
} from '../controllers/emailController'
import { createComment } from '../controllers/commentController'
import {
  createNotification,
  updateNotification,
} from '../controllers/notificationController'
import { storeOrDestroyLike } from '../controllers/likeController'
import {
  loginRequest,
  newPasswordRequest,
  passwordResetRequest,
  refreshTokenRequest,
  registerRequest,
} from '../requests/authRequests'
import { validateRequest } from '../middleware/validatorMiddleware'
import { storeOrDestroyLikeRequest } from '../requests/likeRequests'
import { commentStoreRequest } from '../requests/commentRequests'
import { emailVerificationRequest } from '../requests/emailRequests'
import { movieStoreRequest, movieUpdateRequest } from '../requests/movieReuests'
import { notificationUpdateRequest } from '../requests/notificationRequests'
import { profileUpdateRequest } from '../requests/profileRequests'
import {
  quoteStoreRequest,
  quoteUpdateRequest,
} from '../requests/quoteRequests'
import { authMiddleware } from '../middleware/authMiddleware'
import {
  login,
  logoOut,
  refreshToken,
  userInfo,
} from '../controllers/userStateController'

const userRouter = Router()
const guestRouter = Router()

userRouter.use(authMiddleware)

guestRouter
  .post('/login', loginRequest, validateRequest, login)
  .get('/verify', emailVerificationRequest, validateRequest, emailVerify)
  .post('/refresh-token', refreshTokenRequest, validateRequest, refreshToken)

guestRouter
  .post('/register', registerRequest, validateRequest, register)
  .post('/password-reset', passwordResetRequest, validateRequest, passwordReset)
  .post('/password-verify', newPasswordRequest, validateRequest, passwordVerify)

userRouter.post('/log-out', logoOut).get('/user-info', userInfo)

userRouter
  .get('/movies', getMovies)
  .get('/movies/:id', getMovie)
  .get('/movie-genres', genres)
  .get('/movie-names', names)
  .post('/movies', movieStoreRequest, validateRequest, createMovie)
  .put('/movies/:id', movieUpdateRequest, validateRequest, updateMovie)
  .delete('/movies/:id', deleteMovie)

userRouter
  .get('/quotes', getQuotes)
  .get('/quotes/:id', getQuote)
  .post('/quotes', quoteStoreRequest, validateRequest, createQuote)
  .put('/quotes/:id', quoteUpdateRequest, validateRequest, updateQuote)
  .delete('/quotes/:id', deleteQuote)

userRouter.post(
  '/comments',
  commentStoreRequest,
  validateRequest,
  createComment
)

userRouter
  .post('/notifications', createNotification)
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
  .put('/profile', profileUpdateRequest, validateRequest, updateProfile)

userRouter
  .post('/email', addEmail)
  .post('/make-email-primary/:id', makeEmailPrimary)
  .post(
    '/verify-email',
    emailVerificationRequest,
    validateRequest,
    verifyAdditionalEmail
  )
  .delete('/email/:id', deleteEmail)

export { userRouter, guestRouter }
