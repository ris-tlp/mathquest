import React, { useEffect, useRef, useState } from "react";
import { BASE_URL, BG, PROFILE_PICTURE } from "../utils/constants";
import { checkValidData } from "../utils/validate";
import { GOOLGELOGO } from "../utils/constants";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import Footer from "./Footer";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const email = useRef(null);
  const password = useRef(null);
  const fullName = useRef(null);

  useEffect(() => {
   

    if (sessionStorage.getItem("email") != undefined) navigate("/dashboard");
  }, []);

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };

  const signUpUser = async (name, email) => {
    const data = await fetch(BASE_URL + "/api/users/signup", {
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
        userType: "student",
        image: PROFILE_PICTURE,
      }),
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Access-control-allow-origin": "*",
        "Access-control-allow-methods": "*",
      },
    });
    const json = await data.json();
    sessionStorage.setItem("email", email);
    navigate("/dashboard");
  };

  const handleButtonclick = () => {
    const message = checkValidData(
      email.current.value,
      password.current.value,
      fullName?.current?.value
    );
    setErrorMessage(message);
    if (message) return;

    if (!isSignIn) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCrendential) => {
          const user = userCrendential.user;

          updateProfile(user, {
            displayName: fullName.current.value,
            photoURL: PROFILE_PICTURE,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );

              signUpUser(displayName, email);
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          setErrorMessage(error.code + error.message);
        });
      //sign Up
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCrendential) => {
          const user = userCrendential.user;
          if (password.current.value.slice(0, 7) == "Teacher") {
            sessionStorage.setItem("userType", "teacher");
          }else if (password.current.value.slice(0, 5) == "Admin") {
            sessionStorage.setItem("userType", "admin");
          } else {
            sessionStorage.setItem("userType", "student");
          }
          sessionStorage.setItem("email", user.email);
          dispatch(
            addUser({
              uid: user.uid,
              email: user.email,
              displayName: user.displayName,
              photoURL: user.photoURL,
            })
          );
          sessionStorage.setItem("email", email);
          navigate("/dashboard");
        })
        .catch((error) => {
          setErrorMessage(error.code + error.message);
        });
    }
  };

  // const googleSignIn = () => {
  //   const provider = new GoogleAuthProvider();
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       const name = result.user.displayName;
  //       const email = result.user.email;
  //       const profilePic = result.user.photoURL;
  //       navigate("/dashboard");
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });
  // };

  return (
    <div className="font-mono">
      <Header />
      <div className="absolute">
        <img
          className="w-screen lg:h-[120vh] md:h-screen brightness-50 sm:h-full md:h-full sm:hidden"
          src={BG}
          alt="background"
        />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="sm:w-full sm:h-full sm:my-0 md:w-4/12 lg:w-4/12  w-3/12 absolute bg-black md:my-20 my-28 mx-auto right-0 left-0 p-12 text-white md:rounded-lg rounded-lg sm:bg-opacity-200 bg-opacity-90 sm:h-[100vh]"
      >
        <h1 className="text-3xl text-center sm:my-4 sm:ml-20 sm:text-white my-2">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignIn && (
          <input
            type="text"
            placeholder="Enter Full Name"
            minLength="8"
            maxLength="30"
            ref={fullName}
            className="p-2 my-4 h-14 w-full bg-gray-700 rounded-lg"
          />
        )}{" "}
        <br />
        <input
          type="email"
          placeholder="Email Address"
          ref={email}
          className="p-2 my-4 h-14 w-full bg-gray-700 rounded-lg"
        />{" "}
        <br />
        <input
          type="password"
          placeholder="Password"
          ref={password}
          className="p-2 my-4 h-14 w-full bg-gray-700 rounded-lg"
        />
        <p className="text-red-500 font-bold text-lg p-2">{errorMessage}</p>
        <br />
        <button
          className="p-4 my-4 sm:my-2 bg-rose-600 w-full rounded-lg cursor-pointer "
          onClick={handleButtonclick}
        >
          {" "}
          <span className=" text-[20px]">
            {isSignIn ? "SIGN IN" : "SIGN UP"}
          </span>
        </button>
        {/* <p className="text-center">---------- OR ---------- </p>
        <button
          className="p-4 my-4 bg-rose-600 w-full rounded-lg cursor-pointer flex justify-center"
          onClick={googleSignIn}
        >
          <img className="w-8 mx-4" src={GOOLGELOGO}></img>
          <span className="text-center  text-[20px]">SIGN IN WITH GOOGLE</span>
        </button> */}
        {isSignIn && (
          <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
            <u>New to MathQuest? Sign up now</u>
          </p>
        )}
        {!isSignIn && (
          <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
            <u>Already have an account, Sign In!</u>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
