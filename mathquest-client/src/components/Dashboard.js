import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import { auth } from "../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import axios from "axios";
import { CONNECTION_STRING, PORT } from "../utils/constants";

const Dashboard = () => {
  const navigate = useNavigate();
  const [registeredCourses,setRegisteredCourses]=useState([])

  const getRegisteredCourses = async (email) => {
    const data = await fetch(CONNECTION_STRING+PORT+"/api/courses/registered", {
      method: "POST",
      body: JSON.stringify({
        e: email,
      }),
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Access-control-allow-origin": "*",
        "Access-control-allow-methods": "*",
      },
    });
    const json = await data.json();
    setRegisteredCourses(json?.courses)
    
    
  };


  const user = useSelector((store) => {
    const u = store.user;
    if(u!=null) getRegisteredCourses(u.email);
    return u;
  });


  const onCourseSelect = () => {
    console.log("here");
    navigate("/course");
  };
  return (
    <div className="bg-slate-900 font-mono w-[100vw] h-[100vh]">
      <Header />
      <div className="pt-40  mx-16 font-mono text-black-200  ">
        {user && (
          <div>
            <h1 className="text-5xl text-white">
              Welcome {user?.displayName}!
            </h1>
            <h3 className="text-2xl mt-4 text-white"> Finish off where you left!</h3>
            {/* <h5 className="text-2xl mt-5 text-white">Pick up where you left off!</h5> */}

            
            {registeredCourses.length == 0 && <div>
              <h5 className="text-2xl mt-5 text-white">
              Seems like you are not registered in a course!
            </h5>
            <h5 className="text-2xl mt-5 text-white">
              Choose your desired course to start!
            </h5>

            <Link to="/all-courses">
              {" "}
              <button className="rounded-lg border-2 border-white text-white h-12 p-2 my-8 w-60  ">
                Offered Courses{" "}
              </button>
            </Link>
              </div>}


              <div className="flex flex-wrap justify-left">

              {registeredCourses.length > 0 &&
              registeredCourses.map((r, index) => {
                return (
                  <div key={r.courseName}>
                    <div className="my-10 mx-8 w-72 h-[530px] bg-white border-2 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
                      <img
                        className="w-[100%] h-[200px]"
                        src={r.courseImg}
                        alt=""
                      />

                      <div className="p-5">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {r.courseName}
                        </h5>
                        <p className="mb-3 h-44 font-normal  overflow-y-hidden text-gray-700 dark:text-gray-400">
                          {r.overview}
                        </p>
                        <p className="mb-3 font-bold text-white">
                          {r.courseInstructor}
                        </p>

                        {/* <button
                          onClick={() => openModel(index)}
                          className="text-white text-right underline"
                        >
                          View Details
                        </button> */}
                      </div>
                    </div>
                  </div>
                );
              })}
              </div>
            
          </div>
        )}
      </div>

      
          <Footer className="fixed bottom-0" /> 
        
    </div>
  );
};

export default Dashboard;
