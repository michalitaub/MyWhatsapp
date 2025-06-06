import React from 'react'
import { useState, useEffect } from 'react'
import Utils from '../../Utils'
import Chat from '../Chat/Chat'
import ListUsersOrGroups from '../ListUsersOrGroups/ListUsersOrGroups'



function Users(props) {
  const [users, setUsers] = useState([])
  const [showUsers, setShowUsers] = useState(true)
  const [frindId, setFrindId] = useState('')
  
  useEffect(() => {
    // Fetch users
    Utils.getUsers()
      .then(data => {
        setUsers(data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  const onClickUser = (id) => {
    setShowUsers(false)
    setFrindId(id);
  }
 
  return (
    <div >
    <h1>Users</h1>
      {showUsers && users && users.filter(user => user._id !== props.myUser).map(user => (
        <ListUsersOrGroups
         key={user._id}
          item={{_id:user._id,image:user.image,name:user.full_Name}}
           onClickItem={onClickUser}
        />))}

      {!showUsers &&<div> <Chat myUser={props.myUser} frind={frindId}></Chat>
      <button onClick={() => setShowUsers(true)}>Users</button>
      </div>}

    </div>
  )
}

export default Users