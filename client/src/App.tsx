import Login from './components/auth/Login';
import { Routes, Route } from "react-router-dom";
import Register from './components/auth/Register';
import DefenceUser from './components/defenceUser/DefenceUser';
//import Chat from './components/chat/Chat';
import './App.css'

function App() {

  return (
    <>
     {/* <Chat /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/users" element={<DefenceUser />} />
      </Routes>
    </>
  )
}

export default App
