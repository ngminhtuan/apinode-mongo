import { Job, User } from "../models/modelTask.js"
import { StatusCodes } from "http-status-codes"
import { CustomBadRequest, CustomNotFound } from "../errors/index.js"

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createBy: req.user.userId }).sort('createdAt')
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}

const getJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId } } = req

    const job = await Job.findOne({
        _id: jobId,
        createBy: userId
    })
    if (!job) {
        throw CustomNotFound(`No Job Found with id: ${jobId}`, StatusCodes.NOT_FOUND)
    }
    res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req, res) => {
    req.body.createBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req, res) => {
    const { body: { company, position }, user: { userId }, params: { id: jobId } } = req

    if (company === '' || position === '') {
        throw CustomBadRequest("Company and Position are required", StatusCode.BAD_REQUEST)
    }

    const job = await Job.findOneAndUpdate(
        { _id: jobId, createBy: userId },
        req.body,
        { new: true, runValidators: true }
    )

    if (!job) {
        throw CustomNotFound(`No Job Found with id: ${jobId}`, StatusCodes.NOT_FOUND)
    }
    res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
    const { user: { userId }, params: { id: jobId } } = req 

    const job = await Job.findOneAndRemove({
        _id: jobId,
        createBy:userId
    })

    if (!job) {
        return res.status(StatusCodes.NOT_FOUND).json({msg: `No Job Found with id: ${jobId}`})
        // throw CustomNotFound(`No Job Found with id: ${jobId}`, StatusCodes.NOT_FOUND)
    }

    res.status(StatusCodes.OK).json({msg: `Deleted job with id: ${jobId}`})

}


export { getAllJobs, getJob, createJob, updateJob, deleteJob }