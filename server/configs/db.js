
const mongoose= require('mongoose')

const connectDB=()=>{
    mongoose.
    connect('mongodb://127.0.0.1:27017/DBProject2')
    .then(()=> console.log("Connect to db"))
    .catch((error)=>console.log(error));
    
    
};
module.exports=connectDB;