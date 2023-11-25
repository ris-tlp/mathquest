import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { createPortal } from "react-dom";
import RegisterCourseModal from "./RegisterCourseModal";

const Courses = () => {
  const [offeredCourses, setOfferedCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    fetchOfferedCourses();
  }, []);

  const fetchOfferedCourses = async () => {
    const data = await fetch("http://localhost:8000/api/courses");
    const json = await data.json();

    setOfferedCourses(json?.courses);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-slate-900 font-mono">
      <Header />
      <div className="pt-28"></div>
      <section className="m-8 ">
        <div>
          <h1 className="text-3xl mx-20 font-bold text-white">
            Our top picks for you!
          </h1>
          <div className="flex flex-wrap justify-center">
            {offeredCourses.length > 0 &&
              offeredCourses.map((c) => {
                return (
                  <div>
                    <div className="my-10 mx-8 w-72 h-[530px] bg-white border-2 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
                      <img
                        className="w-[100%] h-[200px]"
                        src={c.courseImg}
                        alt=""
                      />

                      <div className="p-5">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {c.courseName}
                        </h5>
                        <p className="mb-3 h-44 font-normal  overflow-y-hidden text-gray-700 dark:text-gray-400">
                          {c.overview}
                        </p>
                        <p className="mb-3 font-bold text-white">
                          {c.courseInstructor}
                        </p>

                        <button
                          onClick={() => setShowModal(true)}
                          className="text-white text-right underline"
                        >
                          View Details
                        </button>

                       
                      </div>
                    </div>
                    {showModal &&
                          createPortal(
                            <RegisterCourseModal
                              onClose={() => setShowModal(false)}
                            />,
                            document.getElementById("modal")
                          )}
                  </div>
                );
                
              })}
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default Courses;
