import React from 'react';
import Login from './component/Login';
import './App.css';
import { Provider } from 'react-redux';
import store from './app/store';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashBoardPage from './pages/DashBoardPage';
const PrivateRoute = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const isAuthenticated = localStorage.getItem('token')
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

function App() {
  return (   
    <Provider store={store} >
      <Router>  
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={
            <>
            <PrivateRoute>
              <DashBoardPage />
            </PrivateRoute>
            </>
            } 
            />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
