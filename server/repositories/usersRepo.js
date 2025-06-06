const Users=require('../models/usersModel');

//get All
const getAllUsers=(filter)=>{
    return Users.find(filter);
}
//get BY ID
const getByID=(id)=>{
    return Users.findById(id);

}
//creat user
const addUser=(obj)=>{
    const users=new Users(obj);
    return users.save();

}
//update user
const updateUser=(id,obj)=>{
    return Users.findByIdAndUpdate(id,obj);
}

module.exports={getAllUsers,getByID,addUser,updateUser}