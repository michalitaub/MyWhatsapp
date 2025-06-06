import React, { useEffect, useState } from 'react'
import Utils from '../../Utils'


function Chat(props) {
    //props: myUser,if this chet has frind,if this group has group
    const [user, setUser] = useState({})
    const [group, setGroup] = useState({})
    const [users, setUsers] = useState([])
    const [chat, setChat] = useState([])
    const [messages, setMessages] = useState([])
    const [text, setText] = useState("");
    const [isEdit, setIsEdit] = useState(false);

    const formData = new FormData();
    console.log("chat", chat)

    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // Fetch users
        Utils.getUsers()
            .then(data => {
                setUsers(data);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);
    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8080'); // create connect to the server


        ws.onopen = () => {
            console.log(" WebSocket Connected");
            setSocket(ws); // save the connection to the state
        };

        ws.onmessage = (event) => {
            console.log(` New message from server: ${event.data}`);
            const newMessage = JSON.parse(event.data); // convert to JSON
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };

        ws.onclose = () => {
            console.log(" WebSocket Disconnected");
        };

        return () => ws.close(); // to close the connection when the component unmounts
    }, []);
    useEffect(() => {
        if (props.frind) {
            Utils.getUserById(props.frind)
                .then(data => { setUser(data) })
                .catch(error => console.error('Error fetching user:', error));
            //request to get group chat with myuser and user
            Utils.getChat(props.myUser, props.frind)
                .then(data => {
                    setChat(data);

                })
                .catch(error => console.error('Error fetching chat:', error));
        }
        if (props.group) {
            Utils.getGroupById(props.group)
                .then(data => { setGroup(data) })
                .catch(error => console.error('Error fetching group:', error));
            //request to get group chat with myuser and user
            Utils.getChat(props.myUser, props.group)
                .then(data => {
                    setChat(data);

                })
                .catch(error => console.error('Error fetching chat:', error));
        }
    }, []);

    useEffect(() => {
        if (chat[0]) {
            Utils.getMessagesGroup(chat[0]._id)
                .then(data => { setMessages(data) })
                .catch(error => console.error('Error fetching messages:', error));
        }
        if (props.group) {
            Utils.getMessagesGroup(props.group)
                .then(data => { setMessages(data) })
                .catch(error => console.error('Error fetching messages:', error));
        }
        else {
            setMessages([]);
        }
    }, [chat]);
    //give the date and return if it is today return the time else return the date
    const date = (date) => {
        const today = new Date();
        const date1 = new Date(date);
        if (today.getDate() === date1.getDate() && today.getMonth() === date1.getMonth() && today.getFullYear() === date1.getFullYear()) {
            return date1.getHours() + ":" + date1.getMinutes()
        }
        return date1.getDate() + "/" + date1.getMonth() + "/" + date1.getFullYear()
    }

    const createChat = () => {
        Utils.addChatGroup({ name: "chat", members: [props.myUser, user._id] })
            .then(data => { setChat(data) })
            .catch(error => console.error('Error fetching chat:', error));
    }
    const addMessage = () => {
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            console.error(" WebSocket is not connected!");
            return;
        }
        const newMessage = {
            group: props.group || chat[0]._id,
            user: props.myUser,
            text: text,
            date: new Date()
        };

        if (socket) {
            socket.send(JSON.stringify(newMessage));
        }
        setText("");

    };
    // המרת התמונה שהמשתמש מעלה ל-Data URL
    const handleImageUpload = (event) => {

        const file = event.target.files[0];
        if (!file) return;
        formData.set("myFile", file);

    };
    const onClickEdit = () => {
 
        const updatedFormData = new FormData(); // יצירה מחדש כדי למנוע בעיות
        updatedFormData.append("name", group.name);
        updatedFormData.append("_id", group._id);
        
        // נוסיף את הקובץ ל-FormData רק אם יש תמונה
        if (formData.has("myFile")) {
            updatedFormData.append("myFile", formData.get("myFile"));
        }
    
        Utils.editGroup(updatedFormData)
            .then(data => { setGroup(data) })
            .catch(error => console.error('Error fetching group:', error));
        setIsEdit(false);
        window.location.reload();
    }
    return (
        <div className='chat-container'>
            {props.frind && <h1 className="chat-header">{user.full_Name} & you</h1>}

            {props.group && <div>
                {!isEdit && <h1 className="chat-header">{group.name}</h1>}
                {isEdit && <input type="text" value={group.name} onChange={(e) => setGroup({ ...group, name: e.target.value })} />}

                <img style={{ width: "100px", height: "100px" }} src={group.image ? group.image : 'default-image-path'} alt='user image' />
                {isEdit && <div> <input type="file" accept=".jpg, .png, " onChange={handleImageUpload} />
                    <button onClick={onClickEdit} >Edit</button>
                </div>}
                <button className="edit-btn" onClick={() => setIsEdit(!isEdit)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M3 17.25V21h3.75l11.06-11.06-3.75-3.75L3 17.25zM21 6.41l-3.75-3.75-2.83 2.83 3.75 3.75L21 6.41z" />
                    </svg>
                </button></div>}
            {!chat[0] && props.frind && <button onClick={createChat}>Create Chat</button>}

            <div className="chat-messages">
                {messages.map((mes, index) => (
                    <div key={mes._id || index}>
                        {mes.user != props.myUser ? (<div className='messages-frind'>
                            <div className='mini-text-messages'>
                                {users.find(user => user._id === mes.user)?.full_Name + " "}
                                {date(mes.date)}
                            </div>
                            <div className='massages-and-image'>
                                <div className='text-messages-frind'>{mes.text} </div>
                                <img src={users.find(user => user._id === mes.user)?.image} alt={"image of user"} />
                            </div>
                        </div>)
                            : (<div className='messages-me'>
                                <div className='mini-text-messages'>

                                    {date(mes.date)}
                                </div>

                                <div className='text-messages-me'>{mes.text} </div></div>
                            )}

                    </div>
                ))}
            </div>
            <div className='chat-input'>
                <input type="text" value={text} onChange={(e) => setText(e.target.value)}></input>
                <button onClick={addMessage}>enter</button>
            </div>

        </div>
    )
}

export default Chat