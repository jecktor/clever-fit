import React, {useState, useEffect}from 'react';
import { Link } from "react-router-dom";
import { collection, getDocs, getDoc, deleteDoc, doc} from "firebase/firestore";
import {db} from "../firebase";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Card, Typography } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { dbRealtime } from '../firebase';
import { ref, onValue } from 'firebase/database';
import { auth } from "../firebase";
const MySwal = withReactContent(Swal);


function Show() {
    // 1 - Configuracion de los hooks.
        //a los usuarios les pondre registros y a la funcion setRegistro
    const [registros, setRegistro] = useState([]);
    // 2 -Referenciamos a la DB firestore
    const usuariosCollection = collection(db, "usuarios");
    // 3 -Funcion para mostrar todos los docs.
    const getRegistros = async () =>{
        const respuesta = await getDocs(usuariosCollection);
        // console.log(respuesta.docs);
        setRegistro(
            respuesta.docs.map( (doc)=> ( {...doc.data(), id:doc.id}))
        )
        console.log(registros);
    }
    // 4 -Funcion para eliminar
    const eliminarRegistro = async (id)=>{
        try {
        const registrosdoc = doc(db,"usuarios",id);
        await deleteDoc(registrosdoc);
        } catch (error) {
         console.error(error);
        }
    }
    // 5 -Configuracion de sweet alert
    const confirmDelete = (id) =>{
        Swal.fire({
            title: "Está seguro de querer eliminar este usuario?",
            text: "No podrá deshacer este cambio!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminar!!"
          }).then((result) => {
            if (result.isConfirmed) {
                eliminarRegistro(id);
                Swal.fire({
                    title: "Eliminado!",
                    text: "El usuario se eliminó con éxito",
                    icon: "success"
                });
            }
          });
    }
    // 6 -usar useeffect
    useEffect( () => {
        getRegistros()
    }, [] );
    useEffect(() => {
        console.log(registros);
    }, [registros]);
    //  7 -se devuelve vista del componente
    const dataRef = ref(dbRealtime, 'users/EEFH7xsqqtf4Ui4fpFe32zB5vjx1/');

// Observar cambios en los datos en tiempo real
onValue(dataRef, (snapshot) => {
  const data = snapshot.val();
  console.log('Datos leídos:', data);
}, {
  onlyOnce: true // Esto asegura que solo obtendrás los datos una vez
});
    return (
        <div>
            <Link to="/create" className="float-right text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Agregar Usuario</Link>

            <Card className="h-full w-full overflow-scroll">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                    Nombre
                                </Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                    Suscripcion
                                </Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                    Correo
                                </Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                    Membresía
                                </Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                    Locker
                                </Typography>
                            </th>
                            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                                <Typography variant="small" color="blue-gray" className="font-normal leading-none opacity-70">
                                    Acciones
                                </Typography>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {registros.map(({ Nombre, Suscripcion, Correo, tipoSuscripcion, locker, id }) => (
                            <tr key={id}>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {Nombre}
                                    </Typography>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {Suscripcion}
                                    </Typography>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {Correo}
                                    </Typography>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {tipoSuscripcion}
                                    </Typography>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Typography variant="small" color="blue-gray" className="font-normal">
                                        {locker}
                                    </Typography>
                                </td>
                                <td className="p-4 border-b border-blue-gray-50">
                                    <Link to={`/editar/${id}`} className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700'>
                                        <FontAwesomeIcon icon={faUserPen} />
                                    </Link>
                                    <button className='text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900' onClick={() => confirmDelete(id)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}


export default Show