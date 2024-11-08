import express from 'express'
import  sequelize  from './config/db'
import userRoutes from './routes/userRoutes'
import { errorMiddleware } from './middlewares/errorMiddleware'

const app = express()

app.use(express.json())

app.use('/api/users', userRoutes)

app.use(errorMiddleware)

const server = app.listen(4000, () => {
  console.log('Server is running on port 4000')
})

sequelize.sync().then(() => {
  console.log('Database synchronized')
})

export { app, server }
