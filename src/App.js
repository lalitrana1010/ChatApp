import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import ChatPage from './containers/chatPage';


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" exact element={<ChatPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
