const { get } = require('mongoose');
const groupsRepo = require('../repositories/groupsRepo');
const fs = require('fs').promises;;
const path = require('path');

const getAllGroups = (filter) => {
    return groupsRepo.getAllGroups(filter);
}
const getByUserID =async (id) => {
   
    const groups= await getAllGroups();
    return groups.filter(group => group.members.includes(id)&&!(group.name == "chat" && group.members.length === 2));
}
const getByID = (id) => {
    return groupsRepo.getByID(id);
}
const getGroupChat = (id1, id2) => {
    return groupsRepo.getGroupChat(id1, id2);
}
const addChatGroup = (obj) => {
    return groupsRepo.addGroup(obj);
}
const addGroup = (obj,imageBuffer) => {
  
       
        const imagePath = path.join(__dirname, '../images', `${obj.name}-image.jpg`); // שמירת הקובץ בשם חדש    
        // שמירת הקובץ החדש 
        fs.writeFile(imagePath, imageBuffer, (err) => {
            if (err) {
                throw new Error("Error saving image: " + err.message);
            }
        });
     obj.members=obj.members.split(',').map(member=>member.trim());
       obj.image = `http://localhost:8080/images/${obj.name}-image.jpg`
    return groupsRepo.addGroup(obj);

}
const updateGroups =async (id, obj,imageBuffer) => {
    // const group = await getByID(id);
    // console.log(imageBuffer)
        
    //     if (!group || !group.image) {
    //         throw new Error("Group or group image path not found");
    //     }
    
    //     // המרה מ-URL לנתיב מקומי
    //     const imageUrl = new URL(group.image);
    //     const imagePath = path.join(__dirname, '../images', path.basename(imageUrl.pathname)); // שמירת הקובץ באותו שם
    
    //     // שמירת הקובץ החדש על הקובץ הקיים
    //     fs.writeFile(imagePath, imageBuffer, (err) => {
    //         if (err) {
    //             throw new Error("Error saving image: " + err.message);
    //         }
    //     });
    // // obj.image = imagePath;
    // const updateGroup={name:obj.name||group.name,image:group.image,members:group.members}
    // console.log("updateGroup",updateGroup)
    // return groupsRepo.updateGroups(id, updateGroup);
    try {
       
        const group = await getByID(id);
       
        if (!group) {
            throw new Error("Group not found");
        }
        console.log("group", group)

        let imagePath;
        if (group.image && group.image.startsWith('http')) {
            // המרה מנתיב URL לנתיב מערכת הקבצים
            const imageName = path.basename(new URL(group.image).pathname);
            imagePath = path.join(__dirname, '../images', imageName);
        } else {
            // אם אין תמונה, ניצור נתיב חדש
            imagePath = path.join(__dirname, '../images', `${obj.name}-image.jpg`);
        }

        // שמירת הקובץ החדש על הקובץ הקיים
        if (imageBuffer) {
            
    console.log("Saving image to:", imagePath);
            await fs.writeFile(imagePath, imageBuffer);
        }
       
       
        const updateGroup = {
            name: obj.name || group.name,
            image: `http://localhost:8080/images/${path.basename(imagePath)}`,
            members: obj.members || group.members
        };

        console.log("Updated group:", updateGroup);
        return groupsRepo.updateGroups(id, updateGroup);
    } catch (error) {
        throw new Error("Error updating group: " + error.message);
    }
}
const deleteGroups = (id) => {
    return groupsRepo.deleteGroups(id);
}
module.exports = { getByUserID,getAllGroups, getByID,getGroupChat,addChatGroup, addGroup, updateGroups, deleteGroups };