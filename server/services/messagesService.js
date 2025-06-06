const messagesRepo=require('../repositories/messagesRepo');
const getAllMessages=()=>{
    return messagesRepo.getAllMessages();
}
const getMessageByID=(id)=>{
    return messagesRepo.getMessageByID(id);
}
const getByGroup=(id)=>{
    return messagesRepo.getByGroup(id);
}
const addMessage=(obj)=>{
    return messagesRepo.addMessage(obj);
}
const updateMessage=(id,obj)=>{
    return messagesRepo.updateMessage(id,obj);
}
const deleteMessage=(id)=>{
    return messagesRepo.deleteMessage(id);
}
module.exports={getAllMessages,getMessageByID,getByGroup,addMessage,updateMessage,deleteMessage}