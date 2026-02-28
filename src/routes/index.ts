import { Router } from 'express'

import ProgramRouter from './programs'
import ExerciseRouter from './exercises'
import AuthRouter from './auth'
import UserRouter from './users'
import registerAdminRoutes from './admin'
import { authenticateJWT } from '../middlewares/auth'
import { requireRole } from '../middlewares/requireRole'
import { ROLE } from '../utils/enums'

export default function registerRoutes() {
	const router = Router()

	router.use('/programs', ProgramRouter())
	router.use('/exercises', ExerciseRouter())
	router.use('/auth', AuthRouter())
	router.use('/users', UserRouter())

	// admin routes
	router.use('/admin', authenticateJWT, requireRole(ROLE.ADMIN), registerAdminRoutes())

	return router
}
