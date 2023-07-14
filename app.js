import express from 'express';
import { connectDB } from './db/connectDb.js';
import { errorHandlerMiddleware } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';
import tasks from "./routes/routeTask.js";
import product from './routes/routeProducts.js';
import routeJWT from './routes/routeJWT.js';
import routerAuth from './routes/routeAuth.js';
import routerJobs from './routes/routeJobs.js';
import  {authen}  from './middleware/authentication.js';
import * as dotenv from 'dotenv';
import 'express-async-errors';
dotenv.config()
const app = express();

//middleware
// app.use(express.static('./public'))
app.use(express.json());

// Routes
//app.get(/api/v1/tasks')  - get all the tasks
//app.post('/api/v//tasks') - create a new task
//app.get('/api/v1/tasks/:id') - get single task
//app.patch(/api/v1/tasks/:id') - update task
//app.delete(/api/v1/tasks/:id') - delete task
// app.use('/api/v1/tasks', tasks)
// app.use('/api/v1/products', product)
// app.use('/api/v1/jwt', routeJWT)
app.use('/api/v1/auth', routerAuth)
app.use('/api/v1/jobs', authen, routerJobs)


//Error handler
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening on port ${port}`))
    } catch (error) {
        console.log(error)
    }
}
start()
