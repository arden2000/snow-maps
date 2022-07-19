import React, { useState } from 'react';
import './App.css';
import '@aws-amplify/ui-react/styles.css';
import { Amplify, Auth } from 'aws-amplify';
import Home from './components/Home.jsx';
import SignIn from './components/SignIn.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import awsconfig from './aws-exports';
import 'mapbox-gl/dist/mapbox-gl.css';
import Main from './components/Main.jsx'

Amplify.configure(awsconfig);

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/signin"
            element={<SignIn />} />
          <Route
            exact
            path="/"
            element={<Home />} />
          <Route
            exact
            path="/main"
            element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;