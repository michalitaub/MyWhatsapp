import React from 'react'
import { useState, useEffect } from 'react';
import './HomePage.css'; // Import the CSS file for styling
import Utils from '../../Utils';
import Groups from '../Groups/Groups';
import Usrs from '../Users/Users';
import { set } from 'mongoose';

function HomePage() {
  const [myUser, setMyUser] = useState({ _id: "", full_name: "", image: '' });

  const [isEdit, setIsEdit] = useState(false);
  const [isGroups, setIsGroups] = useState(false);
  const [isUsers, setIsUsers] = useState(false);
  console.log(myUser)
  useEffect(() => {
    getFullName();
  }, []);

  const getFullName = async () => {
    const full_Name = sessionStorage.full_name;
    const token = sessionStorage.token;
    const url = `http://localhost:8080/users/?full_Name=${full_Name}`;
    const resp = await fetch(url, {
      headers: { 'x-access-token': token },
    });
    if (!resp.ok) { // אם יש שגיאה מהשרת
      if (resp.status === 401 || resp.status === 500) {
        sessionStorage.clear();
        window.location.href = '/';
        return;
      }
      throw new Error(`HTTP error! Status: ${resp.status}`);
    }
    const data = await resp.json();


    setMyUser({ _id: data[0]._id, full_name: data[0].full_Name, image: data[0].image });
  };

  // המרת התמונה שהמשתמש מעלה ל-Data URL
  const handleImageUpload = (event) => {

    const file = event.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("myFile", file);

    console.log("Uploading file:", file.name);

    const url = `http://localhost:8080/users/uploadImage/${myUser._id}`;

    fetch(url, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Upload response:", data);
        if (data.image) {
          //update the image in the state
          setMyUser(prevUser => ({ ...prevUser, image: `${data.image}?t=${new Date().getTime()}` }));
        }

      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
      setIsEdit(false);



  };



  const onClickGroups = () => {
    setIsUsers(false);
    setIsGroups(true);
    console.log('Groups')
  }
  const onClickUsers = () => {
    setIsGroups(false);
    setIsUsers(true);
    console.log('Users')
  }
  return (
    <div className='home-page'>
      <h1 className='welcome'>Welcome {myUser.full_name}</h1>
     
      <img style={{ width: "100px", height: "100px" }} src={myUser.image ? myUser.image : 'default-image-path'} alt='user image' />
 {(isEdit) &&
        <div >
          <input type='file' accept=".jpg, .png, " onChange={handleImageUpload} />

        </div>
      }
     <button className="edit-btn" onClick={() => setIsEdit(!isEdit)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
          <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zM21 6.41l-3.75-3.75-2.83 2.83 3.75 3.75L21 6.41z" />
        </svg>
       </button>
      {(isGroups) &&
        <div>
          <Groups onClick={() => setIsGroups(false)} myUser={myUser._id}></Groups>
        </div>}

      {(isUsers) &&
        <div>
          <Usrs onClick={() => setIsUsers(false)} myUser={myUser._id}></Usrs>
        </div>}
      {!isGroups && <button style={{ marginBottom: "10px" }} onClick={onClickGroups}>Groups</button>}
      {!isUsers && <button style={{ marginBottom: "10px" }} onClick={onClickUsers}>Users</button>}
    </div>
  )
}

export default HomePage