const mongoose = require("mongoose");

// making connection to the mongoDB via mongoose connect function.
const connectDB = async () => {
  const database = "spotlight";
  const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.wcgng4h.mongodb.net/${database}?retryWrites=true&w=majority`;
  try {
    const connection = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDB;
