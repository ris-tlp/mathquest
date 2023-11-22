import React, { useEffect, useId } from "react";
import {
  RouterProvider,
  createBrowserRouter,

} from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { auth } from "../utils/firebase";
const Body = () => {
  const dispatch = useDispatch();
 
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);



  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
