// // Esto es para el crud del UserRegister
// import React, {useState} from 'react'
// import { Navigate, useNavigate } from 'react-router-dom';
// import { collection, addDoc } from 'firebase/firestore';
// import {createUserWithEmailAndPassword} from 'firebase/auth'
// import {db} from '../firebase';
// import { getFunctions, httpsCallable } from 'firebase/functions';
// import { app } from '../firebase';

// const generatePassword = (length) => {
//   const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//   let password = '';
//   for (let i = 0; i < length; i++) {
//     const randomIndex = Math.floor(Math.random() * charset.length);
//     password += charset[randomIndex];
//   }
//   return password;
// };

// const Create = () => {
//   const [Nombre, setNombre] = useState('');
//   const [Suscripcion, setSuscripcion] = useState(false);
//   const [Correo, setCorreo] = useState('');
//   const [tipoSuscripcion, setTipoSuscripcion] = useState('');
//   const [Locker, setLocker] = useState(true);
//   const [password, setPassword] = useState('');
//   const [passwordLength, setPasswordLength] = useState(8);
//   const navigate = useNavigate();
//   const usuariosCollection = collection(db,"usuarios");
//   // const functions = getFunctions(app);
//   // const createUser = httpsCallable(functions, 'createUser');
  
//   const store = async (e) => {
//     e.preventDefault();
//     console.log("Jola")
  
//     try {
//       const userCredential = await createUserWithEmailAndPassword(Correo, password );
//       console.log('Usuario creado en Firebase Authentication:', userCredential);
//       await addDoc( usuariosCollection, {Nombre: Nombre, Suscripcion: Suscripcion, Correo: Correo, tipoSuscripcion: tipoSuscripcion,
//       Locker: Locker, Contraseña: password})
//       navigate('/show')
//     } catch (error) {
//       console.error(error);
//     }
//   }
  

//   const handleGeneratePassword = () => {
//     const newPassword = generatePassword(passwordLength);
//     setPassword(newPassword);
//     console.log(newPassword);
//   };
  
  
//   return (
//     <form onSubmit={store} className="max-w-sm mx-auto">
//     <div className="mb-5">
//       <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
//       <input value={Nombre} onChange={(e => setNombre(e.target.value))} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name" type='text'/>
//     </div>
//     <div className="mb-5">
//   <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">¿Está suscrito?</label>
//   <select 
//     value={Suscripcion} 
//     onChange={(e) => setSuscripcion(e.target.value === "true")} 
//     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
//   >
//     <option value="true">Sí</option>
//     <option value="false">No</option>
//   </select>
// </div>
//     <div className="mb-5">
//     <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo Electronico</label>
//     <input value={Correo} onChange={(e => setCorreo(e.target.value))} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
//   </div>
//   <div className="mb-5">
//         <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
//         <div className="flex">
//           <input
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
//             placeholder="Contraseña"
//             type="text"
//           />
//           <button
//             type="button"
//             onClick={handleGeneratePassword}
//             className="bg-blue-500 text-white px-4 rounded-r-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500"
//           >
//             Generar
//           </button>
//         </div>
//       </div>
//   <div className="mb-5">
//       <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de Suscripción</label>
//       <input value={tipoSuscripcion} onChange={(e => setTipoSuscripcion(e.target.value))} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name" type='text'/>
//     </div>
//     <div className="mb-5">
//   <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rentó Locker?</label>
//   <select 
//     value={Locker} 
//     onChange={(e) => setLocker(e.target.value === "true")} 
//     className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
//   >
//     <option value="true">Sí</option>
//     <option value="false">No</option>
//   </select>
// </div>
//     <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Registrar Usuario</button>
//   </form>
//   )
// }

// export default Create

// Esto es para el crud del UserRegister
import React, {useState} from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import {db} from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
const generatePassword = (length) => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

const Create = () => {
  const [Nombre, setNombre] = useState('');
  const [Suscripcion, setSuscripcion] = useState(false);
  const [Correo, setCorreo] = useState('');
  const [tipoSuscripcion, setTipoSuscripcion] = useState('');
  const [Locker, setLocker] = useState(true);
  const [password, setPassword] = useState('');
  const [passwordLength, setPasswordLength] = useState(8);
  const navigate = useNavigate();
  const usuariosCollection = collection(db,"usuarios")
  const store = async (e) => {
    e.preventDefault();
    const { user } = await createUserWithEmailAndPassword(auth, Correo, password);
    console.log('Usuario creado en Firebase Authentication:', user);
    await addDoc( usuariosCollection, {Nombre: Nombre, Suscripcion: Suscripcion, Correo: Correo, tipoSuscripcion: tipoSuscripcion,
    Locker: Locker, Contraseña: password})
    navigate('/show')
  }
  const handleGeneratePassword = () => {
    const newPassword = generatePassword(passwordLength);
    setPassword(newPassword);
    console.log(newPassword);
  };
  console.log()
  
  
  return (
    <form onSubmit={store} className="max-w-sm mx-auto">
    <div className="mb-5">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
      <input value={Nombre} onChange={(e => setNombre(e.target.value))} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name" type='text'/>
    </div>
    <div className="mb-5">
  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">¿Está suscrito?</label>
  <select 
    value={Suscripcion} 
    onChange={(e) => setSuscripcion(e.target.value === "true")} 
    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
  >
    <option value="true">Sí</option>
    <option value="false">No</option>
  </select>
</div>
    <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo Electronico</label>
    <input value={Correo} onChange={(e => setCorreo(e.target.value))} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required />
  </div>
  <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
        <div className="flex">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="Contraseña"
            type="text"
          />
          <button
            type="button"
            onClick={handleGeneratePassword}
            className="bg-blue-500 text-white px-4 rounded-r-lg focus:ring-blue-500 focus:outline-none focus:border-blue-500"
          >
            Generar
          </button>
        </div>
      </div>
  <div className="mb-5">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tipo de Suscripción</label>
      <input value={tipoSuscripcion} onChange={(e => setTipoSuscripcion(e.target.value))} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name" type='text'/>
    </div>
    <div className="mb-5">
  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Rentó Locker?</label>
  <select 
    value={Locker} 
    onChange={(e) => setLocker(e.target.value === "true")} 
    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
  >
    <option value="true">Sí</option>
    <option value="false">No</option>
  </select>
</div>
    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Registrar Usuario</button>
  </form>
  )
}

export default Create