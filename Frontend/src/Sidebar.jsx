import "./Sidebar.css"
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext";

function Sidebar() {
    const { allThreads, setAllThreads } = useContext(MyContext);

    const getAllThreads = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/thread');
            const res = await response.json();
            // We need threadId and Title 
            const filteredThread = res.map(thread => ({threadId: thread.threadId, title: thread.title}));
            console.log(filteredThread);
            setAllThreads(filteredThread);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllThreads()
    }, [])

    return (
        <section className="sidebar">
            <div>
                <button className="logobtn">
                    <img src="src/assets/buddylogo.png" alt="buddy logo" className="logo"/>
                    <p className="appname">BuddyGPT</p>
                </button>
                
                <button className="newchat-btn">
                    <span><i className="fa-solid fa-pen-to-square"></i></span>
                    <p>New Chat</p>
                </button>
                
                <ul className="history">
                    {
                        allThreads?.map((thread, idx) => (
                            <li key={idx}>{thread.title}</li>
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