import http from 'node:http'
import express from 'express'

import { sequelize } from './db'
import { initPassport } from './utils/passport'
import { errorHandler } from './middlewares/errorHandler'
import registerRoutes from './routes'
import logger from './utils/logger'

const app = express()

const passport = initPassport()

app.use(passport.initialize())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// routes
app.use('/api', registerRoutes())

// error handler
app.use(errorHandler)

const httpServer = http.createServer(app)

try {
	sequelize.sync()
} catch (_error) {
	logger.info('Sequelize sync error')
}

httpServer.listen(8000).on('listening', () => logger.info(`Server started at port ${8000}`))

export default httpServer
