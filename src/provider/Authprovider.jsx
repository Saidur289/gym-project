import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext(null)
// eslint-disable-next-line react/prop-types
const Authprovider = ({children}) => {
    const [users, setUsers] = useState(null)
    const [loading, setLoading] = useState(true)
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInUser = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)
    }

   
    useEffect(() => {
   const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
         if(currentUser){
            setUsers(currentUser)
            setLoading(false)
         }
         else{
            setUsers(null)
            setLoading(false)
         }
        })
        return () => {
            unsubscribe()
        }
    }, [])
    const authInfo = {
        createUser,
        signInUser,
        users,
        signOutUser,
        loading,
        setUsers
        
    }
    return (
       <AuthContext.Provider value={authInfo}>
        {children}
       </AuthContext.Provider>
    );
};

export default Authprovider;