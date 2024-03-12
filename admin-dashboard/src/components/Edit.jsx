import React, {useEffect, useState}from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDoc, updateDoc, doc } from 'firebase/firestore';
import {db} from '../firebase'

const Edit = () => {
  const [Nombre, setNombre] = useState('');
  const [Suscripcion, setSuscripcion] = useState(false);
  const [Correo, setCorreo] = useState('');
  const [tipoSuscripcion, setTipoSuscripcion] = useState('');
  const [Locker, setLocker] = useState(true);
  const navigate = useNavigate();
  // const usuariosCollection = collection(db,"usuarios")
  const {id} = useParams();
  const update = async (e) => {
    e.preventDefault();
    const registros = doc(db, "usuarios", id);
    const data = {Nombre: Nombre, Suscripcion: Suscripcion, Correo: Correo, tipoSuscripcion: tipoSuscripcion,
      Locker: Locker}
      await updateDoc(registros, data);
      navigate('/show')
  }
  const getRegisterById = async (id) => {
    const register = await getDoc( doc(db, "usuarios", id))
    if (register.exists()) {
      // console.log(register.data())
      setNombre(register.data().Nombre); 
      setSuscripcion(register.data().Suscripcion); 
      setCorreo(register.data().Correo); 
      setTipoSuscripcion(register.data().tipoSuscripcion); 
      setLocker(register.data().Locker); 
    }else{
      console.log("No existe")
    }

  }
  useEffect( () => {
    getRegisterById(id)
}, [] );
return (
  <form onSubmit={update} className="max-w-sm mx-auto">
  <div className="mb-5">
    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nuevo Nombre</label>
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

export default Edit