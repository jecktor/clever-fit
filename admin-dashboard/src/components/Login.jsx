import { useState, useEffect} from 'react';
import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from './Alert';

export function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const { login, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({target: {name, value}}) => {
    setUser({...user, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const loggedinuser = await login(user.email, user.password);
      if (!user.email.includes('@adminclever.com')) {
        setError('Acceso denegado. Debes ser administrador para iniciar sesión.');
      } else {
        navigate('/');
      }
    } catch (error) {
      setError(error.message); // Establecer el estado error con el mensaje de error
    }
  };
    const handleGoogleSignin = async () => {
        try {
          await loginWithGoogle();
          navigate('/');
        } catch (error) {
          setError(error.message);
        }
    };
    const handleResetPassword = async() => {
      if(!user.email) return setError("Por favor, inserte su correo");
      try {
         await resetPassword(user.email)
         setError("Te hemos enviado un email para restablecer la contraseña");
      } catch (error) {
        setError(error.message);
      }
    }
    

    return (
      <div className='bg-slate-300 text-black h-screen flex'>
      <div className="w-full max-w-xs m-auto">
        {error && <Alert message={error} />}
  
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="suemail@gmail.com"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="*************"
            />
          </div>
  
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Iniciar
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#!"
              onClick={handleResetPassword}
            >
              ¿Olvidó su contraseña?
            </a>
          </div>
        </form>
        <button
          onClick={handleGoogleSignin}
          className="bg-slate-50 hover:bg-slate-200 text-black  shadow rounded border-2 border-gray-300 py-2 px-4 w-full"
        >
          Inicie sesión con google.
        </button>
        <p className="my-4 text-sm flex justify-between px-3 text-gray-900 ">
          No tiene una cuenta?
          <Link to="/registroAdmin" className="text-blue-700 hover:text-blue-900">
            Regístrese.
          </Link>
        </p>
      </div>
      </div>
    );
  }