import "./ChatWindow.css"
import Chats from "./Chats.jsx"

function ChatWindow() {
    return (
        <div className="chatWindow">
            <div className="navbar">
                <span>GPT Ver<i class="fa-solid fa-angle-down"></i></span>
                <div className="userIconDiv">
                    <span className="userIcon"><i class="fa-solid fa-user"></i></span>
                </div>
            </div>
            <Chats></Chats>
            <div className="chatInput">
                <div className="userInput">
                    <input type="text" placeholder="Ask anything"/>
                    <div id="submit"><i class="fa-solid fa-arrow-right"></i></div>
                </div>
                <p className="info">
                    BuddyGPT can make mistakes. Check important info. See Cookie Preferences.
                </p>
            </div>
        </div>
    )
}

export default ChatWindow;