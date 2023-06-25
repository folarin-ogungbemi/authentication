import { 
  BrowserRouter as Router,
  Routes,
  Route
 } from 'react-router-dom';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import Header from './components/Header';
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'

document.title = "authentication";

const App = () => {
  return(
      <Router>
        <AuthProvider>
        <div className='App'>
          <Header/>
          <Routes>
            <Route exact path="/" element={<PrivateRoute/>}>
              <Route exact path='/' element={<HomePage/>} />
            </Route>
            <Route exact path="/login" element={<LoginPage/>}/>
          </Routes>
        </div>
        </AuthProvider>
    </Router>
  )}

export default App