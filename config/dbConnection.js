const mongoose = require('mongoose')

const connectDB = async ()=>{

    try {
        // console.log(process.env.CONNECTION_STRING);
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log(
            'Database connected!',
            connect.connection.host,
            connect.connection.name,
            

        );
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB;