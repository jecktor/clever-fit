import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { createContext, useContext, useEffect, useState } from 'react';

const authContext = createContext();

export const useAuth = () => {
   const contexto = useContext(authContext)
   if (!contexto) throw new Error('No hay proveedor de autenticación');
   return contexto;
}

export function AuthProvider({children}){
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const signup = (email, password) => {
     return createUserWithEmailAndPassword(auth, email, password); // Devolver la promesa
    }
    const login = async(email, password) => {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password, user); // Devolver la promesa
        console.log(userCredentials);
    };

    const logout = () => signOut(auth);
    const loginWithGoogle = () => {
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup(auth, googleProvider)
    }
    const resetPassword = (email) => {
        sendPasswordResetEmail(auth,email )
    }
    useEffect(()=> {
        const unSubscribe= onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);  
        })

        return ()=> unSubscribe(); 
    },[])

    return <authContext.Provider value={{ signup, login, user, logout, loading, loginWithGoogle, resetPassword }}>{children}</authContext.Provider>;
}
