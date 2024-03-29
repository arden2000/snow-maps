import React, { useState } from 'react';
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
            path="/home"
            element={<Home />} />
          <Route
            exact
            path="/"
            element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;