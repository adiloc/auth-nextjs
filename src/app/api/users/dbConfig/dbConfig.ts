import mongoose from 'mongoose';

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    
    connection.on('connected', () => {
      console.log('MongoDB conected successfully!');
    })

    connection.on('error', (err) => {
      console.log('MongoDB connection error. Plase make sure MngoDB is running.' + err);
      process.exit();
    })


  } catch(error) {
    console.log('Somethings goes wrong!')
    console.log(error)

  }
}