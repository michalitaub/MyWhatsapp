import React from 'react'
import { useState, useEffect } from 'react'
import Utils from '../../Utils'
import EditGroup from './EditGroup';
import ListUsersOrGroups from '../ListUsersOrGroups/ListUsersOrGroups';
import Chat from '../Chat/Chat';


function Groups(props) {
  const [groups, setGroups] = useState([]);
  const [showGroups, setShowGroups] = useState(true);
  const [idGroup, setIdGroup] = useState('');
  const [add, setAdd] = useState(false);
  const [showChat, setShowChat] = useState(false);
  // console.log("groups", groups)
  
  useEffect(() => {
    // Fetch groups
   
    Utils.getGroupsByUserID(props.myUser)
      .then(data => { setGroups(data);  })
      .catch(error => console.error('Error fetching groups:', error));
  }, []);
//רענון קבוצות אחרי שינוי
  const refreshGroups = () => {
    Utils.getGroupsByUserID(props.myUser)
      .then(data => setGroups(data))
      .catch(error => console.error('Error fetching groups:', error));
  };

  const onClickGroup = (id) => {
    setShowGroups(false)
    setIdGroup(id);
    setShowChat(true)
  }
  const onClickAdd = () => {
    setAdd(true)
    setShowGroups(false)
  }

 

  return (
    <div><h1>Groups</h1>
      {showGroups && !add && <button onClick={onClickAdd}>Add Group</button>}
      {add && <EditGroup myUser={props.myUser} setAdd={setAdd} setShowGroups={setShowGroups}  refreshGroups={refreshGroups}></EditGroup>}
      {showGroups && groups && groups.map(group => (
        <ListUsersOrGroups
          key={group._id}
          item={{ _id: group._id, image: group.image, name: group.name }}
          onClickItem={onClickGroup}
        />
      ))}
      {!showGroups && <div>
       { !add&&showChat&&<Chat myUser={props.myUser} group={idGroup}></Chat>}
        <button onClick={() => setShowGroups(true)}>Groups</button>
      </div>}
    </div>
  )
}

export default Groups