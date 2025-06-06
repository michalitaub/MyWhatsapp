import axios from "axios";

async function getUsers() {
    try {
        const token = sessionStorage.token;
        const { data } = await axios.get('http://localhost:8080/users', {
            headers: { 'x-access-token': token }
        });
        console.log(data);
        return data;
    } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 500)) {
            sessionStorage.clear();
            window.location.href = '/';
        }

        else {
            console.error('Error fetching users:', error);
            throw error;
        }
    }
}
async function getGroups() {
    try {
        const token = sessionStorage.token;
        const { data } = await axios.get('http://localhost:8080/groups', {
            headers: { 'x-access-token': token }
        });

        return data;
    } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 500)) {
            sessionStorage.clear();
            window.location.href = '/';
        }

        else {
            console.error('Error fetching groups:', error);
            throw error;
        }
    }
}
async function getUserById(id) {
    try {
        const token = sessionStorage.token;
        const { data } = await axios.get(`http://localhost:8080/users/${id}`, {
            headers: { 'x-access-token': token }
        });
        return data;
    } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 500)) {
            sessionStorage.clear();
            window.location.href = '/';
        }

        else {
            console.error('Error fetching user:', error);
            throw error;
        }
    }
}
async function getGroupById(id) {
    try {
        const token = sessionStorage.token;
        const { data } = await axios.get(`http://localhost:8080/groups/${id}`, {
            headers: { 'x-access-token': token }
        });
        return data;
    } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 500)) {
            sessionStorage.clear();
            window.location.href = '/';
        }

        else {
            console.error('Error fetching group:', error);
            throw error;
        }
    }
}
async function getGroupsByUserID(id) {
    try {
        const token = sessionStorage.token;
        const { data } = await axios.get(`http://localhost:8080/groups/user/${id}`, {
            headers: { 'x-access-token': token }
        });
        return data;
    } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 500)) {
            sessionStorage.clear();
            window.location.href = '/';
        }

        else {
            console.error('Error fetching group:', error);
            throw error;
        }
    }
    
}
async function getChat(id1,id2) {
    try {
        console.log(id1,id2)
        const token = sessionStorage.token;
        const { data } = await axios.get(`http://localhost:8080/groups/chat/${id1}/${id2}`, {
            headers: { 'x-access-token': token }
        });
        console.log(data);
        return data;
    } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 500)) {
            sessionStorage.clear();
            window.location.href = '/';
        }

        else {
            console.error('Error fetching group:', error);
            throw error;
        }
    }
    
}
async function getMessagesGroup(id){
    try {
        const token = sessionStorage.token;
        const { data } = await axios.get(`http://localhost:8080/messages/group/${id}`, {
            headers: { 'x-access-token': token }
        });
        return data;
    } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 500)) {
            sessionStorage.clear();
            window.location.href = '/';
        }

        else {
            console.error('Error fetching group:', error);
            throw error;
        }
    }
}
async function addChatGroup(group) {
    try {
        const token = sessionStorage.token;
        const { data } = await axios.post('http://localhost:8080/groups/chat', group, {
            headers: { 'x-access-token': token }
        });
        return data;
    } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 500)) {
            sessionStorage.clear();
            window.location.href = '/';
        }

        else {
            console.error('Error fetching group:', error);
            throw error;
        }
    }
    
}
async function addGroup(group) {
    try {
        const token = sessionStorage.token;
        const { data } = await axios.post('http://localhost:8080/groups', group, {
            headers: { 'x-access-token': token }
        });
        return data;
    } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 500)) {
            sessionStorage.clear();
            window.location.href = '/';
        }

        else {
            console.error('Error fetching group:', error);
            throw error;
        }
    }
}
async function editUser(user) {
    try {
        console.log(user)
        const token = sessionStorage.token;
        const { data } = await axios.put(`http://localhost:8080/users/${user._id}`, user, {
            headers: { 'x-access-token': token }
        });
        console.log(data);
        // return data;
    } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 500)) {
            sessionStorage.clear();
            window.location.href = '/';
        }

        else {
            console.error('Error fetching user:', error);
            throw error;
        }
    }
}
async function editGroup(group) {
    try {
        const token = sessionStorage.token;
        console.log(group)
        console.log(group._id)
        // const { data } = await axios.put(`http://localhost:8080/groups/${group._id}`, group, {
            const { data } = await axios.put(`http://localhost:8080/groups`, group, {  
        headers: { 'x-access-token': token }
        });
        return data;
    } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 500)) {
            sessionStorage.clear();
            window.location.href = '/';
        }

        else {
            console.error('Error editing group:', error);
            throw error;
        }
    }
}
async function deleteGroup(id) {
    try {
        const token = sessionStorage.token;
        const { data } = await axios.delete(`http://localhost:8080/groups/${id}`, {
            headers: { 'x-access-token': token }
        });
        return data;
    } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 500)) {
            sessionStorage.clear();
            window.location.href = '/';
        }

        else {
            console.error('Error fetching group:', error);
            throw error;
        }
    }
}

export default {
    getUsers,
    getGroups,
    getChat,
    getGroupsByUserID,
    getUserById,
    getGroupById,
    getMessagesGroup,
    addGroup,
    addChatGroup,
    editUser,
    editGroup,
    deleteGroup
};