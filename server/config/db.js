import mongoose from "mongoose";

const db = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "best-tech",
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error : ${error.message}`);
    process.exit(1);
  }
};

export default db;
