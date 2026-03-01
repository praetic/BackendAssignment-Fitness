import { Router } from 'express'

import AdminProgramRouter from './programs'
import AdminExerciseRouter from './exercises'
import AdminUserRouter from './users'

export default function registerAdminRoutes() {
	const router = Router()

	//#region admin routes
	router.use('/programs', AdminProgramRouter())
	router.use('/exercises', AdminExerciseRouter())
	router.use('/users', AdminUserRouter())
	//#endregion

	return router
}
