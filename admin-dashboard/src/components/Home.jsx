import { useAuth } from '../context/authContext';
import React, { useEffect } from 'react';
import { FiSettings } from 'react-icons/fi';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
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
  const activeMenu = true;
  return (
    <><div>
      <div className='flex relative dark:bg-main-dark-bg'>
        <div className='fixed right-4 bottom-4' style={{ zIndex: '1000' }}>
            <button type='button' className='text-3x1 p-3 hover:drop-shadow-x1 hover:bg-light-gray text-white' style={{ background: "blue", borderRadius: '50%' }}>
              <FiSettings />
            </button>
        </div>
        {activeMenu ? (
          <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-slate-400'>
            <Sidebar />
          </div>
        ) : (
          <div className='w-0 dark:bg-secondary-dark-bg'>
            <Sidebar />
          </div>
        )}
        <div className={`dark: bg-main-bg bg-main-bg min-h-screen w-full ${activeMenu ? 'md:ml-72' : 'flex-2'}`}>
          <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
            <Navbar />
          </div>
        </div>
      </div>
    </div>
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
