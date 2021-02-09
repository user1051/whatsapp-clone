import React from 'react'
import './SidebarChat.css'
import { Avatar } from "@material-ui/core"
import { useState, useEffect } from 'react'
import db from './firebase'
import { Link } from 'react-router-dom'

function SidebarChat( {id, name, addNewChat} ) {
    const [seed, setSeed] = useState("")
    const [messages, setMessages] = useState("")

    // pulling last message from db
    useEffect(() => {
        if (id){
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
                setMessages(snapshot.docs.map((doc) => doc.data()))
            })
        } 
    }, [])
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
      }, []);
 
      const createChat = () => {
          const roomName = prompt("Please enter name for chat");
          if(roomName){
              // do some clever db 
              db.collection('rooms').add({
                  name: roomName,
              })
          }
      };

    return !addNewChat ?( //if its not addNewChat then show normal stuff otherwise
       //go the room with id=👇
       <Link to={`/rooms/${id}`}>   
             <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="sidebarChat__info">
                <h2>{name}</h2>
                <p>{messages[0]?.message}</p> 
                {/* last message */}
            </div>
        </div>
        </Link>
       
    ): (
        //otherwise condition
        <div onClick={createChat} className="sidebarChat"> 
            <h2>Add new Chat</h2>
        </div>
    );
}

export default SidebarChat