import React, { useEffect } from "react";
import LOGO from "../images/logo-no-background.png"
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((store) => store.user);
    const signOutHandler = () => {
        signOut(auth)
          .then(() => {})
          .catch((error) => {});
      };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            console.log(user);
            const { uid, email, displayName, photoURL } = user;
            dispatch(
              addUser({
                uid: uid,
                email: email,
                displayName: displayName,
                photoURL: photoURL,
              })
            );
            navigate("/dashboard");
          } else {
            dispatch(removeUser());
            navigate("/");
          }
        });
        return ()=> unsubscribe();
      }, []);
  return (
    <div className="absolute w-screen px-8 bg-gradient-to-b from-black py-2 z-50 flex justify-between">
      <img className="w-28 brightness-150 sm:mx-5 sm:my-10 sm:h-16 sm:w-16" src={LOGO} alt="logo" />
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
  );
};

export default Header;
