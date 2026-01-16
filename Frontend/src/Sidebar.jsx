import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext";
import {v1 as uuidv1} from "uuid";

const API_URI = import.meta.env.VITE_API_URI;

function Sidebar() {
    const { allThreads, setAllThreads, setNewChat, setPrompt, setReply, curThreadId, setCurThreadId, setPrevChats } = useContext(MyContext);

    const getAllThreads = async () => {
        try {
            const response = await fetch(`${API_URI}/thread`);
            const res = await response.json();
            // We need threadId and Title 
            const filteredThread = res.map(thread => ({threadId: thread.threadId, title: thread.title}));
            // console.log(filteredThread);
            setAllThreads(filteredThread);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllThreads()
    }, [curThreadId])

    // Trigger this func on click of the New Chat button
    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurThreadId(uuidv1());
        setPrevChats([]);
    }

    // 
    const changeThread = async (newThreadId) => {
        setCurThreadId(newThreadId);

        try {
            const response = await fetch(`${API_URI}/thread/${newThreadId}`);
            const res = await response.json();
            setPrevChats(res);
            setNewChat(false);
            setReply(null);
        } catch (err) {
            console.log(err);
        }

    }

    // Delete one of the threads.
    const deleteThread = async (threadId) => {
        try {
            const response = await fetch(`${API_URI}/thread/${threadId}`, {method: "DELETE"});
            const res = await response.json();
            console.log(res);

            //Updated thread after the deletion, re-render
            setAllThreads(prev => prev.filter(thread => thread.threadId != threadId));
            // If we delete the current thread
            if (threadId === curThreadId){
                createNewChat();
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <section className="sidebar">
            <div>
                <button className="logobtn">
                    <img src="/buddylogo.png" alt="buddy logo" className="logo"/>
                    <p className="appname">BuddyGPT</p>
                </button>
                
                <button className="newchat-btn" onClick={createNewChat}>
                    <span><i className="fa-solid fa-pen-to-square"></i></span>
                    <p>New Chat</p>
                </button>
                
                <ul className="history">
                    {
                        allThreads?.map((thread, idx) => (
                            <li key={idx} 
                                onClick={(e) => changeThread(thread.threadId)}
                                className={thread.threadId === curThreadId ? "highlightedThread" : " "}>
                                
                                {thread.title}
                                <i class="fa-regular fa-trash-can" 
                                    onClick={(e) => {
                                        e.stopPropagation(); //To Stop Event Bubbling(basically, this click should not effect the parent list item to trigger)
                                        deleteThread(thread.threadId);
                                    }}
                                >
                                </i>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="sign">
                <p>By Shishir &#10024;</p>
            </div>
        </section> 
    )
}

export default Sidebar;