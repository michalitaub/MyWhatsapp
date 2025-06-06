const messages=require('../models/messagesModel');
//get All
const getAllMessages=(filter)=>{
    return messages.find(filter);
}
//get BY ID
const getByID=(id)=>{
    return messages.findById(id);
}
//get messages group 
const getByGroup=(id)=>{
    return messages.find({group:id});
}

//creat message
const addMessages=(obj)=>{
    const message=new messages(obj);
    return message.save();

}
//update message
const updateMessages=(id,obj)=>{
    return Users.findByIdAndUpdate(id,obj);
}
//delete message
const deleteMessages=(id)=>{
    return messages.findByIdAndDelete(id);
}
module.exports={getAllMessages,getByID,getByGroup,addMessages,updateMessages,deleteMessages}