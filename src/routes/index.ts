import { Router } from 'express'

import ProgramRouter from './programs'
import ExerciseRouter from './exercises'
import AuthRouter from './auth'
import UserRouter from './users'
import CompletedExercisesRouter from './completedExercises'
import registerAdminRoutes from './admin'
import { authenticateJWT } from '../middlewares/auth'
import { requireRole } from '../middlewares/requireRole'
import { ROLE } from '../utils/enums'

export default function registerRoutes() {
	const router = Router()

	//#region public routes
	router.use('/auth', AuthRouter())
	router.use('/programs', ProgramRouter())
	router.use('/exercises', ExerciseRouter())
	//#endregion

	//#region protected routes
	router.use('/completed-exercises', authenticateJWT, CompletedExercisesRouter())
	router.use('/users', authenticateJWT, UserRouter())
	//#endregion

	//#region admin routes
	router.use('/admin', authenticateJWT, requireRole(ROLE.ADMIN), registerAdminRoutes())
	//#endregion

	return router
}
