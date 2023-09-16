
import ChatApp from './components/ChatApp';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Friends from './components/friends';
import Navbar from './components/Navbar';
import { AuthProvider } from './components/AuthContext';
function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
