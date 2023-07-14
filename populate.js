import * as dotenv from 'dotenv';
import { connectDB } from './db/connectDb.js';
import { ApiStore } from './models/modelTask.js';
import { productList } from './products.js';
dotenv.config()

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await ApiStore.deleteMany();
        await ApiStore.create(productList)
        console.log('Success run populate file');
        process.exit(0)
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

start()
