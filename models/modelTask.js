import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Minimum 5 maximum 15'],
        trim: true,
        maxLength: [20, 'name can not be more than 20 characters'],
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const ApiStoreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product name must be provided'],
    },
    price: {
        type: Number,
        required: [true, 'Product price must be provided'],
    },
    featured: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
    company: {
        type: String,
        enum: {
            values: ['ikea', 'liddy', 'caressa', 'marcos'],
            message: '{VALUE} is not supported'
        }
    }
    //enum: ['ikea', 'liddy', 'caressa', 'marcos']
})

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minLength: 3,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minLength: 6,
    },
})


UserSchema.pre('save', async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function() {
    return jwt.sign({userId: this._id, name: this.name}, process.env.JWT_SECRET || "secretJwt",{expiresIn: process.env.JWT_LIFETIME})
}

UserSchema.methods.comparePassword = async function(candidatePass) {
    const isMatch = await bcrypt.compare(candidatePass, this.password)
    return isMatch
}

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide company name'],
        maxLength: 50
    },
    position:{
        type: String,
        required: [true, 'Please provide company position'],
        maxLength: 100
    },
    status: {
        type: String,
        enum: ['interview', 'declined', 'pending'],
        default: 'pending'
    },
    createBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide User']
    }
}, {timestamps: true})

export const Task = mongoose.model('Task', TaskSchema)
export const ApiStore = mongoose.model('Api Store', ApiStoreSchema)
export const User = mongoose.model('User', UserSchema)
export const Job = mongoose.model('Jobs', JobSchema)
