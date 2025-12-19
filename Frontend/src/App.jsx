import './App.css';
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { MyContext } from './MyContext.jsx';
import { useState } from 'react';
import {v1 as uuidv1} from 'uuid'

function App() {
  const [prompt, setPrompt] = useState(""); // prompt is basically the use input message.
  const [reply, setReply] = useState(null); // This is the reply from the openAI for the prompt.
  const [curThreadId, setCurThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]); // stores all the chats for that thread Id.
  const [newChat, setNewChat] = useState(true); // activates if we press the new chat button.
  const [allThreads, setAllThreads] = useState([]); // stores all the existing threads.

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    curThreadId, setCurThreadId,
    prevChats, setPrevChats,
    newChat, setNewChat,
    allThreads, setAllThreads
  }; // we'll be passing down the values from this object. Wrap the components with the Provider where we'll pass all the values

  return (
    <div className='app'>
      <MyContext.Provider value={providerValues}> 
        <Sidebar></Sidebar>
        <ChatWindow></ChatWindow>
      </MyContext.Provider>
    </div>
  )
}

export default App;
