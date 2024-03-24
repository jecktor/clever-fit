import { useAuth } from '../context/authContext';
import React, { useEffect } from 'react';
export  function Home() {
  const {user, logout, loading} = useAuth();
  console.log(user);
  const handleLogout = async() => {
    try {
       await logout()
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) {
    return
  }
  return (
    <>
    <div className="w-full max-w-xs m-auto text-black">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <p className="text-xl mb-4">Bienvenido! {user.displayName || user.email}</p>
          <button
            className="bg-slate-200 hover:bg-slate-300 rounded py-2 px-4 text-black"
            onClick={handleLogout}
          >
            Cerrar Sesión.
          </button>
        </div>
      </div></>
  );
}
