import mongoose from "mongoose";


const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Mongodb connected successfully');
    } catch (error) {
        console.error('error connecting to moongodb', error.message);
        process.exit(1);
    }
}

export default connectDb;