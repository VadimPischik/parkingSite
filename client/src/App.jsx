import Main from './Main.jsx';
import Autorize from './Autorize.jsx';
import Header from './Header.jsx';
import React from 'react';
// import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import 'react-router';
import 'history';

export default function App() {
  return (
    <div className="app">
      <Header />
      <Router>
        <Routes>
          <Route path="/" exact element={<Main />} />
          <Route path="/autorize" exact element={<Autorize />} />
        </Routes>
      </Router>
    </div>
  );
}