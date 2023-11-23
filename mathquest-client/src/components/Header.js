import React, { useEffect } from "react";
import LOGO from "../images/logo-no-background.png";
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
    <div className="fixed w-screen px-8 bg-gradient-to-b from-black py-2 z-50 flex justify-between">
      <img className="w-20 brightness-150  sm:mx-5 sm:my-10 sm:h-16 sm:w-16" src={LOGO} alt="logo" />

      <div className="flex">
       
       {user &&  <button className="font-bold text-white mx-1 cursor-pointer h-10 mx-2 p-6">
          Available Courses
        </button>}
      
        {user && (
          <div className="flex p-4">
            <img className="w-10 h-10" src={user?.photoURL} />
            <button
              onClick={signOutHandler}
              className="font-bold text-white mx-1 cursor-pointer h-10 mx-2"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
