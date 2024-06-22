
import './App.css';
import Home from './pages/Home';
import Chat from './pages/Chat';
import GroupChat from './pages/GroupChat';
import Temp from './pages/Temp';
import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/chat" element={<Temp />} />
      <Route path="/chat/:modelName" element={<Chat />} />
      <Route path="/group-chat/:modelNames" element={<GroupChat />} /> {/* Add the GroupChat route */}
    </Routes>
    
    </BrowserRouter>
    </>
  );
}

export default App;
