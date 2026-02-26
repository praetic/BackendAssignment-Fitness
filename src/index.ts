import http from 'http'
import express from 'express'

import { sequelize } from './db'
import ProgramRouter from './routes/programs'
import ExerciseRouter from './routes/exercises'
import AuthRouter from './routes/auth'
import { initPassport } from './utils/passport'
import { errorHandler } from './middlewares/errorHandler'

const app = express()

const passport = initPassport()

app.use(passport.initialize())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/api/programs', ProgramRouter())
app.use('/api/exercises', ExerciseRouter())
app.use('/api/auth', AuthRouter())

//error handler
app.use(errorHandler)

const httpServer = http.createServer(app)

try {
	sequelize.sync()
} catch (_error) {
	console.log('Sequelize sync error')
}

httpServer.listen(8000).on('listening', () => console.log(`Server started at port ${8000}`))

export default httpServer
