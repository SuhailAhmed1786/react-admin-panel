import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard"
import PrivateRoute from "./PrivateRoute";
import Edit from './Edit';
import Profile from './Profile';
function Navigation(props) {
  return (
   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />    
        <Route path="/edit/:id" element={<Edit  />} />   
        <Route path="/profile" element={<Profile  />} />  
         <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
              
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  
  );
}

export default Navigation;
