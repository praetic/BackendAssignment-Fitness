import type { AuthJwtPayload } from '../utils/jwt'

declare global {
	namespace Express {
		interface User extends AuthJwtPayload {}

		interface Request {
			user?: User
		}
	}
}
