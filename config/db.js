import mongoose from 'mongoose'

const connectDB = async () => {
  const url = process.env.mode === 'development' ? process.env.LOCAL_MONGO_URL : process.env.MONGO_URL
  try {
    const conn = await mongoose.connect(url)
    console.log(`Connected to DB ${conn.connection.host}`)
  } catch (error) {
    console.log(`Error in DB ${error}`)
  }
}

export default connectDB;