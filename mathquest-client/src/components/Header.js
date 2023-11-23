import React, { useEffect } from "react";
import LOGO from "../images/logo-black.png";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => {
    
    return store.user;
  });
  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
       
        navigate('/')
      })
      .catch((error) => {});
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        
      } else {
        dispatch(removeUser());
        
      }
    });
    return () => unsubscribe();
  }, []);
  return (
    <div className="absolute w-screen px-8 font-mono bg-gradient-to-b from-black py-2 z-50 flex justify-between">
      <img className="w-20 rounded-full brightness-150 sm:mx-5 sm:my-10 sm:h-16 sm:w-16" src={LOGO} alt="logo" />

      <div className="flex">
       {user &&  <button className="font-bold text-white no-underline hover:underline cursor-pointer h-10 p-6">
          Available Courses
        </button>}
      
        {user && (
          <div className="flex p-4">
            <button
              onClick={signOutHandler}
              className="font-bold text-white no-underline hover:underline cursor-pointer h-10">
              Sign Out
            </button>

            <img className="w-10 h-10 ml-8 rounded-3xl" src={user?.photoURL} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
