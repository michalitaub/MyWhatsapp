import React, { useState, useEffect } from 'react';
import Utils from '../../Utils';


function EditGroup(props) {
    const [newGroup, setNewGroup] = useState({ name: "name group", image: "image", members: [] });
    const [users, setUsers] = useState([]);
    const [image, setImage] = useState(null);
    useEffect(() => {

        Utils.getUsers()
            .then(data => {
                setUsers(data);

            })
            .catch(error => console.error('Error fetching users:', error));

    }, []);

    const onClickAdd = () => {
        const formData = new FormData();
        formData.append("name", newGroup.name);
        formData.append("myFile", image); // הוספת התמונה ל-FormData
        formData.append("members", [...newGroup.members, props.myUser]);

        Utils.addGroup(formData) // שולח את ה-FormData ל-API
            .then(() => {
                props.setAdd(false);
                props.refreshGroups(); // רענון הקבוצות
                setNewGroup({ name: "name group", members: [] });
                // return Utils.getGroups();
            })
            .then(console.log('Group added successfully'))
            .catch(error => console.error('Error adding group:', error));
        props.setAdd(false)
    }
    

  const handleImageUpload = (event) => {
    
    const file = event.target.files[0];
    if (!file) return;
    setImage(file); 
   
  };
  const onClickCancel = () => {
    props.setAdd(false)
    props.setShowGroups(true)
  }
    return (
        <div className='add-group'>
            <input type="text" value={newGroup.name} onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })} />
          
            <input type="file" accept=".jpg, .png, " onChange={handleImageUpload } />
            <div className='members'>members:
                {newGroup.members.map(member =>
                    <div className='member' key={member}>{users.find(user => user._id === member).full_Name}
                        <button className='button-member' onClick={() => setNewGroup({ ...newGroup, members: newGroup.members.filter(m => m !== member) })}>X</button>
                    </div>)}
            </div>
            <br />

            <select onChange={(e) => {
                const selectedUser = Array.from(e.target.selectedOptions, option => option.value);
                setNewGroup({ ...newGroup, members: [...newGroup.members, ...selectedUser] });
            }}>

                {users.filter((user) => {
                    const isMember = newGroup.members.includes(user._id);
                    return user._id != props.myUser && !isMember
                }).map(user => <option key={user._id} value={user._id}>
                    {user.full_Name}
                </option>)}
            </select>
            <div className='chat-input'>
            <button onClick={onClickAdd}>Add</button>
            <button onClick={onClickCancel}>Canel</button>
            </div>
        </div>
    )
}

export default EditGroup