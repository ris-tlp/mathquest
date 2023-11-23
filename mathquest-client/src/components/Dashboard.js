import React from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import img1 from "../images/Integration.jpg";
import img2 from "../images/calculus.jpg";
import img3 from "../images/Trigonometry.jpg";
import img4 from "../images/probability.png";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Dashboard = () => {
const navigate = useNavigate()
  const user = useSelector((store) => {
    return store.user;
  });
  const onCourseSelect=()=>{
    console.log("here")
    navigate('/course')
  }
  return (
    <div className="bg-slate-900 font-mono w-[100vw]" >
      <Header />
      <div className="py-40 mx-16 font-mono text-black-200  ">
        {user && (
          <div>
            <h1 className="text-5xl text-white">Welcome {user?.displayName}!</h1>
            <h5 className="text-2xl mt-5 text-white">Pick up where you left off!</h5>

            <section className="flex justify-between w-[100%] flex-wrap">
              
                <div onClick={onCourseSelect} className="my-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
                  <img className="rounded-t-lg" src={img1} alt="" />

                  <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Integration
                    </h5>

                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                  </div>
                </div>
             
                <div onClick={onCourseSelect} className="my-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <img
                    className="rounded-t-lg w-[100%] h-80"
                    src={img2}
                    alt=""
                  />

                  <div className="p-5">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      Calculus
                    </h5>

                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Here are the biggest enterprise technology acquisitions of
                      2021 so far, in reverse chronological order.
                    </p>
                  </div>
                </div>
             
              <div onClick={onCourseSelect} className="my-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img className="rounded-t-lg w-[100%] h-80" src={img3} alt="" />

                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Noteworthy technology acquisitions 2021
                  </h5>

                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Here are the biggest enterprise technology acquisitions of
                    2021 so far, in reverse chronological order.
                  </p>
                </div>
              </div>

              <div onClick={onCourseSelect} className="my-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <img className="rounded-t-lg w-[100%] h-80" src={img4} alt="" />

                <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Probability
                  </h5>

                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Here are the biggest enterprise technology acquisitions of
                    2021 so far, in reverse chronological order.
                  </p>
                </div>
              </div>
             
            </section>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
