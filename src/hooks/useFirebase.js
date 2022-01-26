import {getAuth ,signOut, updateProfile,createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider,signInWithPopup,onAuthStateChanged} from "firebase/auth";
import { useEffect, useState } from "react";
// import { Redirect } from 'react-router-dom';
import initializeAuthentication from "../components/Firebase/firebase.init";

initializeAuthentication();
const useFirebase =()=>{
    const [user , setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    // user register
    const registerUser = (email, password, name, history) => {
        setIsLoading(true);
         createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setError('');
                const newUser = { email, displayName: name };
                setUser(newUser);
                // save user to database 
                // userSave(email, name,'POST');
                updateProfile(auth.currentUser, {
                    displayName: name,
                }).then(() => {

                }).catch((error) => {
                    
                });
                history.replace('/');
               
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(()=> setIsLoading(false));
        
    }

    // login user
    const loginUser = (email, password, location, history) => {
        setIsLoading(true)
         signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/'
                history.replace(destination);
                // const user = userCredential.user;
                setError('');

                
            })
            .catch((error) => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
        
        
    }
    const signInWithGoogle =()=>{
        // setIsLoading(true);
       return  signInWithPopup(auth,googleProvider )
        // .then(result =>{
        //    setUser(result.user)
        // })
        // .finally(() => setIsLoading(false));

    }
    const logOut = () => {
        setIsLoading(true)
        signOut(auth)
            .then(() => { })
            .finally(() => setIsLoading(false))
    }
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);

            } else {
                setUser({});
            }
            setIsLoading(false)
        });
        return () => unsubscribed;

    }, [auth])

return{
    user,
    setUser,
    isLoading,
    registerUser,
    signInWithGoogle,
    logOut,
    error,
    loginUser

}
}
export default useFirebase;