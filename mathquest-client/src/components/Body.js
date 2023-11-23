import React, { useEffect, useId } from "react";
import {
  RouterProvider,
  createBrowserRouter,

} from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";

import Course from "./Course";
import Courses from "./Courses";
import Header from "./Header";

const Body = () => {

 
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
        path: "/course",
        element: <Course />,
      },
      {
        path: "/all-courses",
        element: <Courses />,
      },
  ]);



  return (
    <div>
      
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
