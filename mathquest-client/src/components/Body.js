// Importing necessary React components and hooks
import React, { useEffect, useId } from "react";
import {
  RouterProvider,
  createBrowserRouter,

} from "react-router-dom";

// Importing Firebase authentication functions and Redux hook
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";

// Importing other components used in the application
import Login from "./Login";
import Dashboard from "./Dashboard";
import Course from "./Course";
import Courses from "./Courses";
import Header from "./Header";
import Profile from "./Profile";

const Body = () => {

  // Creating a BrowserRouter instance with defined routes
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

      {
        path: "/profile",
        element: <Profile />,
      },
  ]);

  // Rendering the main component with the provided router
  return (
    <div>
      
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
