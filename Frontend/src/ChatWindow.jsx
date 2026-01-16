import "./ChatWindow.css"
import Chats from "./Chats.jsx"
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import { RingLoader } from "react-spinners";

const API_URI = import.meta.env.VITE_API_URI || "http://localhost:8080/api";

function ChatWindow() {
    const {prompt, setPrompt, reply, setReply, curThreadId, setPrevChats, setNewChat} = useContext(MyContext);
    const [loading, setLoading] = useState(false);
    const [ isOpen, setIsOpen ] = useState(false);

    const getReply = async() => {
        setLoading(true);
        setNewChat(false);
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                message: prompt,
                threadId: curThreadId
            })
        }

        try {
            const response = await fetch(`${API_URI}/chat`, options);
            const res = await response.json();
            setReply(res.reply);
        } catch(err) {
            console.log(err);
        }
        setLoading(false);
    }

    // Append new chat to Prev Chats
    useEffect(() => {
        if(prompt && reply) {
            setPrevChats(prevChats => (
                [...prevChats, {
                    role: "user",
                    content: prompt
                }, {
                    role: "assistant",
                    content: reply
                }]
            ))
        }
        setPrompt("");
    }, [reply]);

    const handleUserIcon = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="chatWindow">
            <div className="navbar">
                <span>GPT Ver: 4-o-mini
                    {/* <i className="fa-solid fa-angle-down"></i> */}
                    </span>
                <div className="userIconDiv" onClick={handleUserIcon}>
                    <span className="userIcon"><i className="fa-solid fa-user"></i></span>
                </div>
            </div>
            {
                isOpen && 
                <div className="dropDown">
                    <div className="dropDownItem"><i class="fa-solid fa-address-card"></i> Profile</div>
                    <div className="dropDownItem"><i class="fa-solid fa-cloud-arrow-up"></i> Upgrade Plan</div>
                    <div className="dropDownItem"><i class="fa-solid fa-gear"></i> Settings</div>
                    <div className="dropDownItem"><i class="fa-solid fa-right-from-bracket"></i> Logout</div>
                </div>
            }
            <Chats></Chats>
            <RingLoader color="#b4b4b4" size="50px" loading={loading}></RingLoader>
            <div className="chatInput">
                <div className="userInput">
                    <input type="text" placeholder="Ask anything..." value={prompt} onChange={(e) => setPrompt(e.target.value)}/>
                    <div id="submit" onClick={getReply}><i className="fa-solid fa-arrow-right"></i></div>
                </div>
                <p className="info">
                    BuddyGPT can make mistakes. Check important info. See Cookie Preferences.
                </p>
            </div>
        </div>
    )
}

export default ChatWindow;