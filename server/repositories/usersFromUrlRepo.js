const axios = require('axios');

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';


const getAllUsers = async () => {
  const { data: users } = await axios.get(USERS_URL);
 
return users;
};




module.exports={getAllUsers}