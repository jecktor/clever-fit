import {Routes, Route } from 'react-router-dom';
import  {Home}  from './components/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import {AuthProvider} from './context/authContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import  RentaLocker from "./Pages/RentaLocker";
import {UserRegister}  from "./Pages/UserRegister";
import Sidebar  from "./components/Sidebar";
import Navbar  from "./components/Navbar";
import Show from './components/Show';
import  Edit from './components/Edit';
import Create from './components/Create';
// import { Navbar, Footer, Sidebar} from './components/Navbar';
export default function App() {
  return (
   <AuthProvider>
    <Routes>
      <Route
       path='/' 
       element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
      } 
       />
      <Route path='/userRegister' element={<ProtectedRoute><UserRegister/></ProtectedRoute>}/>
      <Route path='/rentaLocker' element={<ProtectedRoute><RentaLocker/></ProtectedRoute>}/>
      <Route path='/sidebar' element={<ProtectedRoute><Sidebar/></ProtectedRoute>}/>
      <Route path='/show' element={<ProtectedRoute><Show/></ProtectedRoute>}/>
      <Route path='/create' element={<ProtectedRoute><Create/></ProtectedRoute>}/>
      <Route path='/editar/:id' element={<ProtectedRoute><Edit/></ProtectedRoute>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/registroAdmin' element={<Register/>}/>
    </Routes>
   </AuthProvider>
   
  );
}
