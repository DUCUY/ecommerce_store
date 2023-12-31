const { default: mongoose } = require('mongoose');

const dbConnect = () => {
    try {
        const conn = mongoose.connect(process.env.MONGODB_URl);
        console.log("Database Connected Successfully");
    }catch (error) {
     console.log("Database Error");   
    }
}

module.exports = dbConnect;