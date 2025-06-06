const Groups = require('../models/groupsModel');
//get All
const getAllGroups = (filter) => {
    return Groups.find(filter);
}
//get BY ID
const getByID = (id) => {
    return Groups.findById(id);

}
//get group chat
const getGroupChat=(id1,id2)=>{
    return Groups.find({ name: "chat", members: { $all: [id1, id2] },   $expr: { $eq: [{ $size: "$members" }, 2] }});
}
//creat group
const addGroup = (obj) => {
    const group = new Groups(obj);
    return group.save();

}
//update group
const updateGroups = (id, obj) => {
    return Groups.findByIdAndUpdate(id, obj);
}
//delete group
const deleteGroups = (id) => {
    return Groups.findByIdAndDelete(id);
}
module.exports = { getAllGroups, getByID,getGroupChat, addGroup, updateGroups, deleteGroups }
