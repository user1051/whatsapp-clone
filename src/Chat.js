import React from 'react'
import "./Chat.css"
import { Avatar, IconButton } from "@material-ui/core"
import { useState, useEffect} from 'react'
import { AttachFile, MoreVert, SearchOutlined } from "@material-ui/icons"
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import MicIcon from "@material-ui/icons/Mic" 
import { useParams } from 'react-router-dom'
import db from './firebase'
import { useStateValue } from './StateProvider'
import firebase from 'firebase'
  
function Chat() {
    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("")
    const { roomId } = useParams();    // grabing roomid by useParams hook
    const [ roomName, setRoomName ] = useState("")
    const [messages, setMessages] = useState([])
    const [{user}, dispatch] =useStateValue()

    useEffect(() => {
       if(roomId) {
           db.collection('rooms').doc(roomId).onSnapshot((snapshot) => 
               setRoomName(snapshot.data().name))
           
            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot((snapshot) => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
       }
    }, [roomId])  //function to show messages every time room id changes 
    
    useEffect(() => {
         setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]) // also change it when roomId changes

    const sendMessage = (e) => {
        e.preventDefault();
        console.log(`You typed>> ${input}`)
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("");  // clear the input
    }
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar  src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last message{" "}{new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map(message => (
                     <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}> 
                                                {/* only add this class if some condition is true */}
                <span className="chat__name">{message.name}</span>
                   {message.message}
                    <span className="chat__timeStamp">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                </p>
                
                ))}
               
            </div>

            <div className="chat__footer">
                <InsertEmoticonIcon/>
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} //every time we type it update and stores in the db
                     type="text" 
                     placeholder="Type a message"/>
                    <button type="submit" onClick={sendMessage}></button>
                </form>
                <MicIcon/>
            </div>
        </div>
    )
}

export default Chat
