// App.js or your main component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/signUp';
import React from 'react';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;