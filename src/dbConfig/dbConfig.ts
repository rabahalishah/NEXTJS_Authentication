import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!) //Question mark here is saying to TS dont worry MONGO_URI will be available everytime.
    const connection = mongoose.connection;
    connection.on('connected', ()=>{
        console.log('MongoDB Connected successfully');
    })
    connection.on('Error', (err)=>{
        console.log('MongoDB Connection Error. Please make sure mongoDB is running' + err)
        process.exit();
    })


  } catch (error) {
    console.log("Something went wrong!", error);
  }
}
