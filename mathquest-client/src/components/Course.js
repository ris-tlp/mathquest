import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Tab, Tabs } from "./Tabs";
import Overview from "./Overview";
import Discussion from "./Discussion";
import Announcements from "./QuizContainer";
import Footer from "./Footer";
import { CONNECTION_STRING, PORT } from "../utils/constants";
import QuizContainer from "./QuizContainer";
const Course = () => {
  const [course, setCourse] = useState({});

  useEffect(() => {
    fetchCourseDetails();
  }, []);

  const fetchCourseDetails = async () => {
    const courseID = sessionStorage.getItem("courseID");
    const data = await fetch(
      CONNECTION_STRING +
        PORT +
        "/api/courses/getCourseByID" +
        "?courseID=" +
        courseID
    );
    const json = await data.json();

    setCourse(json?.course);
  };

  return (
    <div className="bg-slate-900 font-mono w-[100vw] h-[120%] ">
      <Header />

      {course && (
        <div className="p-6">
          <h1 className="pt-40 ml-10 text-3xl mb-10 text-white">
            {course.courseName}
          </h1>
          <div className="flex">
            <div className=" mr-4  ml-10 w-8/12 sm:w-[90%]">
              <iframe
                className="h-[600px] px-4"
                width="100%"
                src={course.courseVideoURL}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay;  picture-in-picture;"
                allowfullscreen
              ></iframe>
            </div>

            <div className=" mr-4 w-4/12 sm:hidden">
              <div className="w-[100%]  border-2 border-stone-800 p-8">
                <h3 className="text-2xl font-bold text-white p-4">
                  What you'll learn
                </h3>
                <ul className="list-disc text-white">
                  {course.whatYouWillLearn?.map((e) => {
                    return <li>{e}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div>
            <Tabs>
              <Tab label="Overview">
                <div className="py-4">
                  <Overview course={course} />
                </div>
              </Tab>
              <Tab label="Discussion">
                <div className="py-4">
                  <Discussion />
                </div>
              </Tab>
              <Tab label="Take Quiz">
                <div className="py-4">
                  <QuizContainer />
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      )}

      {/* <Footer /> */}
    </div>
  );
};

export default Course;
