import express from 'express'
import { getAllJobs, getJob, createJob, updateJob, deleteJob } from '../controller/controllerJobs.js';

const routerJobs = express.Router();

routerJobs.route('/').post(createJob).get(getAllJobs)
routerJobs.route('/:id').get(getJob).delete(deleteJob).patch(updateJob)

export default routerJobs
