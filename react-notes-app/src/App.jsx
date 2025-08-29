import React from 'react'
import Navbar from './components/NavBar'
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './components/Home';
import AddNote from "./components/AddNote";
import FabButton from "./components/FabButton";
import NoteDetail from "./components/NoteDetail";
import EditNote from './components/EditNote';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import { useAuth } from './context/AuthContext'


const App = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={isAuthenticated ? <><Home /><FabButton /></> : <Navigate to="/login" />} />
        <Route path="/add-note" element={isAuthenticated ? <AddNote /> : <Navigate to="/login" />} />
        <Route path="/notes/:slug" element={isAuthenticated ? <NoteDetail /> : <Navigate to="/login" />} />
        <Route path="/edit/:slug" element={isAuthenticated ? <EditNote /> : <Navigate to="/login" />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  )
}

export default App