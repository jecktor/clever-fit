import {Routes, Route } from 'react-router-dom';
import  Home  from './Pages/home/Home';
import { Login } from './components/Login';
import { Register } from './components/Register';
import {AuthProvider} from './context/authContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import  RentaLocker from "./Pages/RentaLocker";
import {UserRegister}  from "./Pages/UserRegister";
import Show from './components/Show';
import  Edit from './components/Edit';
import Create from './components/Create';
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import "./style/dark.scss";
//Importar los cosos del usuario
import { productInputs, userInputs } from "./formSource"; 
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
export default function App() {
  const { darkMode } = useContext(DarkModeContext);
  return (
 
   <AuthProvider> 
   <div className={darkMode ? "app dark" : "app"}>
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
      <Route path='/show' element={<ProtectedRoute><Show/></ProtectedRoute>}/>
      <Route path="users">
              <Route index element={<ProtectedRoute><List /></ProtectedRoute>} />
              <Route path=":userId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute><New inputs={userInputs} title="Agregar nuevo usuario" /></ProtectedRoute>}
              />
      </Route>
      <Route path="casilleros">
              <Route
                index
                element={
                    <List /> 
                }
              />
              <Route
                path=":productId"
                element={
                    <Single />
                }
              />
              <Route
                path="new"
                element={
                    <New inputs={productInputs} title="Add New Product" />
                }
              />
            </Route>
      <Route path='/create' element={<ProtectedRoute><Create/></ProtectedRoute>}/>
      <Route path='/editar/:id' element={<ProtectedRoute><Edit/></ProtectedRoute>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/registroAdmin' element={<Register/>}/>
    </Routes>
    </div>
   </AuthProvider>
   
  );
}
