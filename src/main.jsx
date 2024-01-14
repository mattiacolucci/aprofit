import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './login/Login';
import Home from './home/Home';
import Register from './register/Register';
import UserProfile from './userProfile/UserProfile';
import PrivateRoute from './PrivateRoute';
import EditPassword from './editPassword/EditPassword';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/' element={<PrivateRoute><Home/></PrivateRoute>}/>
      <Route path='/profile' element={<PrivateRoute><UserProfile/></PrivateRoute>}/>
      <Route path='/editPassword' element={<PrivateRoute><EditPassword/></PrivateRoute>}/>
      {/*<Route path="/userProfile" element={<PrivateRoute><UserProfile/></PrivateRoute>}/>*/}
    </Routes>
  </BrowserRouter>
);

