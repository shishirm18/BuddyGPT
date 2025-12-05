import "./Sidebar.css"

function Sidebar() {
    return (
        <section className="sidebar">
            <button className="logobtn">
                <img src="src/assets/buddylogo.png" alt="buddy logo" className="logo"/>
                <p className="appname">BuddyGPT</p>
            </button>
            
            <button className="newchat-btn">
                <span><i className="fa-solid fa-pen-to-square"></i></span>
                <p>New Chat</p>
            </button>
            
            <ul className="history">
                <li>thread 1</li>
                <li>thread 2</li>
                <li>thread 3</li>
            </ul>

            <div className="sign">
                <p>By Shishir</p>
            </div>
        </section> 
    )
}

export default Sidebar;