// Importing necessary dependencies from React and Firebase
import React, { useEffect, useState } from "react";
import LOGO from "../images/logo-black.png";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";

// Functional component for the header
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userType, setUserType] = useState('student')
  const user = useSelector((store) => {
    return store.user;
  });

  // Function to handle user sign-out
  const signOutHandler = () => {
    signOut(auth)
      .then(() => {
        // Clearing session storage on successful sign-out
        sessionStorage.removeItem("email")
        sessionStorage.removeItem('ThreadID')
        sessionStorage.removeItem('CourseID')
        sessionStorage.removeItem('userType')
        navigate("/");
      })
      .catch((error) => { });
  };

  // Effect hook to handle user authentication changes
  useEffect(() => {
    // Checking if the user type is set to 'teacher' in session storage
    if (sessionStorage.getItem('userType') == 'teacher') setUserType('teacher')
    // Subscribing to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        // Dispatching action to add user to Redux store
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        sessionStorage.setItem('email', email)
      } else {
        // Dispatching action to remove user from Redux store if not authenticated
        dispatch(removeUser());
      }
    });
    return () => unsubscribe();
  }, []);// Empty dependency array ensures that the effect runs only once on mount

  // Rendering the header component
  return (
    <div className="absolute w-screen px-8 font-mono bg-gradient-to-b from-black py-2 z-50 flex justify-between">
      <Link to="/dashboard">
        <img
          className="w-20 rounded-full brightness-150 sm:mx-5 sm:my-10 sm:h-16 sm:w-16"
          src={LOGO}
          alt="logo"
        />
      </Link>

      {/* Container for navigation links and user actions */}
      <div className="flex">
        <Link to="/all-courses">
          {user && userType=='student' && (
            <button className="font-bold text-white no-underline hover:underline cursor-pointer h-10 p-6">
              Available Courses
            </button>
          )}
        </Link>
        
        {/* Container for sign-out and profile links */}
        {user && (
          <div className="flex p-4">
            <button
              onClick={signOutHandler}
              className="font-bold text-white no-underline hover:underline cursor-pointer h-10"
            >
              Sign Out
            </button>

            <Link to="/profile">
              <img
                className="w-10 h-10 ml-8 rounded-3xl cursor-pointer"
                title="Profile"
                src={user?.photoURL}
              />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

// Exporting the Header component
export default Header;
