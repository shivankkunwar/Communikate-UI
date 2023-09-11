
import ChatApp from './components/ChatApp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Friends from './components/friends';
import Navbar from './components/Navbar';
function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path='/chat' element={<ChatApp/>}/>
          <Route path='/friends' element={<Friends/>}/>
          
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
