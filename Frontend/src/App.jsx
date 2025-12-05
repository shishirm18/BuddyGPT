import './App.css';
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { MyContext } from './MyContext.jsx';

function App() {
  const providerValues = {}; // we'll be passing down the values from this object. Wrap the components with the Provider where we'll pass all the values

  return (
    <div className='app'>
      <MyContext.Provider values = {providerValues}> 
        <Sidebar></Sidebar>
        <ChatWindow></ChatWindow>
      </MyContext.Provider>
    </div>
  )
}

export default App;
