const usersRepo=require('../repositories/usersRepo');
const usersFromUrlRepo = require('../repositories/usersFromUrlRepo')
const fs = require('fs');
const path = require('path');

const findUserInUrlByUserNameAndEmail = async (username, email) => {
    const users = await usersFromUrlRepo.getAllUsers()

    const indxUser = users.findIndex(u => u.username === username && u.email === email);
    console.log("indxUser", indxUser);
    if (indxUser === -1)
        return false;


    console.log("name", users[indxUser].name);

    return users[indxUser].name;
}
const getAllUsers = (filter) => {
    return usersRepo.getAllUsers(filter);
}
const getByID = (id) => {
    return usersRepo.getByID(id);
}
const addUser = (obj) => {
    return usersRepo.addUser(obj);

}
const updateUser = (id, obj) => {
    return usersRepo.updateUser(id, obj);
}

//user.image is url like "http://localhost:8080/images/image1.jpg"



const uploadImage =async (id, imageBuffer) => {
    const user = await getByID(id);
    
    if (!user || !user.image) {
        throw new Error("User or user image path not found");
    }

    // המרה מ-URL לנתיב מקומי
    const imageUrl = new URL(user.image);
    const imagePath = path.join(__dirname, '../images', path.basename(imageUrl.pathname)); // שמירת הקובץ באותו שם

    // שמירת הקובץ החדש על הקובץ הקיים
    fs.writeFile(imagePath, imageBuffer, (err) => {
        if (err) {
            throw new Error("Error saving image: " + err.message);
        }
    });

    return { message: "Image updated successfully", image: user.image };
};


module.exports = { findUserInUrlByUserNameAndEmail,getAllUsers, getByID, addUser, updateUser ,uploadImage};